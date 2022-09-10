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
    default:
      return power(a, b);
  }
}

const display = document.querySelector('#display');
let firstNum = null;
let secondNum = null;
let operator = null;

function getNumber(num) {
  if (isNaN(num)) {
    display.textContent = 'ERROR';
  }
  else {
    (firstNum) ? secondNum = num : firstNum = num;
  }
}

let num = null;
let result = null;

window.addEventListener('keydown', e => {
  userInput(e.key);
  }
)

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', e => {
    userInput(e.target.textContent);
  })
});

function calculateResult() {
  result = operate(+firstNum, operator, +secondNum);
  displayNum(result.toString());
  firstNum = result;
}

function displayNum(num) {
  if (num.length <= 10) {
    display.textContent = num;
  }
  else {
    num = +num;
    display.textContent = num.toExponential(2);
  }
}

function userInput(press) {

  console.log(num);

  if (press.match(/[0-9]/) || press == '.') {
    (+num) ? num += press : num = press;
    displayNum(num);
  }
  if (press.match(/[\+\-\*\/\^xy]/)) {
        
    if (operator) {
      getNumber(num);
      secondNum = null;

      if (firstNum && secondNum) {
        calculateResult();
      }
    }
    getNumber(num);
    num = '';
    operator = press;
  }
  if (press == '=' || press == 'Enter') {
    getNumber(num);
    if (firstNum && operator && secondNum) {
          calculateResult();
        }
    }
  if (press == 'AC') location.reload();
}