import nodemailer from "nodemailer";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tttttteeeeeesssssttttt@gmail.com",
        pass: "23364raz27$",
      },
    });
  }

  async sendResetPasswordEmail(email: string, resetCode: string) {
    try {
      // Define email options
      const mailOptions: nodemailer.SendMailOptions = {
        from: "tttttteeeeeesssssttttt@gmail.com",
        to: email,
        subject: "Reset Your Password",
        text: `Your reset code is: ${resetCode}`,
      };

      await this.transporter.sendMail(mailOptions);
      console.log("Reset password email sent successfully");
    } catch (error) {
      console.error("Error sending reset password email:", error);
      throw error;
    }
  }
}

export default EmailService;
