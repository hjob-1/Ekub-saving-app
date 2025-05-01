const getEmailActivateTemplate = (user, activationToken) => {
  const primaryColor = '#673ab7'; // Replace with your primary brand color
  const textColor = '#333333';
  const backgroundColor = '#f8f9fa'; // Light grey background
  const buttonColor = '#5cb85c'; // Green button

  return {
    from: `"Ekub App" ${process.env.GMAIL_USER}`,
    to: user.email,
    subject: 'Activate Your Ekub Account',
    html: `
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: ${textColor}; margin: 0; padding: 0; background-color: ${backgroundColor};">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${backgroundColor};">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td align="center" style="padding: 10px;">
                    ${
                      /* Replace with your actual logo image tag - ensure it has a max-width */ ''
                    }
                    <h2 style="color: ${primaryColor}; margin-top: 20px; margin-bottom: 30px; font-size: 28px; font-weight: 600;">Welcome to Ekub!</h2>
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${
                      user.fullname
                    },</p>
                    <p style="font-size: 16px; margin-bottom: 30px;">Thank you for registering with Ekub. Please click the button below to activate your account:</p>
                    <div>
                      <a href="${process.env.CLIENT_URL}${
      process.env.VERIFY_EMAIL_URL
    }?token=${activationToken}"
                         style="display: inline-block; padding: 12px 24px; background-color: ${buttonColor}; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                        Activate Account
                      </a>
                    </div>
                    <p style="font-size: 14px; color: #777; margin-top: 30px; margin-bottom: 0;">If you did not request this, please ignore this email.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px; background-color: #f0f0f0; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 12px; color: #777;">
                    Best regards,<br>Ekub Team<br>&copy; ${new Date().getFullYear()} Ekub App. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    `,
  };
};

const getLotteryAnnouncementTemplate = (winner, participants) => {
  const primaryColor = '#673ab7'; // Replace with your primary brand color
  const textColor = '#333333';
  const backgroundColor = '#f8f9fa'; // Light grey background
  const highlightColor = '#ffc107'; // Gold/Amber for winner

  return {
    from: `"Ekub App" ${process.env.GMAIL_USER}`,
    to: participants.map((user) => user.email).join(','),
    subject: `🎉 Ekub - Lottery Winner Announcement! 🎉`,
    html: `
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: ${textColor}; margin: 0; padding: 0; background-color: ${backgroundColor};">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${backgroundColor};">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td align="center" style="padding: 10px;">
                    ${
                      /* Replace with your actual logo image tag - ensure it has a max-width */ ''
                    }
                    <h2 style="color: ${primaryColor}; margin-top: 20px; margin-bottom: 30px; font-size: 28px; font-weight: 600;">Lottery Winner Announced!</h2>
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi Ekub Community,</p>
                    <p style="font-size: 16px; margin-bottom: 30px;">We're excited to announce the winner of this week's Ekub lottery!</p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
                      <h3 style="color: ${highlightColor}; font-size: 24px; font-weight: bold; margin-top: 0; margin-bottom: 10px;">🎉 Congratulations! 🎉</h3>
                      <p style="font-size: 18px; color: ${primaryColor}; font-weight: 600;">${
      winner.fullname
    }</p>
                      <p style="font-size: 16px;">is the lucky winner!</p>
                    </div>
                    <p style="font-size: 16px; margin-bottom: 20px;">Congratulations to ${
                      winner.fullname
                    }, who will receive the collected contributions for this round.</p>
                    <p style="font-size: 16px; margin-bottom: 0;">Thank you for participating, and stay tuned for the next draw!</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px; background-color: #f0f0f0; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 12px; color: #777;">
                    Best regards,<br>Ekub Team<br>&copy; ${new Date().getFullYear()} Ekub App. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    `,
  };
};

const getPasswordResetTemplate = (user, resetToken) => {
  const primaryColor = '#673ab7'; // Replace with your primary brand color
  const textColor = '#333333';
  const backgroundColor = '#f8f9fa'; // Light grey background
  const buttonColor = '#007bff'; // Blue button

  return {
    from: `"Ekub App" ${process.env.GMAIL_USER}`,
    to: user.email,
    subject: 'Reset Your Ekub Account Password',
    html: `
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: ${textColor}; margin: 0; padding: 0; background-color: ${backgroundColor};">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${backgroundColor};">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td align="center" style="padding: 10px;">
                    ${
                      /* Replace with your actual logo image tag - ensure it has a max-width */ ''
                    }
                    <h2 style="color: ${primaryColor}; margin-top: 20px; margin-bottom: 30px; font-size: 28px; font-weight: 600;">Reset Your Password</h2>
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${
                      user.fullname
                    },</p>
                    <p style="font-size: 16px; margin-bottom: 30px;">We received a request to reset your Ekub account password. Click the button below to proceed:</p>
                    <div>
                      <a href="${process.env.CLIENT_URL}${
      process.env.RESET_PASSWORD_URL
    }?token=${resetToken}"
                         style="display: inline-block; padding: 12px 24px; background-color: ${buttonColor}; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                        Reset Password
                      </a>
                    </div>
                    <p style="font-size: 14px; color: #777; margin-top: 30px; margin-bottom: 0;">If you did not request this, please ignore this email.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px; background-color: #f0f0f0; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 12px; color: #777;">
                    Best regards,<br>Ekub Team<br>&copy; ${new Date().getFullYear()} Ekub App. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    `,
  };
};

const getContributionReminderTemplate = (participants, savingPlan) => {
  const primaryColor = '#673ab7'; // Replace with your primary brand color
  const textColor = '#333333';
  const backgroundColor = '#f8f9fa'; // Light grey background
  const reminderColor = '#ff9800'; // Orange reminder

  return {
    from: `"Ekub App" ${process.env.GMAIL_USER}`,
    bcc: participants,
    subject: `🔔 Reminder: Your Contribution for ${savingPlan} is Due`,
    html: `
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: ${textColor}; margin: 0; padding: 0; background-color: ${backgroundColor};">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${backgroundColor};">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td align="center" style="padding: 10px;">
                    ${
                      /* Replace with your actual logo image tag - ensure it has a max-width */ ''
                    }
                    <h2 style="color: ${reminderColor}; margin-top: 20px; margin-bottom: 30px; font-size: 28px; font-weight: 600;">Contribution Reminder</h2>
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi Ekub Community,</p>
                    <p style="font-size: 16px; margin-bottom: 30px;">This is a friendly reminder to complete your contribution for the Ekub plan: <strong style="color: ${primaryColor};">${savingPlan}</strong>.</p>
                    <p style="font-size: 16px; margin-bottom: 0;">Please ensure your contribution is made before the deadline to stay eligible for the lottery draws!</p>
                    <p style="font-size: 14px; color: #777; margin-top: 30px; margin-bottom: 0;">If you have already made your payment, please disregard this message.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px; background-color: #f0f0f0; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 12px; color: #777;">
                    Thank you for being a part of the Ekub community!<br>Best regards,<br>Ekub Team<br>&copy; ${new Date().getFullYear()} Ekub App. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    `,
  };
};

module.exports = {
  getEmailActivateTemplate,
  getLotteryAnnouncementTemplate,
  getPasswordResetTemplate,
  getContributionReminderTemplate,
};
