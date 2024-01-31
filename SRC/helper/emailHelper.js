import nodemailer from "nodemailer";

const emailProcessor = async (emailBody) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "tyrique.huels@ethereal.email",
      pass: "CRY7eX7TF6G4hKBHvs",
    },
  });
  const info = await transporter.sendMail(emailBody);
};

export const sendEmail = (user, url) => {
  const emailBody = {
    from: '"Fred Foo 👻" <checkme@checkme.com>', // sender address
    to: user.email, // list of receivers
    subject: `Hello ${user.fName}✔`, // Subject line
    text: url, // plain text body
    html: url, // html body
  };
  emailProcessor(emailBody);
};

export const verifiedNotificationEmail = (user) => {
  const emailBody = {
    from: '"Fred Foo 👻" <checkme@checkme.com>', // sender address
    to: user.email, // list of receivers
    subject: `Account Verified ${user.fName}✔`, // Subject line
    text: `Login here http://localhost:3000`, // plain text body
    html: `Login here http://localhost:3000`, // html body
  };
  emailProcessor(emailBody);
};
