const RergisterdHomes = [];

exports.getaddHome = (req, res, next) => {
  res.render('addHome', { pageTitle: 'add home', currentPage: 'addHome',currentPage : 'addHome' })
}

exports.postaddHome = (req, res, next) => {
  console.log("home Rergistration successful for:", req.body);
  RergisterdHomes.push(req.body);
  res.render('homeadded', { pageTitle: 'home added successfully', currentPage: 'homeadded' });
}

exports.gethomes = (req, res, next) => {
  console.log(RergisterdHomes);
  res.render("home", { RergisterdHomes: RergisterdHomes, pageTitle: 'airbnb home', currentPage: 'home' });
}


