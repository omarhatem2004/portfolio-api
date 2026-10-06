const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    org: String,
    period: String,
    bullets: [String],
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,


});

module.exports = mongoose.model('Job', jobSchema)

