function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {return 'ERROR'};
  return a / b;
}

let a = 8;
let b = 2;

console.log(add(a, b));
console.log(subtract(a, b));
console.log(multiply(a, b));
console.log(divide(a, b));

console.log(divide(a, 0));
