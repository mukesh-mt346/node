const express = require("express");
const Product = require("../../db/models/product");
const mongoose = require("mongoose");
const responseBody = require("../response");
const auth = require("../middleware/auth");

const r = express.Router();

r.get("/", auth, function (req, res, next) {
  Product.find()
   // .select("-_id")
    .exec()
    .then((product) => {
      if (product.length == 0) {
        res
          .status(200)
          .json({ message: "get /products", data: "no products found" });
      } else res.status(200).json({ message: "get /products", data: responseBody.products(product) });
    })
    .catch((err) => {
      res.status(500).json({ message: "get /products", error: err });
    });
});

r.post("/", function (req, res, next) {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
  });
  // product.save((err, result) => {});
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "post /products", data: responseBody.product(result) });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "post /products", error: err });
    });
});

r.get("/:productId", function (req, res, next) {
  const productId = req.params.productId;
  Product.findById(productId)
    .exec()
    .then((product) => {
      console.log("Product found:", product);
      if (!product) {
        res.status(404).json({
          message: `get /products/${productId}`,
          data: "product not found",
        });
      }
      res
        .status(200)
        .json({ message: `get /products/${productId}`, data: responseBody.product(product)});
    })
    .catch((err) => {
      console.log("Product error:", err);
      res
        .status(500)
        .json({ message: `get /products/${productId}`, error: err });
    });

  // Product.findOne({ id: req.params.productId }, function (err, product) {})
  //   .then(function (product) {})
  //   .catch((err) => {});
});

r.patch("/:productId", function (req, res, next) {
  const productId = req.params.productId;
  // Product.updateOne({_id: productId}, {$set: { name: req.body.name, description: req.body.description, price: req.body.price, quantity: req.body.quantity}})

  // [ {name: 'name',value: 'new name'}]
  let updatedProduct = {};
  for (const op of req.body) {
    updatedProduct[op.name] = op.value;
  }
  Product.updateOne({ _id: productId }, { $set: updatedProduct })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ message: `patch /products/${productId}`, data: responseBody.product(result)});
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `patch /products/${productId}`, error: err });
    });
});

r.delete("/:productId", function (req, res, next) {
  const productId = req.params.productId;
  Product.remove({ _id: productId })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ message: `delete /products/${productId}`, data: result });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `delete /products/${productId}`, error: err });
    });
});

//----------------------------------------------------------------
module.exports = r;
