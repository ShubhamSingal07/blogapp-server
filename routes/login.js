const route = require('express').Router();

const { loginUser } = require('../controllers/user');
const { createJWT } = require('../utils/jwt');

route.post('/', async (req, res) => {
  try {
    const user = await loginUser(req.body);
    const token = createJWT(user);

    res.status(200).send({
      success: true,
      message: 'Login success',
      user: { _id: user._id, username: user.username },
      token,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = route;
