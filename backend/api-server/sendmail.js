import nodemailer from "nodemailer";
import { AppendingUser, User } from "../models/user.js";
import { uuid } from "uuidv4";
import { google } from "googleapis";
import dotenv from "dotenv-defaults";

dotenv.config();
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "753643026049-edo39t9184pcn8fan2107vs7h2743iju.apps.googleusercontent.com", // ClientID
  "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", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04tDUXOKbmzP-CgYIARAAGAQSNwF-L9IrW2CLVyclHKfnJ51yCybJmsH2K5plfEfTR004F6mAoEVdGvvQMgC4KwFuPohNjXwXMwo",
});
const accessToken = oauth2Client.getAccessToken();

const sendEmail = async (email, purpose, data) => {
  // console.log(process.env.MAIL_URL);
  // console.log(process.env.MAIL_PASSWORD);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "hackhaha0808@gmail.com",
      clientId:
        "753643026049-edo39t9184pcn8fan2107vs7h2743iju.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04tDUXOKbmzP-CgYIARAAGAQSNwF-L9IrW2CLVyclHKfnJ51yCybJmsH2K5plfEfTR004F6mAoEVdGvvQMgC4KwFuPohNjXwXMwo",
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
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
      from: "hackhaha0808@gmail.com",
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
      from: "hackhaha0808@gmail.com",
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
