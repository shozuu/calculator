let currentOperand = '';
let previousOperand = '';
let currentOperator = '';
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

    currentOperand = parseFloat(resultScreen.textContent); 
}

operatorKeys.forEach(operator => {
    operator.addEventListener('click', (e) => {
        getOperator(e.target.textContent)
    })
});

function getOperator(operator){
    if (currentOperand === '') return; // if the currentOperand is empty and an operator is clicked, it does nothing (return)

    if (previousOperand !== '' && currentOperand !== '') setOperate(); //if previousOperand already has value and there is a value in currentOperand the moment an operator is pressed, setOperate() is called to compute them first
//prev is num 1 || current is num2

    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    feedbackScreen.textContent = `${previousOperand}  ${currentOperator}`;
    gotOperand = true; 
    // num2 = parseFloat(resultScreen.textContent);
}

equalsKey.addEventListener('click', setOperate)

function setOperate(){
    let answer;
    if (typeof previousOperand === 'string' || typeof currentOperand === 'string') return;

    switch(currentOperator)
    {
        case '+':
            answer = previousOperand + currentOperand;
            break;

        case '-':
            answer = previousOperand - currentOperand;
            break;

        case 'x':
            answer = previousOperand * currentOperand;
            break;

        case '÷':
            answer = previousOperand / currentOperand;
            break;
        default:
            return;
    }

    feedbackScreen.textContent = `${previousOperand}  ${currentOperator}  ${currentOperand} =`;
    resultScreen.textContent = answer;
    currentOperator = '';
    currentOperand = answer;
    previousOperand = '';
}