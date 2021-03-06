const express = require("express");
const router = express.Router();

// 날짜 dependency 가져오기
const moment = require("moment");
const { tbl_product, tbl_table_orders } = require("../models/index");

// localhost:3000/pos/order/3이라고 URL이 전송되어 오면
// 숫자 3이 변수 table_id에 담겨온다
// 이 table_id 는 req.params.table_id를 getter하여 값을 확인 할 수 있다
router.get("/order/:table_id", async (req, res) => {
  const table_id = req.params.table_id;
  console.log("table id", table_id);

  // p_name 칼럼을 기준으로 오름차순 정렬하여 product table에 입력된 전체 데이터 보이기
  const MENU = await tbl_product.findAll().then({ order: ["p_name", "ASC"] });
  //.then((result)=>{
  //	res.render("order_view", {table_id, MENU: result});
  //});

  const order_list = await tbl_table_orders.findAll({
    where: { to_table_id: table_id },
  });

  res.render("order_view", { table_id, MENU });

  //res.send(table_id);
  //res.render("order_view", { table_id : table_id})
  //res.render("order_view", { table_id });
});

// table id와 menu id가 Web으로부터 전달되어 왔다
// 현재 table에 손님이 있고, 메뉴를 주문하기 시작했다
// let menu_list = [];
router.get("/order/:table_id/input/:menu_id", (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  // 선택된 메뉴를 menu_list에 추가
  tbl_product.findByPk(menu_id).then((product) => {
    // menu_list.push(result);
    // console.log(menu_list)

    // tbl_table_orders에 inssert할 데이터 준비
    const table_orders = {
      to_table_id: table_id,
      to_pcode: menu_id,
      to_qty: 1,
      to_price: product.p_price,
      to_date: moment().format("YYYY[-]MM[-]DD"),
      to_time: moment().format("HH:mm:ss"),
    };

    tbl_table_orders.create(table_orders).then((result) => {
      res.json(result);
      // tbl_table_orders
      //  .findAll({
      //     where: { to_table_id: table_id },
      //    include: [{ model: tbl_product, require: false }],
      // })
      // .then((order_list) => {
      //  res.json({ table_id, order_list });
      // });
    });
  });
});

// table Layout에서 주문서화면으로 진입할때
//  현재 table에 주문 리스트가 있으면 화면에 출력하기 위한
// 	Request 처리
router.get("/getorder/:table_id", (req, res) => {
  const table_id = req.params.table_id;

  /**
   * 주문이 진행중인 상태에서는 orders 들의
   *  to_pay 칼럼이 null 이고,
   *  결제가 완료된 상태는 to_pay에 문자열 P가 담기게 되므로
   *  table_layout에서 table을 선택하고, 주문이 들어오면
   *  해당 table id의 데이터들 중에서 to_pay가 null인 값만
   *  select하여 보여주기
   */
  tbl_table_orders
    .findAll({
      where: { to_table_id: table_id, to_pay: null },
      include: [
        // require 기본값은 true임
        { model: tbl_product, require: false },
      ],
    })
    .then((result) => res.json(result));
});

router.get("/order/:order_seq/delete", (req, res) => {
  const order_seq = req.params.order_seq;
  tbl_table_orders
    .destroy({
      where: { to_seq: order_seq },
    })
    .then(() => {
      res.send("OK");
    })
    .catch(() => {
      res.send("FAIL");
    });
});

router.get("/paycomplet/:table_id", (req, res) => {
  const table_id = req.params.table_id;
  // 주문서에 결제와 완료된 표식으로 to_pay 칼럼에 문자열 P 업데이트
  tbl_table_orders
    .update({ to_pay: "P" }, { where: { to_table_id: table_id } })
    .then(() => {
      res.send("OK");
    })
    .catch(() => {
      res.send("FAIL");
    });
});

module.exports = router;
