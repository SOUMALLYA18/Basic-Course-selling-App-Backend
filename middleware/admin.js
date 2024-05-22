const { Admin } = require("../db/models");

async function adminMiddleWare(req, res, next) {
  const username = req.headers["username"];
  const password = req.headers["password"];
  try {
    const admin = await Admin.findOne({
      username: username,
      password: password,
    });

    if (admin) {
      next();
    } else {
      res.status(403).json({
        msg: "Admin Doesn't Exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred",
      error: error.message,
    });
  }
}

module.exports = adminMiddleWare;
