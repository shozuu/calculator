let num1 = 0;
let num2 = 0;
let operand = '';

const numberKeys = document.querySelectorAll('.number.key');
const operatorKeys = document.querySelectorAll('.operator.key');
const dotKey = document.querySelector('.dot');
const clearKey = document.querySelector('.clear');
const deleteKey = document.querySelector('.delete');
const equalsKey = document.querySelector('.equals');
const feedbackScreen = document.querySelector('.feedback')
const resultScreen = document.querySelector('.result');


numberKeys.forEach(key => {
    key.addEventListener('click', () => getNumber)
});



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

        case '+':
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