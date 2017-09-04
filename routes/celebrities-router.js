const express = require('express');
const CelebrityModel = require('../models/celebrities-model.js');
const router = express.Router();

router.get('/celebrities', (req, res, next) => {
  CelebrityModel.find((err, allCelebrities) => {
    if(err) {
      next(err);
      return;
    }

    res.locals.listOfCelebrities = allCelebrities;

    res.render('celebrities-views/index.ejs');
  });
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities-views/celeb-form.ejs');
});

router.post('/celebrities', (req, res, next) => {
  const theCeleb = new CelebrityModel({
    name:req.body.celebName,
    ocupation: req.body.celebOcupation,
    catchPhrase: req.body.celebCatchPhrase
  });

  theCeleb.save((err) => {
    if(err) {
      next(err);
      return;
    }

    res.redirect('/celebrities');
  });
});

router.get('/celebrities/:celebId', (req, res, next) => {
  CelebrityModel.findById(
    req.params.celebId,
    (err, celebFromDb) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.celebInfo = celebFromDb;
      res.render('celebrities-views/show.ejs');
    }
  )
});

router.get('/celebrities/:celebId/edit', (req, res, next) => {
  CelebrityModel.findById(
    req.params.celebId,
    (err, celebFromDb) => {
      if(err) {
        next(err);
        return;
      }

      res.locals.celebInfo = celebFromDb;

      res.render('celebrities-views/edit-celebrities.ejs');
    }
  )
});

router.post('/celebrities/:celebId', (req, res, next) => {
  CelebrityModel.findById(
    req.params.celebId,
    (err, celebFromDb) => {
      if(err) {
        next(err);
        return;
      }

      celebFromDb.name = req.body.celebName;
      celebFromDb.ocupation = req.body.celebOcupation;
      celebFromDb.catchPhrase = req.body.celebCatchPhrase;
      celebFromDb.save((err) => {
        if(err) {
          next(err);
          return;
        }
        res.redirect('/celebrities');
      });
    }
  );
});

router.post('/celebrities/:celebId/delete', (req, res, next) => {
  CelebrityModel.findByIdAndRemove(
    req.params.celebId,

    (err, celebInfo) => {
      if(err) {
        next(err);
        return;
      };
      res.redirect('/celebrities');
    }
  );
})

module.exports = router;
