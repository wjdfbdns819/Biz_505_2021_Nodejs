// express frame work의 객체 선언
const express = require("express");

// exppress frame work에서 routing을 수행하기 위한 sub 객체 선언
const controller = express.Router();

/* GET home page. */
controller.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

controller.get("/home", function (req, res, next) {
  res.send("Hello Korea");
});

// json 타입의 함수를 보낼때 사용함
controller.get("/json", function (req, res) {
  let mData = {
    name: "홍길동",
    tel: "020-222-222",
    age: 33,
  };
  res.json(mData);
});

// 여기서 설정된 controller를 다른곳에서 사용할수 있도록 설정하는 것
// 다른 js에서 import(require)하여 사용할수 있도록 controller 객체를 내보내기
module.exports = controller;
