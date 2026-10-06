const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    featured: { type: Boolean, default: false },
    badge: String,
    title: { type: String, required: true },
    subtitle: String,
    description: { type: String, required: true },
    bullets: [String],
    tags: [String],
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
});

module.exports = mongoose.model('Project', projectSchema);