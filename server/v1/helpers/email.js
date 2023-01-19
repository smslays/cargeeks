const sgMail = require("@sendgrid/mail");
const sendEmail = (to, from, subject, text, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };
  return sgMail.send(msg);
};
module.exports = sendEmail;
