const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'developertonie@gmail.com',
    pass: 'storeA2002!',
  },
});

module.exports = transporter;