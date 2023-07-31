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

//click functionality
clearKey.addEventListener('click', allClear);
deleteKey.addEventListener('click', Delete)
numberKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        getNumber(e.target.textContent)
    })
});
operatorKeys.forEach(operator => {
    operator.addEventListener('click', (e) => {
        getOperator(e.target.textContent)
    })
});
equalsKey.addEventListener('click', setOperate)

//keyboard functionality
window.addEventListener('keydown', (event) => {
    let key = event.key;

     
    switch(key)
    {
        case 'Delete':
            allClear();
            break;
        case 'Backspace':
            Delete();
            break;
        case '.':
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            getNumber(event.key);
            break;
        case '*':
        case '+':
        case '-':
        case '/':
            getOperator(event.key);
            break;
        case 'Enter':
            setOperate();
            break;
        default:
            break;
    }
    
})

//functions
function allClear(){
    currentOperand = '';
    previousOperand = '';
    currentOperator = '';
    gotOperand = false;
    resultScreen.textContent = '0';
    feedbackScreen.textContent = '';
}

function Delete(){
    resultScreen.textContent = resultScreen.textContent.slice(0, -1);

    if (resultScreen.textContent === ''){
        resultScreen.textContent = '0';
    }
        
    currentOperand = parseFloat(resultScreen.textContent); 
}

function getNumber(number){
    if (number === '.' && currentOperand.toString().includes('.')) return;

    if (resultScreen.textContent === '0' || gotOperand === true){
        gotOperand = false; //reverts back to false to enable concat of numbers
        resultScreen.textContent = number;
    }
    else
        resultScreen.textContent += number;

    currentOperand = resultScreen.textContent; 
}

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

function setOperate(){
    let answer;
    previousOperand = parseFloat(previousOperand);
    currentOperand = parseFloat(currentOperand);

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
        case '*':
            answer = previousOperand * currentOperand;
            break;

        case '÷':
        case '/':
            answer = previousOperand / currentOperand;
            break;
        default:
            return;
    }

    if (answer === Infinity || isNaN(answer)){
        alert('Cannot divide by 0');
        allClear();
        return;
    }

    answer = parseFloat(answer.toFixed(3));
    feedbackScreen.textContent = `${previousOperand}  ${currentOperator}  ${currentOperand} =`;
    resultScreen.textContent = answer;
    currentOperator = '';
    currentOperand = answer;
    previousOperand = '';
}