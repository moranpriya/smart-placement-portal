const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

const sendMail =
  async (
    to,
    subject,
    text
  ) => {

    try {

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to,

        subject,

        text,

        html: `
          <h2>${subject}</h2>
          <p>${text}</p>
        `,
      });

    } catch (error) {

      console.log(
        "Mail Error:",
        error.message
      );
    }
  };

module.exports =
  sendMail;