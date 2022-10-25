const jwt = require("jsonwebtoken");

module.exports = (x, y, z) => {
  try {
    const token = x.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.jwt_secret);
    x.tokendata = decoded;
    z();
  } catch (e) {
    return y.status(401).json({ message: "unauthorized"});
  }
};
