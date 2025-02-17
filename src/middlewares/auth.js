const adminAuth = (req, res, next) => {
  const token = 'xyz';
  console.log('auth checked for admin!!');
  let isAuthenticated = token === 'xyccz';
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    res.status(401).send('Unauthorized request!');
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = 'xyz';
  console.log('auth checked for user!!');
  let isAuthenticated = token === 'xyz';
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    res.status(401).send('Unauthorized request!');
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
