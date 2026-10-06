const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    aboutParagraphs: [String],
    educationSchool: String,
    educationLines: [String],
    languages: [String],
    contactLead: String,
    email: String,
    phone: String,
    linkedin: String,
    linkedinLabel: String,
    github: String,
});

module.exports = mongoose.model('Profile', profileSchema);