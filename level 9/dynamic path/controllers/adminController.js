const Home = require("../models/home"); 

exports.getaddHome = (req, res, next) => {
  res.render('admin/edit-homes', {
    pageTitle: 'Add Home',
    currentPage: 'addHome',
    editing: false,
  });
};


exports.getEditHomes = (req, res, next) => {
  const homeid = req.params.homeid;
  const editing = req.query.editing === 'true';

  Home.findById(homeid, home => {
    if (!home) {
      console.log("home not found for editing");
      return res.redirect("/admin/admin-home-list");
    }
    console.log(homeid, editing, home);
    res.render('admin/edit-homes', {
      pageTitle: 'edit your home',
      currentPage: 'host-homes',
      editing: editing,
      home: home,
    });
  });

};




exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((RergisterdHomes) => {
    res.render("admin/admin-home-list", {
      RergisterdHomes: RergisterdHomes, 
      pageTitle: "host-home-list",
      currentPage: "host-homes"
    });
  });
};


exports.postaddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoURL } = req.body;

  const home = new Home(houseName, price, location, rating, photoURL ); 
  home.save(); 

  res.redirect('/admin-home-list');
};


exports.postEditHomes = (req, res, next) => {
  const { id, houseName, price, location, rating, photoURL } = req.body;

  const home = new Home(houseName, price, location, rating, photoURL);
  home.id = id;
  home.save();

  res.redirect('/admin-home-list');
};