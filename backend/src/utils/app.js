const express = require('express');
const session = require('express-session');
const sessionConfig = require('./config/session');

const app = express();

// ミドルウェアとしてセッションを設定
app.use(session(sessionConfig));

module.exports = app;