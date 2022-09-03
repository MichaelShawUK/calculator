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
let operator = null;
let currentNum = null;

buttons.forEach(button => {
  button.addEventListener('click', e => {

    let press = e.target.textContent; 

    console.log(press);

    if (press === 'AC') {
      display.textContent = '';
      firstNum = null;
      currentNum = null;
    }

    if (press.match(/[\+\-\*\/xy]/)) {
      (press === 'xy') ? operator = '**' : operator = press;
      firstNum = currentNum;
      currentNum = null;
    }

    if (press.match(/[0-9\.]/)) {
      if (press === '.' && currentNum.includes('.')) {
        display.textContent = 'ERROR';
      }
      else {
        (currentNum) ? currentNum += press : currentNum = press;
        display.textContent = currentNum;
      }
    }

    if (press === '=') {

      let result = operate(+firstNum, operator, +currentNum);
      display.textContent = result;
      currentNum = result;
    }
  })
})


