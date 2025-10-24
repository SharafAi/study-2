
exports.getLogin = (req, res, next) => {
  // 'login' will be searched in the directories set in app.js with app.set('views', [...])
  res.render('login', {
    pageTitle: 'login',
    currentPage: 'login',
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => { 
  console.log(req.body);
  req.isLoggedIn = true;

  res.redirect('/');
};
