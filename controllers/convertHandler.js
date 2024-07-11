function ConvertHandler() {
  const validInput = /^((?:(?:\d+)?\.?(?:[1-9])(?:\d+)?)(?:\/(?:\d+\.?)?(?:[1-9])(?:\d+)?)?)?([A-Za-z]+)$/;
  const units = {
    km: {name: 'kilometers', returnUnit: 'mi'}, mi: {name: 'miles', returnUnit: 'km'},
    kg: {name: 'kilograms', returnUnit: 'lbs'}, lbs: {name: 'pounds', returnUnit: 'kg'},
    l: {name: 'liters', returnUnit: 'gal'}, gal: {name: 'gallons', returnUnit: 'L'}
  }

  this.getNum = function(input) {
    let result;
    result = input.match(validInput);

    if (result) result = eval(result[1]);
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.match(validInput);

    if (result) result = result[2];

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    result = units[initUnit.toLowerCase()].returnUnit;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    result = units[unit].name;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    
    result = Number(result.toFixed(5));

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
