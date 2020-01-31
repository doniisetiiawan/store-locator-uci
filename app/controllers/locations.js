const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Location = mongoose.model('Location');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/locations', (req, res, next) => {
  Location.find((err, item) => {
    if (err) return next(err);
    res.status(200).json(item);
  });
});

router.get('/locations/add', (req, res) => {
  res.send('Insert Locations');
});

router.post('/locations', (req, res) => {
  const loc = {
    title: req.body.title,
    coordinates: [req.body.long, req.body.lat],
  };

  const locations = new Location(loc);

  locations.save((error, item) => {
    if (error) {
      return res.status(400).send({
        message: error,
      });
    }

    res.status(200).json(item);
  });
});
