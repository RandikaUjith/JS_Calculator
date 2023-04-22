

let inputString = '';
let inputNumArray = [];
let inputOperatorArray = [];
let intext = '';
let result = 0;

operatorObject = {
    'btn_plus': (a, b) => a + b,
    'btn_minus': (a, b) => a - b,
    'btn_multiplys': (a, b) => a * b,
    'btn_divisions': (a, b) => a / b,
    '+' : 'btn_plus',
    '-': 'btn_minus',
    '*': 'btn_multiplys',
    '/': 'btn_divisions',
}

const keyArray = ['0','1','2','3','4','5','6','7','8','9'];
const operatorArray = ['+','-','*','/'];

function operator(id) {
    if(inputString[inputString.length-1] != 's' ) {
        inputNumArray.push(parseFloat(inputString));
        inputString = '';
        inputOperatorArray.push(id);
        console.log(inputNumArray);
        console.log(inputOperatorArray);
    }    
}

function display(displayText) {
    let numDiv = document.createElement('div');
        numDiv.id = 'num_div';
        numDiv.innerText = displayText;
        document.getElementById('display_div').appendChild(numDiv);
}

function clearDisplay() {
    while (document.getElementById('num_div')) {
        document.getElementById('num_div').remove();
    }
}


function operation(id) { 

    if (id === 'btn_plus') {
        operator(id);
        display('+');

    } else if(id === 'btn_minus') {
        operator(id);
        display('-');

    } else if(id === 'btn_multiplys') {
        operator(id);
        display('x');

    } else if(id === 'btn_divisions') {
        operator(id);
        display('/');
    }     
    
}

function equal() {
    inputNumArray.push(parseFloat(inputString));
    console.log(inputNumArray);

    clearDisplay();

    for (let i = 0; i < inputOperatorArray.length; i++) {
        let op = inputOperatorArray[i];
        result = operatorObject[op](inputNumArray[0], inputNumArray[1]);
        inputNumArray.splice(0, 2);
        inputNumArray.splice(0, 0, result);
    }

    display(result);
    inputString = '';
}

function resetButton() {
    clearDisplay();
    inputString = '';
    inputNumArray = [];
    inputOperatorArray = [];
    intext = '';
    result = 0;

}


const buttons = document.querySelectorAll('button');

buttons.forEach(function(currentButton) {

    currentButton.addEventListener("click", function(e) {
        let t = e.target;
    
        if(t.id[t.id.length-1] != 's') {
            inputString = inputString + t.id[t.id.length-1];
            display(t.id[t.id.length-1])    
        }
    
    },false);
    
});

document.getElementById('reset_buttons').addEventListener('click', resetButton);

document.addEventListener('keypress', function(e) {
    console.log(e.key);
    if(keyArray.includes(e.key)) {
        inputString = inputString + e.key;
        display(e.key);
    
    } else if(operatorArray.includes(e.key)){
        console.log(operatorObject[e.key]);
        operation(operatorObject[e.key]);
    } else if(e.key === '=' || 'Enter') {
        equal();
    } else if(e.key === 'Backspace') {
        resetButton();
    }
    
});