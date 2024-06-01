var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET all the notes. */
router.get("/meditate", async function (req, res) {
  try {
    const notes = await req.db
      .from("meditate_new")
      .select("date", "input1", "input2", "id");
    res.json({ error: false, notes });
  } catch (err) {
    console.log(err);
    res.json({ error: true, error: err });
  }
});

/* GET the notes from a particular date. */
router.get("/meditate/:Date", async function (req, res) {
  const dateParam = req.params.Date;
  let Date = req.params.Date;
  try {
    let query = req.db("meditate_new").select("goal", "input1", "input2");

    if (dateParam !== "ALL") {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(dateParam)) {
        query = query.where("Date", dateParam);
      } else {
        throw new Error(
          "Invalid DATETIME format. Expected format: 'YYYY-MM-DD'"
        );
      }
    }
    const meditates = await query;
    res.json({ error: false, meditates: meditates });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

/* POST a note. */

router.post("/meditate", async (req, res) => {
  const userID = req.body.userID;
  const date = req.body.date; // Date of writing a meditation journal
  const goal = req.body.goal; // TINYINT(1) data type indicates that the user achieved the goal or not.
  const input1 = req.body.input1; // Input1 explains experience of the users.
  const input2 = req.body.input2; // Input2 explains a comment from a master

  if (!userID) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    await req.db("meditate_new").insert({ userID, date, goal, input1, input2 });
    res.json({ message: "data successfully stored!", status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
