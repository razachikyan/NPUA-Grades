import nodemailer from "nodemailer";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "tttttteeeeeesssssttttt@gmail.com",
        pass: "latn injq bfnx sbff",
      },
    });
  }

  async sendResetPasswordEmail(email: string, resetCode: string) {
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: "tttttteeeeeesssssttttt@gmail.com",
        to: email,
        subject: "Reset Your Password",
        text: `Your reset code is: ${resetCode} \n\n Visit http://localhost:3000/login?type=reset and login with this pass`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending reset password email:", error);
      throw error;
    }
  }
}

export default EmailService;
