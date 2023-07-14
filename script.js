let num1 = 0;
let num2 = 0;
let currentOperator = '';
let gotNum1 = false; //reset when clear 

const numberKeys = document.querySelectorAll('.number.key');
const operatorKeys = document.querySelectorAll('.operator.key');
const dotKey = document.querySelector('.dot');
const clearKey = document.querySelector('.clear');
const deleteKey = document.querySelector('.delete');
const equalsKey = document.querySelector('.equals');
const feedbackScreen = document.querySelector('.feedback')
const resultScreen = document.querySelector('.result');


numberKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        getNumber(e.target.textContent)
    })
});

function getNumber(number){
    if (resultScreen.textContent === '0' || gotNum1 === true)
        resultScreen.textContent = number;
    else
        resultScreen.textContent += number; 
}

operatorKeys.forEach(operator => {
    operator.addEventListener('click', (e) => {
        getOperator(e.target.textContent)
    })
});

function getOperator(operator){
    num1 = parseFloat(resultScreen.textContent);
    currentOperator = operator;
    feedbackScreen.textContent = `${num1}` + ` ${currentOperator}`
    num2 = parseFloat(resultScreen.textContent);
    gotNum1 = true; //trigger that num1 has already been stored and reset the screen when new number enter
}

function operate(operator, a, b){
    switch(operator)
    {
        case '+':
            add(a, b);
            break;

        case '-':
            subtract(a, b);
            break;

        case 'x':
            multiply(a, b);
            break;

        case '÷':
            divide(a, b);
            break;
    }
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}