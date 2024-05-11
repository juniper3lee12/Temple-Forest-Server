var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
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

module.exports = router;
