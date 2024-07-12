'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    if (!req.query.input) {
      return res.redirect('/');
    }

    const input = req.query.input;

    try {
      let conversion = {};
      conversion.initNum = convertHandler.getNum(input);
      conversion.initUnit = convertHandler.getUnit(input);

      let errMsg;
      if (!conversion.initNum) errMsg = 'invalid number';
      if (!conversion.initUnit) errMsg = errMsg ? errMsg + ' and unit' : 'invalid unit';
      if (errMsg) throw new Error(errMsg);

      conversion.returnNum = convertHandler.convert(conversion.initNum, conversion.initUnit);
      conversion.returnUnit = convertHandler.getReturnUnit(conversion.initUnit);
      conversion.string = convertHandler.getString(conversion.initNum, conversion.initUnit, conversion.returnNum, conversion.returnUnit)

      res.json(conversion)
    } catch(err) {
      res.type('text').send(err.message);
    }
  })
};
