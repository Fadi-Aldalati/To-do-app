const express = require("express");
const mongoose = require("mongoose");
const tasks = require("././routes/task");
const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use("/api/tasks", tasks);

require("./accessControl")(app);

mongoose
  .connect("mongodb://localhost/mydb")
  .then(() => console.log("connected"))
  .catch((err) => console.log("did not connect", err));

const port = process.env.PORT || 3900;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
