const User = require('../models/user');

const checkIfUsernameExists = async username => await User.exists({ username });

const signupUser = async bodyData => {
  try {
    const { username, password } = bodyData;

    const userExists = await checkIfUsernameExists(username);
    if (userExists) throw new Error('Username already taken');

    return await User.create({ username, password });
  } catch (err) {
    throw Error(err);
  }
};

const loginUser = async bodyData => {
  try {
    const { username, password } = bodyData;
    const user = await User.findOne({ username }).lean();

    if (!user) throw new Error('User does not exist with the given username');

    if (user.password !== password) throw new Error('Incorrect password');

    delete user.password;
    return user;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  loginUser,
  signupUser,
};
