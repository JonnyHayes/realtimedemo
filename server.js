const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const cors = require("cors");

const app = express();
const http = require("http").Server(app);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: "777073",
  key: "b5262cc4db5c312a3457",
  secret: "afaa867da05677aa54cf",
  cluster: "us3",
  encrypted: true
});

app.post("/record", (req, res) => {
  console.log(req.body);
  pusher.trigger("records", "new-record", req.body);
  res.send("Pushed");
});

http.listen(2000, () => console.log("Listening at 2000"));
