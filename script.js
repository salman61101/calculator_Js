// BASIC OPERATIONS
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Lmao no 😭" : a / b; }

// STATE
let firstNumber = "";
let secondNumber = "";
let operator = null;
let shouldResetDisplay = false;

// DISPLAY
const display = document.querySelector("#display");

// OPERATE FUNCTION
function operate(op, a, b) {
    a = Number(a);
    b = Number(b);

    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

// UPDATE DISPLAY
function updateDisplay(value) {
    display.textContent = value;
}

// NUMBER CLICK
document.querySelectorAll(".number").forEach(btn => {
    btn.addEventListener("click", () => {

        if (display.textContent === "0" || shouldResetDisplay) {
            display.textContent = "";
            shouldResetDisplay = false;
        }

        display.textContent += btn.textContent;
    });
});

// OPERATOR CLICK
document.querySelectorAll(".operator").forEach(btn => {
    btn.addEventListener("click", () => {

        if (operator !== null) {
            secondNumber = display.textContent;
            firstNumber = operate(operator, firstNumber, secondNumber);
            updateDisplay(firstNumber);
        } else {
            firstNumber = display.textContent;
        }

        operator = btn.textContent;
        shouldResetDisplay = true;
    });
});

// EQUALS
document.querySelector(".equals").addEventListener("click", () => {

    if (operator === null) return;

    secondNumber = display.textContent;

    let result = operate(operator, firstNumber, secondNumber);

    updateDisplay(result);

    firstNumber = result;
    operator = null;
});

// CLEAR
document.querySelector(".clear").addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    operator = null;
    display.textContent = "0";
});