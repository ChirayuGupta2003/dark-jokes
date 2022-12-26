const { Schema, model } = require("mongoose");

const jokeSchema = new Schema({
  type: { type: String, set: (a) => (a === "" ? undefined : a) },
  joke: { type: String, set: (b) => (b === "" ? undefined : b) },
  setup: { type: String, set: (c) => (c === "" ? undefined : c) },
  delivery: { type: String, set: (d) => (d === "" ? undefined : d) },
  id: Number,
});

module.exports = new model("Jokes", jokeSchema);
