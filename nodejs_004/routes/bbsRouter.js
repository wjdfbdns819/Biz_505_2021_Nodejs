const express = require("express");
const router = express.Router();

const { tbl_bbs } = require("../models/index");

router.get("/write", (req, res) => {
  res.render("write");
});

router.post("/write", (req, res) => {
  tbl_bbs.create(req.body).then((result) => {
    res.json(result);
  });
});

// router.get("/detail", (req, res) => {
//   res.render("detail");
// });

router.get("/detail", (req, res) => {
  let id = req.query.b_id;
  tbl_bbs.findByPk(id).then((result) => {
    console.log(result);
    res.render("detail", { BBS: result });
  });
});

module.exports = router;
