const accessTokenSecret = "youraccesstokensecret";
const jwt = require("jsonwebtoken");

module.exports = (ctx) => {
  const { Server, Database, Models } = ctx.container;
  // const { Schema, model } = Database;

  // class Auth {
  //   constructor() {
  //     this.authSchema = new Schema(
  //       {
  //         user: { type: Schema.Types.ObjectId, ref: "User" },
  //         loginMethod: { type: "String", default: "EMAIL", uppercase: true },
  //         loginIP: { type: "String" },
  //       },
  //       { timestamps: { createdAt: "firstLogin", updatedAt: "recentLogin" } }
  //     );

  //     this.AuthModel = model("Auth", this.authSchema);
  //   }

  //   loginUsingEmailPassword = async (req, res) => {
  //     const { email, password } = req.body;
  //     const User = Models.get("User");

  //     const user = await User.findOne({ email: email, password: password });

  //     if (user) {
  //       const accessToken = jwt.sign(
  //         { email: user.email, role: user.role },
  //         accessTokenSecret
  //       );

  //       await this.AuthModel.findOneAndUpdate(
  //         { user: user.id },
  //         { user: user.id, loginMethod: "EMAIL", loginIP: req.ip },
  //         { upsert: true }
  //       );

  //       return res.json({
  //         accessToken,
  //       });
  //     } else {
  //       return res.send({ status: false, message: "User not found" });
  //     }
  //   };

  //   loginUsingMobile = async (req, res) => {};
  // }

  // Server.use(function (req, res, next) {
  //   const authHeader = req.headers.authorization;

  //   if (authHeader) {
  //     const token = authHeader.split(" ")[1];

  //     jwt.verify(token, accessTokenSecret, (err, user) => {
  //       if (err) {
  //         return res.sendStatus(403);
  //       }

  //       req.auth = { isLoggedIn: true, user };
  //       next();
  //     });
  //   } else {
  //     req.auth = {
  //       isLoggedIn: false,
  //     };
  //     next();
  //   }
  // });

  // Server.post("/auth/login", Auth.loginUsingEmailPassword);

  // ctx.service("Auth", Auth);
};
