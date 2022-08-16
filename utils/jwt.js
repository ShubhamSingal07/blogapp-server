const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const filterUser = user => ({ _id: user._id, username: user.username });

const createJWT = user => jwt.sign(filterUser(user), JWT_SECRET, { expiresIn: 24 * 30 * 60 * 60 });

const verifyJWT = token =>
  new Promise((resolve, reject) =>
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      if (Date.now() >= decoded.exp * 1000) return resolve(false);
      return resolve(filterUser(decoded));
    }),
  );

module.exports = {
  createJWT,
  verifyJWT,
};
