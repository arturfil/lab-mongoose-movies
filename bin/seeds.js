const mongoose = require('mongoose');
const CelebrityModel = require('../models/celebrities-model.js');

mongoose.connect('mongodb://localhost/celebdb');

const celebArray = [
  {
    name: "Bob Dylan",
    occupation: "Singer",
    catchPhrase: "Take care of all the memories, for you cannot relieve them... or something like that"
  },
  {
    name: "Picasso",
    occupation: "Singer",
    catchPhrase: "It takes a long time to be young"
  },
  {
    name: "Jack Nicholson",
    occupation: "Acter",
    catchPhrase: "The minute you aren't learning I beleive you are dead."
  }
];

CelebrityModel.create(
  celebArray,
  (err, celebAfterSave) => {
    if(err) {
      console.log('Creation Error');
      console.log(err);
      return;
    }

    celebAfterSave.forEach((oneCeleb) => {
      console.log("Succes!");
      console.log("New Celeb: '" + oneCeleb + "' added to the database. ");
    })
  }
);
