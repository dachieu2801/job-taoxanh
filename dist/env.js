"use strict";
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    // fire base
    FIRE_BASE_APIKEY: process.env.FIRE_BASE_APIKEY,
    AUTHOR_DOMAIN: process.env.AUTHOR_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASURENT_ID: process.env.MEASURENT_ID,
    //node mailer
    USER_NODEMAILER: process.env.USER_NODEMAILER,
    PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER,
};
