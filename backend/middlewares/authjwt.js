const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "Unauthorized , token is not  available" });
  }

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized ||" });
    }
    req.UserId = decoded.id;
    console.log("req=", req.UserId);
    next();
  });
};

isAdmin = (req, res, next) => {
  console.log("isAdmin=", req.UserId);
  User.findById(req.UserId).exec((err, user) => {
    if (err) {
      return res.status.send({ message: err });
    }
    console.log("req.user.role=", user);
    if (user.roles !== "admin") {
      return res.send(403).send({ message: "Required admin role !!" });
    }
    next();
    return;
  });
};
isUser = (req, res, next) => {
  console.log("isAdmin=", req);
  User.findById(req.UserId).exec((err, user) => {
    if (err) {
      return res.status.send({ message: err });
    }

    if (user.roles !== "user") {
      return res.send(403).send({ message: "Required user role !!" });
    }
    next();
    return;
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser,
};
