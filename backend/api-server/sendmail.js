import nodemailer from "nodemailer";
import { AppendingUser, User } from "../models/user.js";
import { uuid } from "uuidv4";

const sendEmail = async (email, purpose, data) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hackhaha0808@gmail.com",
      pass: "ck1060941NTU11",
    },
  });

  let mailOptions;
  if (purpose === "signUp") {
    const secretToken = uuid();
    console.log(secretToken);

    const appendingData = {
      userId: data.userId,
      password: data.password,
      email: data.email,
      status: "signup",
      gameId: "123",
      secretToken: secretToken,
      active: false,
    };

    const user = new AppendingUser(appendingData);
    user.save();

    mailOptions = {
      from: "hackhaha0808@gmail.com",
      to: email,
      subject: "signUp",
      text: "Create new account",
      html: `<p>
          Click <a href=http://localhost:4000/api/verify/${secretToken}>here</a>
          to create your new account
        </p>`,
    };
  }
  if (purpose === "forgotPassword") {
    const secretToken = uuid();
    console.log(secretToken);

    const appendingData = {
      userId: data.userId,
      password: data.password,
      email: data.email,
      status: "forgetPassword",
      gameId: "123",
      secretToken: secretToken,
      active: false,
    };

    const user = new AppendingUser(appendingData);
    user.save();

    /*const user = await User.findOne({ email: email });
    // 擋掉email亂輸入還沒做
    const userId = user.Id;
    console.log(userId);*/

    console.log(email);

    mailOptions = {
      from: "hackhaha0808@gmail.com",
      to: email,
      subject: "forgotPassword",
      text: "Reset password",
      html: `<p>Click <a href=http://localhost:3000/resetpw?secretToken=${secretToken}>here</a>
       to reset your password</p>`,
    };
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendEmail;
