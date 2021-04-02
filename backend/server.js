const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./models");
const { verifyToken, isAdmin, isUser } = require("./middlewares/authjwt");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

function success(res, payload) {
  res.status(200).json(payload);
}

app.get("/", (req, res) => {
  res.send("welcome");
});

// app.get("/todos", async (req, res, next) => {
//   try {
//     console.log(req);
//     const todo = await db.User.find({}); // find all data , empty {} means all
//     return success(res, todo);
//   } catch (error) {
//     next({ status: 400, message: "failed to get todos" });
//   }
// });

// app.post("/todos", async (req, res, next) => {
//   try {
//     console.log(req);

//     const todo = await db.User.create(req.body);
//     return success(res, todo);
//   } catch (error) {
//     next({ status: 400, message: "failed to create todos" });
//   }
// });

app.put("/admin/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);

    const updatedData = await db.User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return success(res, updatedData);
  } catch (error) {
    next({ status: 400, message: "failed yyy to update" });
  }
});

app.delete("/admin/:id", async (req, res, next) => {
  console.log("delete========", req.params.id);

  try {
    await db.User.findByIdAndRemove(req.params.id);
    return success(res, "todo deleted");
  } catch (error) {
    next({ status: 400, message: "failed to delete todos" });
  }
});

// error handler for all above next({..})
app.use((error, req, res, next) => {
  return res.status(error.status || 400).json({
    status: error.status || 400,
    message: error.message || "there was an error processing request",
  });
});

app.post("/signup", (req, res) => {
  db.User.findOne({
    username: req.body.username,
  }).exec((err, userDetail) => {
    console.log("user100=", err, userDetail);
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (userDetail) {
      return res.status(200).send({ message: "Email is alredy exist" });
    }

    const user = new db.User({
      username: req.body.username,
      email: req.body.email,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      hobbies: req.body.hobbies,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    console.log("user20=", user.hobbies);

    user.save((err, user) => {
      // console.log("user200=", err, user);

      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("pp=", req.body.roles);
      if (req.body.roles) {
        // if roles exist - admin login

        if (req.body.roles === "admin") {
          user.roles = req.body.roles;

          user.save((err) => {
            console.log("in admin=", err);
            if (err) {
              res.status(500).send({ message: err });
              return;
            } else {
              console.log("sucess");
              res
                .status(200)
                .send({ message: "User is registered successfully" });
              return;
            }
          });
        }
      } else {
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({ message: "User is registered successfully" });
        });
      }
    });
  });
});

// signin

app.post("/signin", (req, res) => {
  console.log("login req=", req);
  db.User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    console.log("p=", user);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, "SECRET_KEY", {
      expiresIn: 86400, //24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      hobbies: user.hobbies,
      roles: user.roles,
      accessToken: token,
    });
  });
});

// for normal user
app.get("/dashboard/user", [verifyToken, isUser], (req, res) => {
  res.status(200).send("User Content.");
});
// for normal user
app.get("/dashboard/admin", [verifyToken, isAdmin], async (req, res) => {
  // console.log("admini======", res);
  try {
    console.log(req);
    const todo = await db.User.find({}); // find all data , empty {} means all
    return success(res, todo);
  } catch (error) {
    next({ status: 400, message: "failed to get todos" });
  }

  // res.status(200).send("Admin Content.");
});

// production shws we are working in local .. for heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("todo-frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "static", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`lisnening on port ${PORT}`);
});
