require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch((err) => console.error('Connection failed:', err.message));