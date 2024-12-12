const express = require('express');
const session = require('express-session');
// const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(express.json());
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));

app.use('/auth', authRoutes);

module.exports = app;