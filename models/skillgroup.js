// models/skillgroup.js
const mongoose = require('mongoose');

const skillGroupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    skills: [String],
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
});

module.exports = mongoose.model('SkillGroup', skillGroupSchema);