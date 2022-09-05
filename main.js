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

// function trunc(num) {

//   num = num.toString();
//   let output;
//   let index;

//   if (+num > 10**20) return num;

//   // Returns result in scientific notation
//   if (+num > 99999999){

//     let int = num.charAt(0);
//     let decPlaces = num.charAt(1) + num.charAt(2);

//     if (num.includes('.')) {
//       index = num.indexOf('.') - 1;
//     }
//     else {
//       index = num.length - 1;
//     }
//     output = `${int}.${decPlaces}*10<sup>${index}</sup>`;
//     return output;
//   }

//   else if (+num < -9999999){

//     let int = num.charAt(1);
//     let decPlaces = num.charAt(2) + num.charAt(3);

//     if (num.includes('.')) {
//       index = num.indexOf('.') - 2;
//     }
//     else {
//       index = num.length - 2;
//     }
//     output = `-${int}.${decPlaces}*10<sup>${index}</sup>`;
//     return output;
//   }

//   else if (num.length > 8) {   

//     if (num[7] === '.'){
//       output = num.slice(0, 7);
//     }
//     else {
//       output = num.slice(0, 8);
//     }
//     return output;
//   }

//   else return num;
// }


// *** Experimental section ***

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
  let decPlaces = num.charAt(1) + num.charAt(2);

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

// *** Experimental section *** ^^




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

    let press = e.target.textContent;

    if (press === 'AC') {
      display.textContent = '';
      clearMemory();
    }

    // Listens for operator key press
    if (press.match(/[\+\-\*\/xy]/)) {

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
        (press === 'xy') ? operator = '**' : operator = press;
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

    if (press === '=') {

      if (repeatCalc) {
        firstNum = currentNum;
        result = operate(+firstNum, operator, +temp);
        display.innerHTML = truncate(result);
      }
      else {
        result = operate(+firstNum, operator, +currentNum);
        display.innerHTML = truncate(result);
        temp = currentNum;
      }
      
      currentNum = result;
      repeatCalc = true;

    }

    if (press === 'del' && currentNum) {
      currentNum = currentNum.slice(0, currentNum.length - 1);
      display.textContent = currentNum;
    }
  })
})



