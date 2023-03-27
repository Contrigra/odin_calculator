let currentOperator = null;

const calculatorDisplay = document.querySelector('.calculator-display');

const subtractionButton = document.querySelector('.button-subtraction');
const multiplicationButton = document.querySelector('.button-multiplication');
const divisionButton = document.querySelector('.button-division');
const additionButton = document.querySelector('.button-addition');
const equalsButton = document.querySelector('.button-equals');
const deleteButton = document.querySelector('.button-delete');
const clearButton = document.querySelector('.button-clear');
const dotButton = document.querySelector('.button-dot')

deleteButton.onclick = deleteAction;
clearButton.onclick = clearAction;

additionButton.addEventListener('click', () => addOperator(addition));
subtractionButton.addEventListener('click', () => addOperator(subtraction));
multiplicationButton.addEventListener('click', () => addOperator(multiplication));
divisionButton.addEventListener('click', () => addOperator(division));

additionButton.addEventListener('click', () => constructAndPushToNumberStack());
subtractionButton.addEventListener('click', () => constructAndPushToNumberStack());
multiplicationButton.addEventListener('click', () => constructAndPushToNumberStack());
divisionButton.addEventListener('click', () => constructAndPushToNumberStack());
equalsButton.addEventListener('click', () => constructAndPushToNumberStack());

equalsButton.addEventListener('click', () => calculateNumbers())

for (let i = 0; i < 10; i++) {
  document.querySelector(`.button-${i}`).onclick = addNumberToConstructor
  document.querySelector(`.button-${i}`).addEventListener('click', updateDisplayNumber)
}

dotButton.onclick = addNumberToConstructor;
dotButton.addEventListener('click', updateDisplayNumber)

let numberConstructionStack = []
let numberStack = []


function addNumberToConstructor() {
  if (numberConstructionStack.includes('.') && this.textContent === '.') {
  } else {
    numberConstructionStack.push(this.textContent)
  }

}

function constructAndPushToNumberStack() {
  // do not create anything, if there is no second operand
  if (numberConstructionStack.length > 0) {

    numberConstructionStack.reverse() // last element can't be the first element of a number
    let numberString = ''
    while (numberConstructionStack.length > 0) {
      numberString += numberConstructionStack.pop()
    }
    // makes it so the calculator cannot construct negative numbers
    let number = +numberString
    numberStack.push(number)
  }
}


function updateDisplayNumber() {
  if (numberConstructionStack.length === 0) {
    calculatorDisplay.textContent = '0'
  } else {
    let stringCurrentNumber = ''
    for (let i = 0; i < numberConstructionStack.length; i++) {
      stringCurrentNumber += numberConstructionStack[i]
    }
    calculatorDisplay.textContent = stringCurrentNumber
  }
}


function addition(a, b) {
  return a + b
}

function subtraction(a, b) {
  return a - b
}

function multiplication(a, b) {
  return a * b
}

function division(a, b) {
  return a / b
}


function calculateNumbers() {
  let b = numberStack.pop()
  let a = numberStack.pop()
  if (a === undefined) {
    numberConstructionStack.push(b)

  } else if (b === 0 && currentOperator === division) {
    clearAction()
    calculatorDisplay.textContent = 'Division by zero'

  } else {
    let result = roundResult(currentOperator(a, b))
    calculatorDisplay.textContent = result
    numberConstructionStack.push(`${result}`)
    clearOperatorStyle()
  }
}


function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function deleteAction() {
  if (numberConstructionStack.length > 0) {
    numberConstructionStack.pop()
    updateDisplayNumber()
  }
}

function clearAction() {
  numberStack = []
  numberConstructionStack = []
  clearOperatorStyle()
  currentOperator = null
  updateDisplayNumber()


}

function highlightOperator() {
  document.querySelector(`.button-${currentOperator.name}`).style.backgroundColor = '#f6ee94'
}


function addOperator(operator) {
  if (currentOperator !== null) {
    clearOperatorStyle()
  }
  currentOperator = operator
  highlightOperator()
}

function clearOperatorStyle() {
  document.querySelector(`.button-${currentOperator.name}`).style.backgroundColor = null;
}

