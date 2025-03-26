const getEmailActivateTemplate = (user, activationToken) => {
  return {
    from: `"Ekub App" ${process.env.GMAIL_USER}`, // Sender's email address
    to: user.email, // User's email address
    subject: 'Activate Your Ekub Account',
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Welcome to Ekub!</h2>
            <p>Hi ${user.fullname},</p>
            <p>Thank you for registering with Ekub. Please click the link below to activate your account:</p>
            <a href="${
              process.env.CLIENT_URL + process.env.VERIFY_EMAIL_URL
            }?token=${activationToken}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Activate Account</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>Ekub Team</p>
            </div>
        `,
  };
};

const getLotteryAnnouncementTemplate = (winner, participants) => {
  return {
    from: `"Ekub App" ${process.env.GMAIL_USER}`, // Sender's email address
    to: participants.map((user) => user.email).join(','), // User's email address
    subject: `Ekub - Lottery Winner Announcement`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Ekub - Lottery Winner Announcement</h2>
        <p>Hi ,</p>
        <p>We are excited to announce the winner of this week's Ekub lottery!</p>
        <p>🎉 <strong>${winner.fullname}</strong> is the winner! 🎉</p>
        <p>Congratulations to ${winner.fullname}, who will receive the collected contributions for this round.</p>
        <p>Thank you for participating, and stay tuned for the next lottery!</p>
        <p>Best regards,<br>Ekub Team</p>
      </div>
    `,
  };
};

const getPasswordResetTemplate = (user, resetToken) => {
  return {
    from: `"Ekub App" ${process.env.GMAIL_USER}`, // Sender's email address
    to: user.email, // User's email address
    subject: 'Reset Your Ekub Account Password',
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Reset Your Password</h2>
            <p>Hi ${user.fullname},</p>
            <p>We received a request to reset your Ekub account password. Please click the link below to reset your password:</p>
            <a href="${
              process.env.CLIENT_URL + process.env.RESET_PASSWORD_URL
            }?token=${resetToken}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>Ekub Team</p>
            </div>
        `,
  };
};

module.exports = {
  getEmailActivateTemplate,
  getLotteryAnnouncementTemplate,
  getPasswordResetTemplate,
};
