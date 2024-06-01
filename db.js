require("dotenv").config();
const db_host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASS;
const db_name = process.env.NAME;

// Store in environment variable
module.exports = {
  client: "mysql2",
  connection: {
    host: db_host,
    database: db_name,
    user: user,
    password: password,
  },
};
