require("dotenv").config();
var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Register. */
router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Invalid iput! Please try again.",
    });
  }

  const queryUsers = req.db
    .from("users")
    .select("email")
    .where("email", "=", email);

  queryUsers
    .then((users) => {
      if (users.length > 0) {
        res.status(400).json({
          error: true,
          message: "user already exists",
        });
        return;
      }
      const saltRoundes = 10;
      const hash = bcrypt.hashSync(password, saltRoundes);
      return req.db.from("users").insert({ email, hash });
    })
    .then(() => {
      res.status(201).json({ error: false, message: "User created" });
    });
});

/* User login */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed.",
    });
    return;
  }

  const queryUsers = req.db
    .from("users")
    .select("email", "hash")
    .where("email", "=", email)
    .then((users) => {
      if (users.length == 0) {
        res.status(401).json({ error: true, message: "User does not exist" });
      }

      const user = users[0];
      console.log(users);
      return bcrypt.compare(password, user.hash);
    })
    .then((match) => {
      if (!match) {
        res.status(401).json({ error: true, message: "Password do not match" });
      }

      const secretKey = secret;
      const expires_in = 60 * 60 * 24;

      const exp = Date.now() + expires_in * 1000;
      const token = jwt.sign({ email, exp }, secretKey);

      res.json({ token_type: "Bearer", token, expires_in, status: "ok" });
    });
});

const authorize = (req, res, next) => {
  const authorization = req.headers.authorization;
  let token = null;

  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1];
    console.log("Token: ", token);
  } else {
    res.json({ error: true, message: "No authorisation token" });
  }

  try {
    const secretKey = "secretkey"; // Store this in environment variable
    const decoded = jwt.verify(token, secretKey);
    if (decoded.exp < Date.now()) {
      console.log("Token has expired");
      res.json({ error: true, message: "expired token" });
    }
    req.email = decoded.email;
    next();
  } catch (err) {
    res.json({ error: true, message: "Token is not valid: ", err });
  }
};

/* Get notes details of a user. This function needs the user to login to the system */
router.get("/meditate/:userID", authorize, async function (req, res) {
  try {
    const notes = await req.db
      .from("meditate_new")
      .select("date", "input1", "input2");
    res.json({ error: false, notes });
  } catch (err) {
    console.log(err);
    res.json({ error: true, error: err });
  }
});

/* Revise a particular note identifying by id. This function needs the user to login to the system */
router.put("/update/:id", authorize, async function (req, res) {
  const { id } = req.params;
  const message1 = req.body.message1;
  const message2 = req.body.message2;

  try {
    const currentNote = await req.db("meditate_new").where({ id }).update({
      input1: message1,
      input2: message2,
    });
    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating new note", error: err });
  }
});

/* Delete a particular note identifying by id. This function needs the user to login to the system */
router.delete("/delete/:id", authorize, async function (req, res) {
  const { id } = req.params;

  try {
    const currentNote = await req.db("meditate_new").where({ id }).del();
    res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting the note", error: err });
  }
});

module.exports = router;
