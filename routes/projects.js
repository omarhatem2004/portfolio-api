const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const auth = require('../middleware/auth');
const notDeleted = { isDeleted: { $ne: true } };

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find(notDeleted);
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});

router.post('/', auth, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        // const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, ...notDeleted },
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        // const project = await Project.findByIdAndDelete(req.params.id);

        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, ...notDeleted },
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.put('/:id/restore', auth, async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, isDeleted: true },
            { isDeleted: false, deletedAt: null },
            { new: true }
        );
        if (!project) return res.status(404).json({ message: 'Deleted project not found' });
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;