const m = require('mongoose');
const email_regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const U = m.Schema({
    _id: m.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true, match:email_regex},
    password: {type: String, required: true},
    dob: {type: Date, required: true},
}, {collection: 'userDB'})

module.exports = m.model('User', U);