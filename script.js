let num1 = 0;
let num2 = 0;
let currentOperator = null;
let gotOperand = false; //reset when clear

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
    if (resultScreen.textContent === '0' || gotOperand === true){
        gotOperand = false; //reverts back to false to enable concat of numbers
        resultScreen.textContent = number;
    }
    else
        resultScreen.textContent += number; 
}

operatorKeys.forEach(operator => {
    operator.addEventListener('click', (e) => {
        getOperator(e.target.textContent)
    })
});

function getOperator(operator){
    num1 = parseFloat(resultScreen.textContent); //only once happens; use if then
    currentOperator = operator;

    feedbackScreen.textContent = `${num1}` + ` ${currentOperator}`;
    gotOperand = true; 
}

equalsKey.addEventListener('click', setOperate)

function setOperate(){
    num2 = parseFloat(resultScreen.textContent);
    feedbackScreen.textContent = `${num1}` + ` ${currentOperator} ` + `${num2} =`;
    resultScreen.textContent = `${operate(currentOperator, num1, num2)}`
}

function operate(operator, a, b){
    switch(operator)
    {
        case '+':
            return a + b;

        case '-':
            return a - b;

        case 'x':
            return a * b;

        case '÷':
            return a / b;
    }
}