require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await Admin.findOneAndUpdate({ email: process.env.ADMIN_EMAIL }, { passwordHash }, { upsert: true });
        console.log('Admin saved');
    } catch (err) {
        console.error('Failed:', err.message);
    } finally {
        await mongoose.disconnect();
    }
})();