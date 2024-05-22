var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/meditate", (req, res) => {
  const { userID, date, goal, input1, input2 } = req.body;
  db("meditate")
    .insert({ userID, date, goal, input1, input2 })
    .then((result) => {
      res.json(result); // Send the result back to the client
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error inserting data" });
    });
});

router.put("/put", (req, res) => {
  const { userID, date, goal, input1, input2 } = req.body;
  connection.query(
    "UPDATE meditate SET date=?, goal=?, input1?, input2=?, WHERE userID=?",
    [date, goal, input1, input2, userID],
    function (err, results) {
      res.json(results);
    }
  );
});

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
      return bcrypt.compare(password, user.hash);
    })
    .then((match) => {
      if (!match) {
        res.status(401).json({ error: true, message: "Password do not match" });
      }

      const secretKey = "secretkey"; /// nedd to be in environment variable
      const expires_in = 60 * 60 * 24;

      const exp = Date.now() + expires_in * 1000;
      const token = jwt.sign({ email, exp }, secretKey);

      res.json({ token_type: "Bearer", token, expires_in });
    });
});

const authorize = (req, res, next) => {
  const authorization = req.headers.authorization;
  let token = null;

  if (authorization && authorization.split("").length === 2) {
    token - authorization.split("")[1];
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

  //1.07 minutes week11
};

router.post("/city", authorize, function (req, res) {
  res.json({ doSomething: req.email });
});

module.exports = router;
