const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err));

const User = require("../user.js");

const user = new User({ name: "s3924683", age: 20 });
user.save().then(console.log("Done!"));
