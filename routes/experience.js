const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const auth = require('../middleware/auth');
const notDeleted = { isDeleted: { $ne: true } };

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find(notDeleted);
        res.json(jobs);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});

router.post('/', auth, async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        // const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, ...notDeleted },
            req.body,
            { new: true, runValidators: true }
        );
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        // const job = await Job.findByIdAndDelete(req.params.id);

        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, ...notDeleted },
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.put('/:id/restore', auth, async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, isDeleted: true },
            { isDeleted: false, deletedAt: null },
            { new: true }
        );
        if (!job) return res.status(404).json({ message: 'Deleted job not found' });
        res.json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;