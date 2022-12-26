const express = require("express");
const mongoose = require("mongoose");
const Jokes = require("./models/Jokes");

let count;

(async () => {
  await mongoose
    .connect(
      "mongodb+srv://chirayugupta2003:a1TjK2TxFnALv49l@cluster0.qlz9leg.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(async (_) => {
      console.log("connected to db");
      app.listen(port, () => {
        console.log(`Listening to port ${port}`);
      });

      count = await Jokes.countDocuments();

      console.log(count);
    });
})();

const port = 5000;
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  const id = Math.floor(Math.random() * count);
  let joke = await Jokes.findOne({ id: id });
  joke = {
    type: joke.type,
    joke: joke.joke,
    setup: joke.setup,
    delivery: joke.delivery,
    id: joke.id,
  };

  // res.json(joke);
  console.log(joke);

  res.render(__dirname + "/index.html", { joke: joke });
});

// app.get("/submit", (req, res) => {
//   res.render(__dirname + "/form.html");
// });

// app.post("/submit", async (req, res) => {
//   const data = req.body;
//   data.id = count++;

//   if (data.setup && data.delivery) data.type = "twopart";
//   else data.type = "single";

//   Jokes.create(data);
//   res.redirect("/submit");
//   console.log(data);
// });

app.set("view engine", "html");

app.engine("html", require("ejs").renderFile);
