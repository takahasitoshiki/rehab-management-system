const MongoStore = require('connect-mongo');
require('dotenv').config(); // .envを読み込む

// セッション管理の設定
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    Store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    }),
    cookie: {
        //  クッキーの制御は一旦１日にする
        maxAge: parseInt(process.env.SESSION_MAX_AGE, 10), // .envからクッキーの有効期限を取得
    }
}

module.exports = sessionConfig