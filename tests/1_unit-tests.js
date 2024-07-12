const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input.', function() {
    assert.isNotNull(convertHandler.getNum('1L'));
    assert.isNotNull(convertHandler.getNum('17L'));
    assert.isNotNull(convertHandler.getNum('269L'));
  });
  test('convertHandler should correctly read a decimal number input.', function() {
    assert.isNotNull(convertHandler.getNum('3.2L'));
    assert.isNotNull(convertHandler.getNum('.5L'));
    assert.isNotNull(convertHandler.getNum('0.9L'));
  });
  test('convertHandler should correctly read a fractional input.', function() {
    assert.isNotNull(convertHandler.getNum('1/2L'));
    assert.isNotNull(convertHandler.getNum('2/3L'));
    assert.isNotNull(convertHandler.getNum('6/8L'));
  });
  test('convertHandler should correctly read a fractional input with a decimal.', function() {
    assert.isNotNull(convertHandler.getNum('1.2/2.5L'));
    assert.isNotNull(convertHandler.getNum('.5/2L'));
    assert.isNotNull(convertHandler.getNum('2.22/4.67L'));
  });
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
    assert.isNull(convertHandler.getNum('3/2/3L'));
    assert.isNull(convertHandler.getNum('1/2/4L'));
    assert.isNull(convertHandler.getNum('.2/2/3L'));
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
    assert.strictEqual(convertHandler.getNum('L'), 1);
    assert.strictEqual(convertHandler.getNum('kg'), 1);
    assert.strictEqual(convertHandler.getNum('mi'), 1);
  });
  test('convertHandler should correctly read each valid input unit.', function() {
    assert.isNotNull(convertHandler.getUnit('km'));
    assert.isNotNull(convertHandler.getUnit('mi'));
    assert.isNotNull(convertHandler.getUnit('L'));
    assert.isNotNull(convertHandler.getUnit('gal'));
    assert.isNotNull(convertHandler.getUnit('kg'));
    assert.isNotNull(convertHandler.getUnit('lbs'));
  });
  test('convertHandler should correctly return an error for an invalid input unit.', function() {
    assert.isNull(convertHandler.getUnit('gps'));
    assert.isNull(convertHandler.getUnit('n'));
    assert.isNull(convertHandler.getUnit('ft'));
    assert.isNull(convertHandler.getUnit('f2mt'));
  });
  test('convertHandler should return the correct return unit for each valid input unit.', function() {
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
  });
  test('convertHandler should correctly convert gal to L.', function() {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
  });
  test('convertHandler should correctly convert L to gal.', function() {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417);
  });
  test('convertHandler should correctly convert mi to km.', function() {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
  });
  test('convertHandler should correctly convert km to mi.', function() {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
  });
  test('convertHandler should correctly convert lbs to kg.', function() {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
  });
  test('convertHandler should correctly convert kg to lbs.', function() {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
  });
});
