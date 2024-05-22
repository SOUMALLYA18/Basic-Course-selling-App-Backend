const { User } = require("../db/models");
async function userMiddleWare(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      username: username,
      password: password,
    });
    if (user) {
      next();
    } else {
      res.status(403).json({
        msg: "User Dosen't Exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "An Error Occured",
      error: error.message,
    });
  }
}

module.exports = userMiddleWare;
