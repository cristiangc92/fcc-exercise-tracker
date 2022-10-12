const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const exerciseSchema = new mongoose.Schema({
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: Date,
});

const userSchema = new mongoose.Schema({
  username: String,
});

const logSchema = new mongoose.Schema({
  username: String,
  count: Number,
  log: Array,
});

const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Log = mongoose.model("Log", logSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  const { username } = req.body;
  const newUser = new User({
    username,
  });
  newUser.save((err, user) => {
    if (err) console.log("Error POST /api/users");
    res.json(user);
  });
});

app.get("/api/users", (req, res) => {
  User.find({}, (err, user) => {
    if (err) console.log("Error GET /api/users");
    res.json(user);
  });
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  let fecha = new Date(date);
  let fechaVal = () => {
    if (fecha instanceof Date && !isNaN(fecha)) {
      return fecha;
    } else {
      fecha = new Date();
    }
  };
  User.findById(_id, (err, userData) => {
    fechaVal(fecha);
    if (err) console.log("Error .findById POST /api/users/:_id/exercises");
    const newExercise = new Exercise({
      username: userData.username,
      description,
      duration,
      date: fecha,
    });
    newExercise.save((err, exercise) => {
      if (err) console.log("Error .save() POST /api/users/:_id/exercises");
      res.json({
        username: userData.username,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
        _id: userData._id,
      });
    });
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  const { from, to, limit } = req.query;
  const { _id } = req.params;
  User.findById(_id, (err, userData) => {
    var query = { username: userData.username };
    if (from !== undefined && to === undefined) {
      query.date = { $gte: new Date(from) };
    } else if (from === undefined && to !== undefined) {
      query.date = { $lte: new Date(to) };
    } else if (from !== undefined && to !== undefined) {
      query.date = { $gte: new Date(from), $lte: new Date(to) };
    }
    let limitCheck = (limit) => {
      maxLimit = 100;
      if (limit) {
        return limit;
      } else {
        return maxLimit;
      }
    };
    if (err) console.log("ERROR .findById /api/users/:_id/logs");
    Exercise.find(query, null, { limit: limitCheck(+limit) }, (err, docs) => {
      let logArry = [];
      if (err) console.log("ERROR .find /api/users/:_id/logs");
      let documents = docs;
      logArry = documents.map((item) => {
        return {
          description: item.description,
          duration: item.duration,
          date: item.date.toDateString(),
        };
      });
      const newLog = new Log({
        username: userData.username,
        count: logArry.length,
        log: logArry,
      });
      newLog.save((err, data) => {
        if (err) console.log("ERROR newLog.save ");
        res.json({
          username: data.username,
          count: data.count,
          _id,
          log: logArry,
        });
      });
    });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
