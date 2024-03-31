const prompt = require('prompt-sync')();

// Function to fill blank spaces to the left
function fillBlancks(string, spaces) {
  for (i = 0; i < spaces; i++){
    string = string.replace(/^/, '0');
  }
  return string
}

String.plus = function(string1, string2) {
  let result = '';
  let sum;
  let carry = 0;

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
  
  return result;
};

String.minus = function (string1, string2) {
  let result = '';
  let minus;
  let ask = 0;

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

String.divide = function (string1, string2) {
  let rest = 0;
  let dividend = '';
  let quotient = '';
  let digit;
  let quotientDigit;

  
  for (i = 0; i < string1.length || quotient == ''; i++) {
    dividend += string1[i]
    if (parseInt(dividend) < parseInt(string2) ) {
      i += 1;
      dividend += string1[i];

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

  return quotient;

};

String.multiply = function(string1, string2) {
  let result = '0';
  let carry = 0;
  let product;
  let productSum = '';
  let count = 0

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
    result = String.plus(result,productSum)
    count++;
  }

  return result;

};



let num1 = prompt('Please, type first number: ');
let num2 = prompt('Please, type second number: ');
let result;

// Debugging ...
// String.divide(num1,num2);

// if (num1.length > num2.length){
//   num2 = fillBlancks(num2, num1.length - num2.length);
//   // String.plus(num1, num2);
//   // String.minus(num1, num2);
// } else if (num2.length > num1.length){
//   num1 = fillBlancks(num1, num2.length - num1.length);
//   // String.plus(num2, num1);
// } else{
//   // String.plus(num1, num2);
//   // String.minus(num1, num2);
// }

if (num1.length > num2.length) {
  result = String.multiply(num1,num2);
} else {
  result = String.multiply(num2,num1);
}

console.log(result)