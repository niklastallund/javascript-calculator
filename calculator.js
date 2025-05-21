/*  
    TODO:
    *Negative numbers button
    *Percentage button
*/

let currentValue = "";
let storedValue = 0;
let storedOperator = "";

window.onload = function () {
    createNumbers();
    createOperators();
};

function createNumbers() {
    const gridContainer = document.getElementById("number-bar");
    let selectedButton = null;

    // Generate number bar (11 buttons, 3x4 grid)
    for (let i = 1; i <= 11; i++) {
        let tmp = i;

        if (tmp == 10) tmp = "0";
        else if (tmp == 11) tmp = ".";
        const button = document.createElement("button");
        button.textContent = `${tmp}`;
        button.id = `btn-${tmp}`;
        button.classList.add("number");

        //Special case for wide button 0
        if (button.id == "btn-0") button.classList.add("zero");

        // Add click event listener
        button.addEventListener("click", function () {
            // Remove selected class from previously selected button
            if (selectedButton) {
                selectedButton.classList.remove("selected");
            }

            // Set new selected button
            selectedButton = this;
            selectedButton.classList.add("selected");

            //Run the clicked button function
            buttonPressed(button);
        });

        // Add button to grid
        gridContainer.appendChild(button);
    }
}

function createOperators() {
    const gridContainer = document.getElementById("operator-bar");
    let selectedButton = null;
    let operatorArray = ["+", "-", "x", "÷", "±", "%", "=", "C"];

    operatorArray.forEach((val) => {
        const button = document.createElement("button");
        button.textContent = `${val}`;
        button.id = `btn-${val}`;
        button.classList.add("operator");

        button.addEventListener("click", function () {
            // Remove selected class from previously selected button
            if (selectedButton) {
                selectedButton.classList.remove("selected");
            }

            // Set new selected button
            selectedButton = this;
            selectedButton.classList.add("selected");

            //Run the clicked button function
            buttonPressed(button);
        });

        // Add button to grid
        gridContainer.appendChild(button);
    });
}

function buttonPressed(button) {
    if (button.classList.contains("operator")) {
        pressedOperator(button);
    } else {
        pressedNumber(button);
    }
}

function pressedNumber(button) {
    //Set currentValue and print it to screen.
    const screen = document.getElementById("screen");
    const number = button.id.charAt(4);

    if (number === ".") {
        //Check if decimal point already exists
        if (currentValue === "" || currentValue.includes(".")) {
            return;
        }
    }

    currentValue += button.id.charAt(4);

    //If we're out of bounds, just reset everything (I'm lazy)
    if (currentValue.length > 24) {
        screen.textContent = "Error: OUT OF BOUNDS";
        currentValue = "";
        storedValue = 0;
        storedOperator = "";
    } else {
        screen.textContent = currentValue;
    }
    return;
}

function pressedOperator(button) {
    const screen = document.getElementById("screen");
    let op = button.id.charAt(4);

    switch (op) {
        case "C":
            //Reset everything to default values
            currentValue = "";
            storedValue = 0;
            storedOperator = "";
            screen.textContent = currentValue;
            break;
        case "=":
            if (storedOperator && currentValue !== "") {
                //Calculate and clear the operator
                calculate(storedOperator, screen);
                storedOperator = "";
            }
            break;
        case "+":
        case "-":
        case "x":
        case "÷":
            if (currentValue !== "") {
                if (storedOperator) {
                    //If there is a stored operator, do that calculation first!
                    calculate(storedOperator, screen);
                } else {
                    //First operation of a calculation chain
                    storedValue = parseFloat(currentValue) || 0;
                    screen.textContent = storedValue.toString();
                    currentValue = "";
                }
            }
            //Store the new operator for next sequence.
            storedOperator = op;
            break;
    }
}

function calculate(op, screen) {
    //Calculate using given operator
    switch (op) {
        case "+":
            storedValue = storedValue + (parseFloat(currentValue) || 0);
            break;
        case "-":
            storedValue = storedValue - (parseFloat(currentValue) || 0);
            break;
        case "x":
            storedValue = storedValue * (parseFloat(currentValue) || 0);
            break;
        case "÷":
            if (parseFloat(currentValue) === 0) {
                //Cannot divide by 0, error.
                screen.textContent = "Error: DIVIDE BY ZERO";
                return;
            }
            storedValue = storedValue / (parseFloat(currentValue) || 1);
            break;
    }

    // Write the output to the screen and clear the current value
    screen.textContent = storedValue.toString();
    currentValue = "";
}
