const checkAuth = (req, res, next) => {
    // `user.id` is a number but `params.id` is a string
    console.log('hello', req.params.id)
    if (req.session.user.id == req.params.id) {
      next();
    } else {
      // res.redirect('/login');
      res.json({"isAuthenticated" : false})
    }
  };
  
  module.exports = checkAuth;