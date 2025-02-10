const PUNKTRECHNUNG = 'X/';
const STRICHRECHNUNG = '+-';
const KEINMINUS = 'X/+';
const RECHENOPERATIONEN = 'X/+-';

function add(number1, number2){
    return number1 + number2;
}

function subsctract (number1, number2){
    return number1 - number2;
}

function mulitply(number1, number2){
    return number1*number2;
}

function divide(number1, number2){
    return number1/number2;
}

const numbers = document.querySelectorAll(".operand");
for (let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener("click", (e) => {
        const display = getDisplayValue();
        if (e.target.textContent == "." && isFloat(getLastNumber(display.textContent)) == true){
            return;
        }
        display.textContent += e.target.textContent;
    });
}

const del = document.querySelector(".delete");
del.addEventListener("click", (e) => {
    const display = getDisplayValue();
    display.textContent = display.textContent.substring(0, display.textContent.length -1);
})

const clear = document.querySelector(".clear");
clear.addEventListener("click", (e) => {
    const display = getDisplayValue();
    display.textContent = '';
})

function getDisplayValue(){
    return document.querySelector("#display p");
}

function operate(operand, _number1, _number2){
    let number1 = parseFloat(_number1.replace("!", "-"));
    let number2 = parseFloat(_number2.replace("!", "-"));
    let value;
    switch(operand){
        case "+":
            value = add(number1, number2);
            break;
        case "-":
            value = subsctract(number1, number2);
            break;
        case "X":
            value = mulitply(number1, number2);
            break;
        case "/":
            value = divide(number1, number2);
            if (value == "Infinity") {
                value = "Math ERROR";
                return value;
            }
            break;
    }
    return Math.round(value*100000)/100000;
}

function evaluate(string){
    for (let i = 0; i < string.length; i++){
        if (i == 0 && string[i] == "-"){
            string = "!" + string.substring(1);
            continue;
        }
        if (string[i] == '-' && KEINMINUS.includes(string[i-1])){
            string = string.substring(0, i) + "!" + string.substring(i + 1)
        }
    }
    let split = string.split(/([X+\/-])/g);
    for (let i = 0; i < split.length; i++){
        if (PUNKTRECHNUNG.includes(split[i])){
            let calculation = operate(split[i], split[i-1], split[i+1]);
            split[i] = calculation;
            split.splice(i - 1, 1);
            split.splice(i, 1)
            let returnString = '';
            for (value of split)
            {
                returnString+= value.toString();
            }
            evaluate(returnString);
            return;
        }
    }

    for (let i = 0; i < split.length; i++){
        if (STRICHRECHNUNG.includes(split[i])){
            let calculation = operate(split[i], split[i-1], split[i+1]);
            split[i] = calculation.toString().replace("-", "!");
            split.splice(i - 1, 1);
            split.splice(i, 1)
            let returnString = '';
            for (value of split)
            {
                returnString+= value.toString();
            }
            evaluate(returnString);
            return;
        }
    }
    const display = getDisplayValue();
    display.textContent = split[0].replace("!", "-");
}

const equal = document.querySelector(".equal");
equal.addEventListener("click", (e) => {
    const display = getDisplayValue();
    evaluate(display.textContent);
})

const pow = document.getElementById("pow");
pow.addEventListener("click", (e) => {
    const display = getDisplayValue();
    const lastNumber = getLastNumber(display.textContent);
    display.textContent = display.textContent.slice(0,-lastNumber.length) + parseFloat(lastNumber)*1000;
});

function getLastNumber(string){
    let lastIndex = -2;
    for (char of RECHENOPERATIONEN){
        let index = string.lastIndexOf(char);
        if (index > lastIndex){
            lastIndex = index;
        }
    }
    if (lastIndex == -1){
        return string;
    }
    else {
        return string.slice(lastIndex + 1)
    }
}

document.addEventListener("keydown", (e) =>{
    const NUMBERS = /^[0-9]$/g;
    const OPERANDS = '*+/-';
    const display = getDisplayValue();
    if (NUMBERS.test(e.key) || OPERANDS.includes(e.key)) {
        display.textContent += e.key;
        return;
    }

    if (e.key == "Backspace"){
        display.textContent = display.textContent.slice(0,-1);
        return;
    }

    if(e.key == "=") {
        evaluate(display.textContent);
        return;
    }

    if (e.key ==".") {
        if (isFloat(getLastNumber(display.textContent)) == true){
            return;
        }
        display.textContent += e.key;
        return;
    }
});

function isFloat(n){
    let value = parseFloat(n) % 1 !== 0;
    return value; 
}