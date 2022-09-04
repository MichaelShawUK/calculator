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

function trunc(num) {

  num = num.toString();
  let output;
  let index;

  if (+num > 10**20) return num;

  // Returns result in scientific notation
  if (+num > 99999999){

    let int = num.charAt(0);
    let decPlaces = num.charAt(1) + num.charAt(2);

    if (num.includes('.')) {
      index = num.indexOf('.') - 1;
    }
    else {
      index = num.length - 1;
    }
    output = `${int}.${decPlaces}*10<sup>${index}</sup>`;
    return output;
  }

  else if (num.length > 8) {   

    if (num[7] === '.'){
      output = num.slice(0, 7);
    }
    else {
      output = num.slice(0, 8);
    }
    return output;
  }
  else return num;
}


const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

let firstNum = null;
let operator = null;
let currentNum = null;

buttons.forEach(button => {
  button.addEventListener('click', e => {

    let press = e.target.textContent;

    if (press === 'AC') {
      display.textContent = '';
      firstNum = null;
      currentNum = null;
    }

    // Listens for operator key press
    if (press.match(/[\+\-\*\/xy]/)) {

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
        (press === 'xy') ? operator = '**' : operator = press;
        firstNum = currentNum;
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

    if (press === '=') {

      let result = operate(+firstNum, operator, +currentNum);
      display.innerHTML = trunc(result);
      currentNum = result;
    }
  })
})


