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

router.post('/locations', (req, res) => {
  const loc = {
    title: req.body.title,
    coordinates: [
      parseFloat(req.body.long),
      parseFloat(req.body.lat),
    ],
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

router.post('/nearme', (req, res) => {
  const limit = req.body.limit || 10;

  const maxDistance = req.body.distance || 10;

  const coords = [];
  coords[0] = parseFloat(req.body.longitude);
  coords[1] = parseFloat(req.body.latitude);

  Location.find({
    coordinates: {
      $near: {
        type: 'Point',
        coordinates: coords,
      },
      $maxDistance: maxDistance * 1609.34,
      spherical: true,
    },
  })
    .limit(limit)
    .exec((err, stores) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(stores);
    });
});
