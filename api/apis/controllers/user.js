const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../db/models/user");
const jwt = require("jsonwebtoken");

const invalidmsg = (err) => {
  return {
    message: "Invalid",
    error: err.message,
  };
};

exports.signup = (x, y, z) => {
  //if user exists; mongoose automatically handles
  //   User.find({ email: x.body.email })
  //     .exec()
  //     .then((users) => {
  //       console.log(users.length);
  //       if (users.length == 1) {
  //         return y.status(422).json({ message: "invalid data" });
  //       } else {
  bcrypt.hash(x.body.password, 10, function (err, hash) {
    if (err) {
      return y.status(500).json(invalidmsg(err));
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        dob: new Date(1995, 11, 17), // the month is 0-indexed
        email: x.body.email,
        password: hash,
      });

      user
        .save()
        .then((u) => {
          return y
            .status(201)
            .json({ message: "User created successfully.", data: u });
        })
        .catch((err) => {
          return y.status(500).json(invalidmsg(err));
        });
    }
  });
};
//     })
//     .catch((err) => {
//       return y.status(500).json(invalidmsg(err));
//     });
// };

exports.login = (x, y, z) => {
  User.find({ email: x.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return y.status(500).json({ message: "Invalid" });
      }
      bcrypt.compare(x.body.password, user[0].password, (err, res) => {
        if (res) {
          const token = jwt.sign(
            { email: user[0].email, userId: user[0]._id, dob: user[0].dob },
            process.env.jwt_secret,
            { expiresIn: "1h" }
            /**
             * header.payload.salt
             * //payload
             * iss: // issuer
             * sub: // subject
             * aud: "web-front-end" //audience
             * exp: // expiration time
             * nbf : // not before
             * iat: // issued at time
             * jti: //jwt id
             * // private claims
             * name:
             * permisions:
             * ...
             * //header
             * alg: HS256, RS256
             * typ: JWT
             */
          );
          return y.status(200).json({
            message: "Login successful",
            token: token,
            data: user,
          });
        }
        return y.status(500).json({ message: "Invalid" });
      });
    })
    .catch((err) => {
      return y.status(500).json(invalidmsg(err));
    });
  const user = new User({});
};
