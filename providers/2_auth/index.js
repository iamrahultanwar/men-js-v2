const accessTokenSecret = "youraccesstokensecret";
const jwt = require("jsonwebtoken");

module.exports = (ctx) => {
  const { Server, Database, Models } = ctx;
  const { Schema, model } = Database;

  const authSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      loginMethod: { type: "String", default: "EMAIL", uppercase: true },
      loginIP: { type: "String" },
    },
    { timestamps: { createdAt: "firstLogin", updatedAt: "recentLogin" } }
  );

  const AuthModel = model("Auth", authSchema);

  const Auth = {};

  Auth.loginUsingEmailPassword = async (req, res) => {
    const { email, password } = req.body;
    const User = Models.get("User");

    const user = await User.findOne({ email: email, password: password });

    if (user) {
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        accessTokenSecret
      );

      await AuthModel.findOneAndUpdate(
        { user: user.id },
        { user: user.id, loginMethod: "EMAIL", loginIP: req.ip },
        { upsert: true }
      );

      return res.json({
        accessToken,
      });
    } else {
      return res.send({ status: false, message: "User not found" });
    }
  };

  Auth.loginUsingMobile = async (req, res) => {};

  Server.post("/auth/login", Auth.loginUsingEmailPassword);

  Server.use(function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.auth = { isLoggedIn: true, user };
        next();
      });
    } else {
      req.auth = {
        isLoggedIn: false,
      };
      next();
    }
  });

  Auth.privateRoute = (req, res, next) => {
    if (req.auth.isLoggedIn) {
      next();
    }
    return res.send("Access Not Allowed").status(401);
  };

  ctx.service("Auth", (c) => Auth);
};
