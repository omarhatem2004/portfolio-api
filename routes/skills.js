const express = require('express');
const router = express.Router();
const SkillGroup = require('../models/skillgroup');
const auth = require('../middleware/auth');
const notDeleted = { isDeleted: { $ne: true } };

router.get('/', async (req, res) => {
    try {
        const skillGroups = await SkillGroup.find(notDeleted);
        res.json(skillGroups);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});

router.post('/', async (req, res) => {
    try {
        const skillGroup = await SkillGroup.create(req.body);
        res.status(201).json(skillGroup);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        // const skillGroup = await SkillGroup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const skillGroup = await SkillGroup.findOneAndUpdate(
            { _id: req.params.id, ...notDeleted },
            req.body,
            { new: true, runValidators: true }
        );
        if (!skillGroup) return res.status(404).json({ message: 'Skill Group not found' });
        res.json(skillGroup);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // const skillGroup = await SkillGroup.findByIdAndDelete(req.params.id);

        const skillGroup = await SkillGroup.findOneAndUpdate(
            { _id: req.params.id, ...notDeleted },
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );
        if (!skillGroup) return res.status(404).json({ message: 'Skill Group not found' });
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.put('/:id/restore', auth, async (req, res) => {
    try {
        const skillGroup = await SkillGroup.findOneAndUpdate(
            { _id: req.params.id, isDeleted: true },
            { isDeleted: false, deletedAt: null },
            { new: true }
        );
        if (!skillGroup) return res.status(404).json({ message: 'Deleted skill Group not found' });
        res.json(skillGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;