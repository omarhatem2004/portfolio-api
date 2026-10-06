const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        res.json(await Profile.findOne());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;