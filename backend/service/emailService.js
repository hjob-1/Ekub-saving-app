const nodemailer = require('nodemailer');
const {
  getEmailActivateTemplate,
  getPasswordResetTemplate,
  getLotteryAnnouncementTemplate,
} = require('./template');

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: process.env.GMAIL_SERVICE,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const getEmailTemplate = (emailInfo) => {
  switch (emailInfo.type) {
    case 'activate':
      return getEmailActivateTemplate(
        emailInfo.user,
        emailInfo.activationToken,
      );
    case 'reset':
      return getPasswordResetTemplate(emailInfo.user, emailInfo.resetToken);
    case 'lottery':
      return getLotteryAnnouncementTemplate(
        emailInfo.participants,
        emailInfo.winner,
      );
    default:
      throw new Error('Unknown email type.');
  }
};

const sendEmail = async (emailInfo) => {
  mailOptions = getEmailTemplate(emailInfo);
  try {
    await transporter.sendMail(mailOptions);
    console.log('Activation email sent successfully!');
  } catch (error) {
    console.log('Error sending email: ' + error.message);
  }
};

module.exports = {
  sendEmail,
};
