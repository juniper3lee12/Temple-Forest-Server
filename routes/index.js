var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

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

router.get("/note/all", (req, res) => {
  connection.query("SELECT * FROM meditate", function (err, results) {
    res.json(results);
  });
});

router.get("/api/city", async function (req, res) {
  try {
    const cities = await req.db.from("city").select("name", "district");
    res.json({ error: false, cities });
  } catch (err) {
    console.log(err);
    res.json({ error: true, error: err });
  }
});

//เอาแค่บางเมือง

// router.get("/api/city/:CountryCode", async function (req, res) {
//   try {
//     const cities = await req.db
//       .from("City")
//       .select("name", "district")
//       .where("CountryCode", ">", req.params.CountryCode);

//     res.json({ error: false, cities });
//   } catch (err) {
//     res.json({ error: true, error: err });
//   }
// });

router.get("/api/city/:CountryCode", async function (req, res) {
  let CountryCode = req.params.CountryCode;
  try {
    const cities = req.db.from("City").select("name", "district");

    if (CountryCode != "ALL") {
      cities.where("CountryCode", CountryCode);
    }

    res.json({ error: false, cities: await cities });
  } catch (err) {
    res.json({ error: true, error: err });
  }
});

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

router.post("/meditate", async (req, res) => {
  const userID = req.body.userID;
  const date = req.body.date;
  const goal = req.body.goal;
  const input1 = req.body.input1;
  const input2 = req.body.input2;

  if (!userID) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    await req.db("meditate_new").insert({ userID, date, goal, input1, input2 });
    res.json({ message: "data successfully stored!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
