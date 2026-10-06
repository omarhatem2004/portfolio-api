require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/job');
const Project = require('./models/project');
const SkillGroup = require('./models/skillgroup');
const Profile = require('./models/profile');

const jobs = [
    {
        title: 'Full Stack Software Developer Intern',
        org: 'Archirodon · New Cairo, Egypt',
        period: 'Aug 2025 – Sep 2025',
        bullets: [
            'Completed full-stack web development training with the IT & EDP software development team.',
            'Built web components using HTML, CSS, JavaScript, Bootstrap, PHP, and SQL.',
            'Gained experience in frontend/backend integration, databases, and web hosting concepts.',
            'Collaborated on team workflows and industry best practices.',
        ],
    },
    {
        title: 'IT Intern',
        org: 'Foundever · Nasr City, Egypt',
        period: 'Aug 2024 – Sep 2024',
        bullets: [
            'Configured and deployed Windows on laptops and desktops for employees.',
            'Handled hardware setup, software installation, and device maintenance.',
            'Resolved technical issues via the company IT ticketing system.',
            'Supported networking and system administration (DHCP, VLANs, Group Policy, domain services).',
        ],
    },
];

const projects = [
    {
        featured: true,
        badge: 'Graduation project',
        title: 'Agentic AI for Requirements Engineering Automation',
        subtitle: 'AI Web App Builder · AASTMT',
        description:
            'A full-stack, locally hosted platform that turns natural-language software ideas into validated, runnable web applications through an 11-stage agentic workflow—requirements, architecture, code generation, validation, and preview.',
        bullets: [
            'React frontend and FastAPI backend with Ollama (Qwen 2.5 Coder, Llama 3.1) for artifact generation and app assembly.',
            'Checkpoint-based execution, runtime validation, and AI-assisted error analysis with recovery from build failures.',
            'Deterministic generation of auth, models, CRUD, and REST APIs for consistent output across domains (clinic, school, e-commerce, bookstore).',
        ],
        tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLite', 'Ollama', 'Tailwind CSS', 'PyTest'],
    },
    {
        title: 'CarPartify E-Commerce',
        description:
            'Team platform for car parts: search, cart, checkout, seller orders, supplier POs, and inventory validation—with GitHub branching and Jira coordination.',
        tags: ['React', 'FastAPI', 'SQLAlchemy', 'Tailwind'],
    },
    {
        title: 'QR Code Cashier System',
        description: 'Scans item QR codes, calculates totals, and updates inventory in real time.',
        tags: ['R', 'OpenCV'],
    },
    {
        title: 'Too Good To Go — Analysis & Design',
        description:
            'Marketplace for surplus meals: UML use case, sequence, activity, and state diagrams plus requirements traceability matrix.',
        tags: ['UML', 'Draw.io', 'Lucidchart'],
    },
    {
        title: 'Full-Stack Web Application',
        description: 'Dynamic platform with authentication, MySQL integration, and server-side business logic.',
        tags: ['PHP', 'MySQL'],
    },
];

const skillGroups = [
    { title: 'Languages', skills: ['Python', 'JavaScript', 'Java', 'C++', 'PHP', 'SQL', 'R'] },
    { title: 'Frontend & backend', skills: ['React', 'HTML', 'CSS', 'FastAPI', 'Flask', 'REST APIs', 'JSP / Servlets'] },
    { title: 'Data & tools', skills: ['MySQL', 'SQLite', 'Git', 'GitHub', 'Postman', 'Figma', 'Ollama'] },
    {
        title: 'Concepts',
        skills: ['OOP', 'Data structures', 'Algorithms', 'Software architecture', 'Requirements engineering', 'Testing'],
    },
];

const profile = {
    aboutParagraphs: [
        'I am a Software Engineering graduate from the Arab Academy for Science, Technology and Maritime Transport, focused on turning ideas into reliable software—backend APIs, thoughtful database design, and frontends people actually enjoy using.',
        'My final-year work centers on an agentic AI platform that transforms natural-language requirements into structured artifacts and runnable FastAPI applications, with validation, checkpoints, and self-healing when builds fail.',
    ],
    educationSchool: 'Arab Academy for Science, Technology and Maritime Transport',
    educationLines: [
        'B.Sc. Computer Science — Software Engineering',
        'GPA 3.0 / 4.0 · Graduated June 2026',
        'Cairo, Egypt',
    ],
    languages: ['Arabic (Native)', 'English (Fluent)', 'French (Fluent)'],
    contactLead:
        'Open to software engineering roles, internships, and collaborations on full-stack or AI-assisted development.',
    email: 'omar.hatem7658@gmail.com',
    phone: '+20 150 553 6884',
    linkedin: 'https://linkedin.com/in/omar-hatem-032955221',
    linkedinLabel: 'omar-hatem',
    github: 'https://github.com/omarhatem2004',
};

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => Promise.all([Job.deleteMany({}), Project.deleteMany({}), SkillGroup.deleteMany({}), Profile.deleteMany({})]))
    .then(() =>
        Promise.all([
            Job.insertMany(jobs),
            Project.insertMany(projects),
            SkillGroup.insertMany(skillGroups),
            Profile.create(profile),
        ])
    )
    .then(() => {
        console.log('Everything saved');
        return mongoose.disconnect();
    })
    .catch((err) => console.error('Failed:', err.message));