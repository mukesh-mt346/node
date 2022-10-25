const express = require("express");
const user = require("../controllers/user");


const r = express.Router();

r.post('/login', user.login);

r.post('/signup', user.signup);



//----------------------------------------------------------------
module.exports = r;