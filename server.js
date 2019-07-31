var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl =
  "mongodb+srv://user:user@cluster0-3sxe4.gcp.mongodb.net/node-learning";

var Message = mongoose.model("Message", {
  name: String,
  message: String
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(500);
    }
  });
  io.emit("message", req.body);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("User connected");
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log("MongoDB connection", err);
  }
  console.log("MongoDB connected!");
});

var server = http.listen(3000, () => {
  console.log(`Server is listening on port: ${server.address().port}`);
});
