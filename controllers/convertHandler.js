
const metric = ['l', 'kg', 'km'];
const imperial = ['gal', 'lbs', 'mi'];
var handleInput = function(input) {
  var real
  var leftOver
  var unit
  var result
  var number = new RegExp(/[\d . /]+/);
  if (input.split('').includes('.') || input.split('').includes('/')) {
      unit = /[a-zA-Z]+/.exec(input);
      return number.exec(input)+unit;
  }
  return input;
}
function ConvertHandler() {
  this.getNum = function(input) {  
    var result;
    //double fraction
    if (input.split('').slice(input.indexOf('/')+1).includes('/')) 
      return 'invalid input';

    metric.concat(imperial).forEach(e => {
      if (e.toString() === input.toString()) result = 1; 
    });
    if (result) return result;
    var number = new RegExp(/[\d . /]+/);
    
    if (input.split('').includes('/')) {
      var n1 = number.exec(handleInput(input)).toString().split('/')[0];
      var n2 = number.exec(handleInput(input)).toString().split('/')[1]
      return Number(n1 / n2);
    }
    if (number.exec(handleInput(input)) == ' ') {
      return 'no numerical input';
    }
    return Number(number.exec(handleInput(input))) === 0?
                  'no numerical input': Number(number.exec(handleInput(input)));
  };
  
  this.getUnit = function(input) {
    var unit = new RegExp(/[a-zA-Z]+/);
    var result = unit.exec(input.toLowerCase());
    return result != null? result.toString(): 'invalid unit'; 
  };
  
  this.getReturnUnit = function(initUnit) {
    var index;
    console.log(initUnit);
    if (metric.includes(initUnit.toString())) {
      index = metric.indexOf(initUnit.toString());
      return imperial[index];
    }
    else if (imperial.includes(initUnit.toString())) {
      index = imperial.indexOf(initUnit.toString());
      return metric[index];
    }
    else return 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    /*
    Example return:
{initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'}
    */
    switch (unit.toString().toLowerCase()) {
      case 'l': return 'liters';
      case 'kg': return 'kilograms';
      case 'km': return 'kilometers';
      case 'gal': return 'gallons';
      case 'lbs': return 'pounds';
      case 'mi': return 'miles';
      default: return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    switch (initUnit.toString().toLowerCase()) {
      case 'gal': result = initNum * galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'l': result = initNum / galToL; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'km': result = initNum / miToKm; break;
      case 'invalid unit': return 'invalid unit';
      default: return null;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    console.log("ret unit: "+returnUnit);
    console.log("init num: "+initNum);
    console.log("ret num: "+returnNum);
    
    if (returnUnit === 'invalid unit' || initNum === 'no numerical input') {
      if (returnUnit === 'invalid unit' && initNum === 'no numerical input') {
        return 'invalid number and unit';
      }
      if (initNum === null) {
        return 'no numerical input';
      } return returnUnit;
    }
    
    var body = {
       initNum, initUnit, returnNum, returnUnit, 
       string: `${initNum} ${this.spellOutUnit(initUnit)}`+
      ` converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`
    };
    return body;
  };
}

module.exports = ConvertHandler;
