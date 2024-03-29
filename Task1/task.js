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
  // console.log(`sum ${string1}, ${string2}`);
  var carry = 0;

  for (i = string1.length - 1; i >= 0 || carry != 0; i--){
    // j = i - 1;
    
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

// String.minus = function (string) {
//   console.log');
// };

// String.divide = function (string) {
//   console.log('soma');
// };

// String.multiply = function(string) {
//   console.log('soma');
// };

var num1 = prompt('Please, type first number: ');
var num2 = prompt('Please, type second number: ');
if (num1.length > num2.length){
  num2 = fillBlancks(num2, num1.length - num2.length);
  String.plus(num1, num2);
} else if (num2.length > num1.length){
  num1 = fillBlancks(num1, num2.length - num1.length);
  String.plus(num2, num1);
} else{
  String.plus(num1, num2);
}