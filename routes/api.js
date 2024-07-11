'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/test', (req, res) => {
    console.log(req.query);
    res.json({
      answer: convertHandler.getNum(req.query.num || '1.12/.65mi'),
      boolean: Boolean(convertHandler.getNum(req.query.num || '1.12/.65mi')),
      returnUnit: convertHandler.getReturnUnit(convertHandler.getUnit(req.query.num)),
      unitName: convertHandler.spellOutUnit(convertHandler.getUnit(req.query.num))
    })
  })
};
