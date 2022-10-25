const express = require("express");
const Product = require("../../db/models/product");
const Order = require("../../db/models/order");
const mongoose = require("mongoose");
const responseBody = require("../response");
const auth = require("../middleware/auth");

const r = express.Router();

/*{
	"products":[
		{
            "quantity": 1,
            "productId": "6334ac80c7410081d8389835"
		},
	]
	
} */

r.get("/", auth, function (req, res, next) {
  let populateText = "";
  if (
    req.get("document-size") &&
    req.get("document-size").toLowerCase() === "complete"
  ) {
    populateText = "products.productId";
  }
  Order.find()
    // .select("-_id")
    .populate(populateText)
    .exec()
    .then((orders) => {
      if (orders.length == 0) {
        res
          .status(200)
          .json({ message: "get /orders", data: "no orders found" });
      } else res.status(200).json({ message: "get /orders", data: orders });
    })
    .catch((err) => {
      res.status(500).json({ message: "get /orders", error: err });
    });
});

r.post("/", function (req, res, next) {
  console.log(req.body.product);
  const orders = new Order({
    _id: new mongoose.Types.ObjectId(),
    products: req.body.products,
    // product: req.body.product,
  });
  // orders.save((err, result) => {});
  orders
    .save()
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: "post /orders", data: responseBody.order(result) });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "post /orders", error: err });
    });
});

r.get("/:ordersId", function (req, res, next) {
  const ordersId = req.params.ordersId;
  Order.findById(ordersId)
    .exec()
    .then((order) => {
      console.log("orders found:", order);
      if (!order) {
        res.status(404).json({
          message: `get /orders/${ordersId}`,
          data: "orders not found",
        });
      }
      res.status(200).json({
        message: `get /orders/${ordersId}`,
        data: responseBody.order(order),
      });
    })
    .catch((err) => {
      console.log("orders error:", err);
      res.status(500).json({ message: `get /orders/${ordersId}`, error: err });
    });

  // orders.findOne({ id: req.params.ordersId }, function (err, orders) {})
  //   .then(function (orders) {})
  //   .catch((err) => {});
});

r.patch("/:ordersId", function (req, res, next) {
  const ordersId = req.params.ordersId;
  // orders.updateOne({_id: ordersId}, {$set: { name: req.body.name, description: req.body.description, price: req.body.price, quantity: req.body.quantity}})

  // [ {name: 'name',value: 'new name'}]
  let updatedOrder = {};
  for (const op of req.body) {
    updatedOrder[op.name] = op.value;
  }
  Order.updateOne({ _id: ordersId }, { $set: updatedOrder })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `patch /orders/${ordersId}`,
        data: responseBody.order(result),
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `patch /orders/${ordersId}`, error: err });
    });
});

r.delete("/:ordersId", function (req, res, next) {
  const ordersId = req.params.ordersId;
  Order.remove({ _id: ordersId })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ message: `delete /orders/${ordersId}`, data: result });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `delete /orders/${ordersId}`, error: err });
    });
});

//----------------------------------------------------------------
module.exports = r;
