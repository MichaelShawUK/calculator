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

function power(a, b) {
  return a ** b;
}

function operate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    case '**':
      return power(a, b);
  }
}

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

let firstNum = null;

buttons.forEach(button => {
  button.addEventListener('click', e => {

    let press = e.target.textContent; 

    if (press === 'AC') {
      display.textContent = '';
      firstNum = null;
    }

    if (press.match(/[0-9]/)) {
      (firstNum) ? firstNum += press : firstNum = press;
      display.textContent = firstNum;
    }
  })
})
