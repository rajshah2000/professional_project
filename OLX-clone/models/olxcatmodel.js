const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopping_olx")
  .then(() => console.log("Connected to the Database!"));

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const olxcatmodel = mongoose.model("Category", CategorySchema);
module.exports = olxcatmodel;