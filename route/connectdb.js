const mysql = require("mysql");
const connectsql = mysql.createConnection({
  user: "zuhri",
  database: "fullerton",
  password: "Mysql123",
  host: "localhost",
  port: 3306
});

// connectsql.connect((err, res) => {
//   if (err) return console.log(err);
//   console.log(res);
// });

module.exports = connectsql;
