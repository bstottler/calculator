//global variables
let displayValue = 0;
let currentOp;
let aNum;
let bNum;

//creates grid and assigns class for number buttons
const createButtons = function() {
    let container = document.querySelector('#calcNumbers');
    for(i = 1; i <= 9; i++) {
        let numButton = document.createElement('button');
        numButton.textContent = i;
        numButton.className = 'numbers';
        container.appendChild(numButton);
    }
    let zeroButton = document.createElement('button');
    zeroButton.textContent = 0;
    zeroButton.id = 'zero'
    zeroButton.className = 'numbers';
    container.appendChild(zeroButton);
    let decimal = document.createElement('button');
    decimal.textContent = '.';
    decimal.id = 'decimal';
    decimal.className = 'numbers';
    container.appendChild(decimal);
}
createButtons();

//creates operation functions
function add(a,b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b != 0) {
    return a / b;
    }else{
        alert('Divided by zero: universal destruct sequence initiated. What have you done?')
        return 'error';
    }
}

function operate(firstNum, nextNum, operator) {
    return operator(firstNum, nextNum);  
}

//adds functionality to number buttons
function numDisplay() {
    let buttons = document.querySelectorAll('button.numbers');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => { if(displayValue != 0) {
            displayValue += button.textContent;}else{
                displayValue = button.textContent};
            document.getElementById('display').textContent = displayValue;
            if(currentOp == null) {aNum = Number(displayValue)}
            else {bNum = Number(displayValue)};
        });
        document.getElementById('decimal').addEventListener('click', (e) => {
            document.getElementById('decimal').disabled = true;
        })
    })
}
numDisplay();

//adds functionality to operator buttons
function calculate() {
    if(currentOp != null) {
        displayValue = operate(aNum, bNum, currentOp);
    }
    document.getElementById('display').textContent = displayValue;
    document.getElementById('decimal').disabled = false;
    aNum = Number(displayValue);
    displayValue = 0
}


let divi = document.getElementById('divide');
divi.addEventListener('click', (e) => {
    if(currentOp == null) {currentOp = divide;}
    document.getElementById('decimal').disabled = false;
    if (bNum != null && currentOp != null) {calculate();
        currentOp = divide;};
    displayValue = 0;
})
let mult = document.getElementById('multiply');
mult.addEventListener('click', (e) => {
    if(currentOp == null) {currentOp = multiply;}
    document.getElementById('decimal').disabled = false;
    if (bNum != null && currentOp != null) {calculate();
    currentOp = multiply;};
    displayValue = 0;
})
let ad = document.getElementById('add');
ad.addEventListener('click', (e) => {
    if(currentOp == null) {currentOp = add;}
    document.getElementById('decimal').disabled = false;
    if (bNum != null && currentOp != null) {calculate();
    currentOp = add;};
    displayValue = 0;
})
let subt = document.getElementById('subtract');
subt.addEventListener('click', (e) => {
    if(currentOp == null) {currentOp = subtract;}
    document.getElementById('decimal').disabled = false;
    if (bNum != null && currentOp != null) {calculate();
    currentOp = subtract;};
    displayValue = 0;
})
let equals = document.getElementById('equals');
equals.addEventListener('click', (e) => {
    if(bNum != null) {calculate();
    currentOp = null;}
})


//sets display to zero and clears existing calculator data
function clear() {
    displayValue = 0;
    currentOp = null;
    aNum = null;
    bNum = null;
}

//adds functionality to clear button
let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearIt);
function clearIt() {
    clear();
    document.getElementById('display').textContent = displayValue;
    document.getElementById('decimal').disabled = false;
    }

//adds functionality to backspace button
let backButton = document.querySelector('#backspace');
backButton.addEventListener('click', backspace);
function backspace() {
    if(displayValue =='error') { displayValue = 0};
    let temp = displayValue.toString().split('');
    if(temp[temp.length-1] == '.') {
        document.getElementById('decimal').disabled = false;
    }
    temp.pop();
    if(temp.length == 0) {temp.push(0);}
    temp = temp.join('');
    displayValue = temp;
    document.getElementById('display').textContent = displayValue;
}

document.addEventListener('keydown', (e) => {
   if(e.which == 8) {backspace()}
   if(e.which == 67) {clearIt()}
   if(e.which == 187) {calculate()}
});
