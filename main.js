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

let negativeFlag = false;

function negativeCheck(num) {
  if (negativeFlag) {
    num = '-' + num;
    negativeFlag = false;
  }
  return num;
  }

function truncate(num) {

  num = num.toString();

  if (num < 0) {
    num = num.slice(1);
    negativeFlag = true;
  }
  if (num.length <= 8) {
    return negativeCheck(num);
  }

  let exponent;
  let decimalCheck = num.slice(0, 7);

  if (num.includes('e')) {
    let eIndex = num.indexOf('e');
    exponent = num.slice(eIndex);
  }
  else if (num.charAt(8) === '.' || decimalCheck.includes('.')) {
    return negativeCheck(num.slice(0, 8));
  }

  let int = num.charAt(0);
  let decPlaces;
  if (num < 1) {
   decPlaces = num.charAt(2) + num.charAt(3);
  }
  else {
    decPlaces = num.charAt(1) + num.charAt(2);
  }
  
  if (!exponent) {
    if (num.includes('.')){
      exponent = `e+${num.indexOf('.') - 1}`;
    }
    else {
      exponent = `e+${num.length - 1}`;
    }
  }
  num = `${int}.${decPlaces}${exponent}`;

  return negativeCheck(num);

}


const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

let firstNum = null;
let operator = null;
let currentNum = null;

let repeatCalc = false;
let temp;
let result;
let prevOperator = null;

function clearMemory() {
  firstNum = null;
  currentNum = null;
  operator = null;
  prevOperator = null;
  result = null;
  temp = null;
  repeatCalc = false;
}

buttons.forEach(button => {
  button.addEventListener('click', e => {

    calcDisplay(e.target.textContent);
  })
})

window.addEventListener('keydown', e => {

  calcDisplay(e.key);
})


function calcDisplay(press) {

  if (press === 'AC' || press === 'Escape') {
    display.textContent = '';
    clearMemory();
    location.reload();
  }

  // Listens for operator key press
  if (press.match(/[\+\-\*\/^xy]/)) {

    repeatCalc = false;

    // Listens for +/-(negative) button press
    if (press.match(/\+\/\-/)) {
      if (currentNum) {
        currentNum = (+currentNum * (-1)).toString();
        display.textContent = currentNum;
      }
      else {
        currentNum = '-';
        display.textContent = currentNum;
      }
    }
    else {
      (press === '^' || press === 'xy') ? operator = '**' : operator = press;
      if (firstNum) {
        result = operate(+firstNum, prevOperator, +currentNum);
        display.textContent = truncate(result);
        firstNum = result;
      }
      else {
        firstNum = currentNum;
      }
      prevOperator = operator;
      currentNum = null;
    }
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

  if (press === 'Enter' || press === '=') {

    if (repeatCalc) {
      firstNum = currentNum;
      result = operate(+firstNum, operator, +temp);
      display.textContent = truncate(result);
    }
    else {
      result = operate(+firstNum, operator, +currentNum);
      display.textContent = truncate(result);
      temp = currentNum;
      firstNum = null;
    }
    
    currentNum = result;
    repeatCalc = true;

  }

  if ((press === 'Backspace' || press === 'del') && currentNum) {
    currentNum = currentNum.slice(0, currentNum.length - 1);
    display.textContent = currentNum;
  }
}
