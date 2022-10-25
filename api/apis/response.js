const products = (result) => {
  const products = result.map((product) => {
    console.log(product.name);
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      details: {
        url: "http://localhost:8080/products/" + product._id,
        method: "GET",
      },
    };
  });

  return {
    count: result.length,
    products: products,
  };
};
const product = (product) => {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    details: {
      url: "http://localhost:8080/products/" + product._id,
      method: "GET",
    },
  };
};

const order = (order) => {
  return {
    product: order.product,
    details: {
      url: "http://localhost:8080/orders/" + order._id,
      method: "GET",
    },
  };
};
const orders = (orders) => {
  return {
    products: order.products,
    product: order.product,
    details: {
      url: "http://localhost:8080/products/" + order._id,
      method: "GET",
    },
  };
};

module.exports = { product, products, order };
