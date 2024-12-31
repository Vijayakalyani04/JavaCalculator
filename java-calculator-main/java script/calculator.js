let buffer = '0';
let runningTotal = 0;
let previousoperator = null;
const screen = document.querySelector('.screen');

function buttonclick(value) {
  if (isNaN(parseInt(value))) {
    handlesymbol(value);
  } else {
    handlenumber(value);
  }
  rerender();
}

function handlenumber(number) {
  if (buffer === '0') {
    buffer = number;
  } else {
    buffer = buffer + number;
  }
}

function handlemath(value) {
  if (buffer === '0') {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushoperation(intBuffer);
  }
  previousoperator = value;
  buffer = '0';
}

function flushoperation(intBuffer) {
  if (previousoperator === '+') {
    runningTotal = runningTotal + intBuffer;
  } else if (previousoperator === '-') {
    runningTotal = runningTotal - intBuffer;
  } else if (previousoperator === '*') {
    runningTotal = runningTotal * intBuffer;
  } else if (previousoperator === '/') {
    runningTotal = runningTotal / intBuffer;
  }
}

function handlesymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      break;
    case '__':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '=':
      if (previousoperator === null) return;
      flushoperation(parseInt(buffer));
      previousoperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      handlemath(symbol);
      break;
  }
}

function init() {
  document
    .querySelectorAll('.calc-button')
    .forEach(function (button) {
      button.addEventListener('click', function (event) {
        buttonclick(event.target.innerText);
      });
    });
}

function rerender() {
  screen.innerText = buffer;
}

init();
