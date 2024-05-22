const mongoose = require("mongoose");

mongoose.connect("mongodb-url");

const adminSchema = new mongoose.Schema({});

const userSchema = new mongoose.Schema({});

const courseSchema = new mongoose.Schema({});

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
