const express = require("express");
const app = express();
const router = express.Router();

router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  res.render("./npcs.jpg")
});

module.exports = router;
