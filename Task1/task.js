const prompt = require('prompt-sync')();

// Function to fill blank spaces
function fillBlancks(string, spaces) {
  for (i = 0; i < spaces; i++){
    string = string.replace(/^/, '0');
  }
  return string
}

String.plus = function(string1, string2) {
  var result = '';
  var sum;
  var carry = 0;

  for (i = string1.length - 1; i >= 0 || carry != 0; i--){
    
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
  
  console.log(result);
};

String.minus = function (string1, string2) {
  var result = '';
  var minus;
  var ask = 0;

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

  console.log(result);
};

String.divide = function (string1, string2) {
  var rest = 0;
  var dividend = '';
  var quotient = '';
  var digit;
  var quotientDigit;

  
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

  console.log(quotient);

};

// String.multiply = function(string1, string2) {
//   console.log('soma');
// };



var num1 = prompt('Please, type first number: ');
var num2 = prompt('Please, type second number: ');


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