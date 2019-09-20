const routeusers = require("express").Router();
const SQL = require("./connectdb");
const isemail = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

//getusers
routeusers.post("/user", (req, res) => {
  const { username, email } = req.body;
  const sql = `select username,email from users where username = ? or email = ?`;
  SQL.query(sql, [username, email], (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

//Register
routeusers.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const sql = `insert into users set ?`;
  const hash = bcrypt.hashSync(password, 6);
  if (!isemail(email)) return res.send("not email");

  SQL.query(
    sql,
    { username: username, email: email, password: hash },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

//getallusers
routeusers.get("/users", (req, res) => {
  const sql = `select username,email from users`;
  SQL.query(sql, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

//LOGIN
routeusers.post("/login", (req, res) => {
  const { username, Password } = req.body;

  const sql = `select * from users where username = ? `;

  SQL.query(sql, [username], (err, result) => {
    if (result.length == 0) return res.send("username atau password salah");
    if (!bcrypt.compareSync(Password, result[0].password))
      return res.send("username atau password salah");
    if (err) return res.send(err);
    res.send(result[0]);
  });
});

module.exports = routeusers;
