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

clearKey.addEventListener('click', () => {
    currentOperand = '';
    previousOperand = '';
    currentOperator = '';
    gotOperand = false;
    resultScreen.textContent = '0';
    feedbackScreen.textContent = '';
})

deleteKey.addEventListener('click', () => {
    resultScreen.textContent = resultScreen.textContent.slice(0, -1);

    if (resultScreen.textContent === ''){
        resultScreen.textContent = '0';
    }
        
    currentOperand = parseFloat(resultScreen.textContent); 
})

numberKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        getNumber(e.target.textContent)
    })
});

function getNumber(number){
    if (number === '.' && currentOperand.toString().includes('.')) return;

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
    if (currentOperand === ''){
        if (previousOperand !== ''){
            currentOperator = operator;
            feedbackScreen.textContent = `${previousOperand}  ${currentOperator}`;
            return;
        }
        else
            return;
    }

    if (previousOperand !== '' && currentOperand !== '') setOperate(); //if previousOperand already has value and there is a value in currentOperand the moment an operator is pressed, setOperate() is called to compute them first

    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    feedbackScreen.textContent = `${previousOperand}  ${currentOperator}`;
    gotOperand = true;
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
    
    answer = parseFloat(answer.toFixed(3));
    feedbackScreen.textContent = `${previousOperand}  ${currentOperator}  ${currentOperand} =`;
    resultScreen.textContent = answer;
    currentOperator = '';
    currentOperand = answer;
    previousOperand = '';
}