import nodemailer from "nodemailer";
import { AppendingUser, User } from "../models/user.js";
import { uuid } from "uuidv4";
import dotenv from "dotenv-defaults";

dotenv.config();

const sendEmail = async (email, purpose, data) => {
  // console.log(process.env.MAIL_URL);
  // console.log(process.env.MAIL_PASSWORD);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "station1776@gmail.com",
      pass: "T1231i519m",
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
      gameId: "",
      secretToken: secretToken,
      active: false,
    };

    const user = new AppendingUser(appendingData);
    user.save();

    mailOptions = {
      from: "station1776@gmail.com",
      to: email,
      subject: "signUp",
      text: "Create new account",
      html: `<p>
          Click <a href=https://epedemic.herokuapp.com/api/verify/${secretToken}>here</a>
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
      gameId: "",
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
      from: "station1776@gmail.com",
      to: email,
      subject: "forgotPassword",
      text: "Reset password",
      html: `<p>Click <a href=https://epedemic.herokuapp.com/resetpw?secretToken=${secretToken}>here</a>
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
