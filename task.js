const prompt = require('prompt-sync')();

// Function to fill blank spaces to the left
function fillBlancks(string, spaces) {
  for (i = 0; i < spaces; i++){
    string = string.replace(/^/, '0');
  }
  return string
}

function compareLengths(string1, string2) {
  if (string1.length > string2.length){
    string2 = fillBlancks(string2, string1.length - string2.length);
  } else if (string2.length > string1.length){
    string1 = fillBlancks(string1, string2.length - string1.length);
    return [string2, string1]
  }
  return [string1, string2];

}

String.prototype.plus = function(string2) {
  let result = '';
  let sum;
  let carry = 0;
  var string1 = this;

  [string1, string2] = compareLengths(string1,string2);

  for (let i = string1.length - 1; i >= 0 || carry != 0; i--){
    
    if (string1[i] == undefined ){
      result = result.replace(/^/, carry.toString())
      carry = 0;
    } else {
      // console.log(`${string1[i]}\n+\n${string2[i]}\n`)
      sum = parseInt(string1[i]) + parseInt(string2[i]) + carry;
  
      if (sum >= 10) {
        carry = Math.floor(sum/10); // takes the integer part as a carry
        sum = sum % 10 // remainder
      } else {
        carry = 0; // there is no carry
      }
      result = result.replace(/^/, sum.toString()) // adds the remainder to the start of the string
    }
    
  }
  
  result = result.replace(/^0+/, '');
  return result;
};

String.prototype.minus = function (string2) {
  let result = '';
  let minus;
  let ask = 0;
  let string1 = this;

  [string1, string2] = compareLengths(string1,string2);

  for (i = string1.length - 1; i >= 0; i--){

    if (ask == 0) {
      if (parseInt(string1[i]) >= parseInt(string2[i])) {
        minus = parseInt(string1[i]) - parseInt(string2[i]);
      } else {
        minus = parseInt(string1[i]) + 10 - parseInt(string2[i]);
        ask = 1;
      }
    } else {
      if ((parseInt(string1[i]) - 1) >= parseInt(string2[i])) {
        minus = parseInt(string1[i]) - 1 - parseInt(string2[i]);
      } else {
        minus = ((parseInt(string1[i]) - 1) + 10) - parseInt(string2[i])
      }
    }

    result = result.replace(/^/, minus.toString())
  }

  return result;
};

String.prototype.divide = function (string2) {
  let rest = 0;
  let dividend = '';
  let quotient = '';
  let digit;
  let quotientDigit;
  let string1 = this;

  for (i = 0; i < string1.length || quotient == ''; i++) {
    dividend += string1[i];
    
    if (parseInt(dividend) < parseInt(string2) ) {
      quotient += '0';
      continue;
      
    } else {
      quotientDigit = Math.floor(parseInt(dividend) / parseInt(string2));
      digit = quotientDigit * parseInt(string2);
      rest = parseInt(dividend) - digit;
      
      if (parseInt(rest) != 0){
        dividend = rest.toString();
      } else {
        dividend = ''
      }

      quotient += quotientDigit;
    }
  }

  quotient = quotient.replace(/^0+/, '');
  return quotient;

};

String.prototype.multiply = function(string2) {
  let result = '0';
  let carry = 0;
  let product;
  let productSum = '';
  let count = 0;
  let string1 = this;

  [string1, string2] = compareLengths(string1,string2);

  for (let i = string2.length - 1; i >= 0; i--) {
    carry = 0;    
    productSum = ''
  
    // if string2 has more algarisms adds 0 as needed for later sum
    if (string2.length > 1) { 
      for(let aux = 0; aux < count; aux++){
        productSum += '0';
      }
    }
    
    for (let j = string1.length - 1; j >= 0; j--) {
      // console.log(`${string2[i]}\n*\n${string1[j]}\n`)

      product = parseInt(string2[i]) * parseInt(string1[j]) + carry;

      if (product >= 10 && j-1 >= 0) { //if product above or 10 and not the last digit of string1 there is carry
        carry = Math.floor(product/10); // takes the integer part as a carry
        product = product % 10 // remainder
      } 
      productSum = productSum.replace(/^/, product.toString())
      
    }

    // sum of numbers (this ensures sum of numbers when string 2 has 2 or more algarisms)
    result = fillBlancks(result, productSum.length - result.length)
    result = result.plus(productSum)
    count++;
  }

  result = result.replace(/^0+/, '');
  return result;

};



//Debugging...
// console.log('22'.plus('99999999999999999999'));
// console.log('99999999999999999999'.minus('99999999999999999999'));
// console.log('9999999999'.divide('11'));
// console.log('999999999'.multiply('2'));

// Menu
// function menu() {
//   let option;
//   let result;

//   while (1) {
//     console.clear()
//     console.log('OPERATIONS OPTIONS');
//     console.log('1) Sum');
//     console.log('2) Subtraction');
//     console.log('3) Divide');
//     console.log('4) Multiply');
//     console.log('5) Exit')
//     option = prompt('Select the operation: ');

//     if (option == '5'){
//       break;
//     }

//     let num1 = prompt('Please, type first number: ');
//     let num2 = prompt('Please, type second number: ');

//     if(option == '1') {
//       if (num1.length > num2.length){
//         num2 = fillBlancks(num2, num1.length - num2.length);
//         result = num1.plus(num2);
//       } else if (num2.length > num1.length){
//         num1 = fillBlancks(num1, num2.length - num1.length);
//         result = num2.plus(num1);
//       } else{
//         result = num1.plus(num2);
//       }

//     }else if (option == '2') {
//       if (num1.length > num2.length){
//         num2 = fillBlancks(num2, num1.length - num2.length);
//         result = num1.minus(num2);
//       } else if (num2.length > num1.length){
//         num1 = fillBlancks(num1, num2.length - num1.length);
//         result = num2.minus( num1);
//       } else{
//         result = num1.minus(num2);
//       }

//     } else if (option == '3') {
//       result = num1.divide(num2);

//     } else if (option == '4') {
//       if (num1.length > num2.length) {
//         result = num1.multiply(num2);
//       } else {
//         result = num2.multiply(num1);
//       }
      
//     } else {
//       continue;
//     }
    
//     console.log('Result of operation: '+ result);
//     prompt('Press any key to continue');
//   }

// }

// menu();