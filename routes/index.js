var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/meditate", async function (req, res) {
  try {
    const notes = await req.db.from("meditate").select("date", "input2");
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
    let query = req.db("meditate").select("goal", "input1", "input2");

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

module.exports = router;
