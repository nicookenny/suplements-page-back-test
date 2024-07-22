import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "celestemonterodev@gmail.com",
    pass: "frwg snwh haka fykz", //https://myaccount.google.com/apppasswords
  },
  from: "celestemonterodev@gmail.com",
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
  try {
    const mailOptions = {
      from: "Cristian Zambosco trainer",
      to,
      subject: "Verifique su cuenta",
      text: `Para verificar su cuenta, debe ingresar el código ${code}`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email enviado exitósamente");
  } catch (error) {
    console.error(error);
  }
};
