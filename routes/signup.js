const route = require('express').Router();

const { signupUser } = require('../controllers/user');
const { createJWT } = require('../utils/jwt');

route.post('/', async (req, res) => {
  try {
    const user = await signupUser(req.body);
    const token = createJWT(user);

    res.status(200).send({
      success: true,
      message: 'Signup success',
      user: { _id: user._id, username: user.username },
      token,
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

module.exports = route;
