const e = require("express");
const Home = require("../models/home");
const fs = require('fs');

// GET Add Home Page
exports.getaddHome = (req, res, next) => {
  res.render('admin/edit-homes', {
    pageTitle: 'Add Home',
    currentPage: 'addHome',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: {},
  });
};

// GET Edit Home Page
exports.getEditHomes = (req, res, next) => {
  const homeid = req.params.homeid;
  const editing = req.query.editing === 'true';

  Home.findById(homeid)
    .then(home => {
      if (!home) {
        console.log("Home not found for editing");
        return res.redirect("/admin/admin-home-list");
      }
      res.render('admin/edit-homes', {
        pageTitle: 'Edit Home',
        currentPage: 'host-homes',
        editing: editing,
        home: home,
        isLoggedIn: req.isLoggedIn,
        user: {},
      });
    })
    .catch(err => {
      console.log("Error fetching home for editing:", err);
      res.redirect("/admin/admin-home-list");
    });
};

// GET Host Homes List
exports.getHostHomes = (req, res, next) => {
  Home.find()
    .then((RergisterdHomes) => {
      res.render("admin/admin-home-list", {
        RergisterdHomes: RergisterdHomes,
        pageTitle: "host-home-list",
        currentPage: "host-homes",
        isLoggedIn: req.isLoggedIn,
        user: {},
      });
    })
    .catch(err => {
      console.log("Error fetching homes:", err);
    });
};

// POST Add Home
exports.postaddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  console.log(houseName, price, location, rating, description);
  console.log(req.file);

  if (!req.file) {
    console.log("No file uploaded");
    return res.redirect("/add-home");
  }

  const photo = '/uploads/' + req.file.filename;

  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description
  });

  home.save()
    .then(() => {
      console.log("Home added successfully");
      res.redirect('/admin-home-list');
    })
    .catch(err => {
      console.log("Error while adding home:", err);
      res.redirect("/add-home");
    });
};

// POST Edit Home
exports.postEditHomes = (req, res, next) => {
  const { id, houseName, price, location, rating, description } = req.body;

  Home.findById(id)
    .then(home => {
      if (!home) {
        console.log("Home not found");
        return res.redirect('/admin-home-list');
      }

      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlinkSync('.' + home.photo, (err) => {
          if (err) {
            console.log("Error deleting old photo:", err);
          }
        });
        home.photo = '/uploads/' + req.file.filename;
      }

      return home.save();
    })
    .then(result => {
      console.log("Home updated successfully", result);
      res.redirect('/admin-home-list');
    })
    .catch(err => {
      console.log("Error while updating home:", err);
      res.redirect('/admin-home-list');
    });
};

// POST Delete Home
exports.postDeleteHome = (req, res, next) => {
  const homeid = req.params.homeid;
  console.log("Came to delete", homeid);

  Home.findByIdAndDelete(homeid)
    .then(() => {
      console.log("Home deleted successfully");
      res.redirect('/admin-home-list');
    })
    .catch(error => {
      console.log("Error while deleting home", error);
      res.redirect('/admin-home-list');
    });
};