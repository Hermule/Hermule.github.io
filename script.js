const PUNKTRECHNUNG = 'X/';
const STRICHRECHNUNG = '+-';
const KEINMINUS = 'X/+';

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
    let number1 = parseInt(_number1.replace("!", "-"));
    let number2 = parseInt(_number2.replace("!", "-"));
    switch(operand){
        case "+":
            return add(number1, number2);
        case "-":
            return subsctract(number1, number2);
        case "X":
            return mulitply(number1, number2);
        case "/":
            return divide(number1, number2);
    }
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
    console.log(split);
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