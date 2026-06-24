function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nice Try 😏";
    }

    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "*":
            return multiply(a, b);

        case "/":
            return divide(a, b);

        default:
            return b;
    }
}

const display = document.querySelector("#display");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
    display.textContent = value;
}

function appendNumber(number) {

    if (
        display.textContent === "0" ||
        shouldResetDisplay
    ) {
        display.textContent = "";
        shouldResetDisplay = false;
    }

    display.textContent += number;
}

function setOperator(operator) {

    if (currentOperator !== null && !shouldResetDisplay) {
        evaluate();
    }

    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {

    if (
        currentOperator === null ||
        shouldResetDisplay
    ) {
        return;
    }

    secondNumber = display.textContent;

    let result = operate(
        currentOperator,
        firstNumber,
        secondNumber
    );

    if (typeof result === "number") {
        result = Math.round(result * 1000) / 1000;
    }

    updateDisplay(result);

    firstNumber = result;
    currentOperator = null;
}

function clearCalculator() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;

    updateDisplay("0");
}

function backspace() {

    if (shouldResetDisplay) {
        return;
    }

    display.textContent =
        display.textContent.slice(0, -1);

    if (display.textContent === "") {
        display.textContent = "0";
    }
}

document
    .querySelectorAll(".number")
    .forEach(button => {
        button.addEventListener("click", () => {
            appendNumber(button.textContent);
        });
    });

document
    .querySelectorAll(".operator")
    .forEach(button => {
        button.addEventListener("click", () => {
            setOperator(button.textContent);
        });
    });

document
    .querySelector(".equals")
    .addEventListener("click", evaluate);

document
    .querySelector(".clear")
    .addEventListener("click", clearCalculator);

document
    .querySelector(".backspace")
    .addEventListener("click", backspace);