const result = document.querySelector('.result');
const feedback = document.querySelector('.feedback');
const keys = document.querySelectorAll('.key');
let operator = '';
let displayNum1 = [];
let displayNum2 = [];
let num1 = 0;
let num2 = 0;
let flag = false;


function getNumber1(e) {
    displayNum1.push(`${e.target.getAttribute('data-key')}`)
    result.textContent = displayNum1.join('');

    let temp = displayNum1.join('');
    num1 = parseFloat(temp);
}

function getNumber2(e) {
    displayNum2.push(`${e.target.getAttribute('data-key')}`)
    result.textContent = displayNum2.join('')

    let temp2 = displayNum2.join('');
    num2 = parseFloat(temp2);
}

keys.forEach(key => {
    key.addEventListener('click', function(e){
        if (e.target.classList.contains('clear'))
        {
            console.log('create code for clear')
        }

        else if (e.target.classList.contains('delete'))
        {
            console.log('create code for delete')
        }

        else if (e.target.classList.contains('number'))
        {
            if (flag === false)
            {
                flag = true;
                getNumber1(e);
            }
            else 
                getNumber2(e);
        }
            
        else if (e.target.classList.contains('operator'))
        {
            displayNum1 = [];
            num2 = num1;

            operator = `${e.target.getAttribute('data-operator')}`
            feedback.textContent = `${num1} ` + `${operator}`
        }

        else
            console.log('equals')
    })
});