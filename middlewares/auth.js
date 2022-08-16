const { verifyJWT } = require('../utils/jwt');

const checkLoggedIn = (req, res, next, isLoggedInReqd) => {
  if (!req.user && isLoggedInReqd)
    return res.status(403).send({
      error: 'Only logged in users allowed',
    });

  return next();
};

const userAuth = async (req, res, next, isLoggedInReqd = false) => {
  try {
    const auth = req.header('Authorization');

    if (!auth) {
      req.user = false;
      return checkLoggedIn(req, res, next, isLoggedInReqd);
    }

    const token = auth.split(' ')[1];
    if (token === 'undefined' || !token) {
      req.user = false;
      return checkLoggedIn(req, res, next, isLoggedInReqd);
    }

    const decodedUser = await verifyJWT(token);
    if (!decodedUser) {
      req.user = false;
    } else {
      req.user = decodedUser;
    }
    return checkLoggedIn(req, res, next, isLoggedInReqd);
  } catch (error) {
    req.user = false;
    return checkLoggedIn(req, res, next, isLoggedInReqd);
  }
};

const userReqdAuth = (req, res, next) => userAuth(req, res, next, true);

module.exports = {
  userAuth,
  userReqdAuth,
};
