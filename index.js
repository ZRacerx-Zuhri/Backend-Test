const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./route/routeusers");

app.use(express.json());
app.use(cors());
app.use(users);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("connect to " + PORT);
});
