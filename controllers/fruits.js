// controllers/fruits.js

const Fruit = require('../models/fruit');

// Landing Page
const landingPage = async (req, res, next) => {
    res.render('index.ejs');
}

const index = async (req, res) => {
const foundFruits = await Fruit.find()
res.render('fruits/index.ejs', {
fruits: foundFruits
})
};

const newFruit = async (req, res, next) => {
    res.render('fruits/new.ejs');
  }

const postFruit = async (req, res, next) => {
    // first make sure that the data from the checkbox
    // is a boolean, by overwriting the req.body.isReadyToEat
    if (req.body.isReadyToEat === 'on') {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
  
    // inser the req body into the database
    await Fruit.create(req.body);
    res.redirect('/fruits');
}

const getFruit =  async (req, res, next) => {
    const fruits = await Fruit.find();
  
    res.render('fruits/index.ejs', { fruits });
}

const fruitId =  async (req, res, next) => {
    const fruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', { fruit });
  }

const deleteFruit = async (req, res, next) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect('/fruits');  
}

const editFruit =  async (req, res, next) => {
    const fruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/edit.ejs', { fruit });
}

const updateFruit = async (req, res, next) => {
    if (req.body.isReadyToEat === 'on') {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
  
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    res.redirect(`/fruits/${req.params.fruitId}`);
  }

module.exports = {
  index,
  fruitId,
  landingPage,
  newFruit,
  postFruit,
  getFruit,
  deleteFruit,
  editFruit,
  updateFruit

  
  

  // add each of your controller function names here
};

