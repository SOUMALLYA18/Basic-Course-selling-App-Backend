const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/models");
const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Check if the user already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({
        msg: "Username already exists",
      });
    }

    // Create a new admin
    const newAdmin = await Admin.create({ username, password });

    res.status(201).json({
      msg: "Admin created successfully",
      admin: {
        id: newAdmin.id,
        username: newAdmin.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, imageLink, price } = req.body;

  try {
    const newCourse = await Course.create({
      title,
      description,
      imageLink,
      price,
    });
    res.status(201).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

module.exports = router;
