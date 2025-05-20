let currentValue = "";
let storedValue = 0;
let pendingOperator = false;

window.onload = function () {
    createNumbers();
    createOperators();
};

function createNumbers() {
    const gridContainer = document.getElementById("number-bar");
    let selectedButton = null;

    // Generate 9 buttons (3x3 grid)
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
    const screen = document.getElementById("screen");

    if (button.classList.contains("operator")) {
        pressedOperator(button);
    } else {
        pressedNumber(button);
    }
}

function pressedNumber(button) {
    const screen = document.getElementById("screen");
    currentValue += button.id.charAt(4);
    screen.textContent = currentValue;
}

function pressedOperator(button) {
    const screen = document.getElementById("screen");
    let op = button.id.charAt(4);

    switch (op) {
        case "C":
            currentValue = "";
            storedValue = 0;
            pendingOperator = false;
            screen.textContent = currentValue;
            break;
        case "+":
            if (currentValue !== "") {
                //If currentValue == "" we're changing operator.
                calculatePlus(screen);
            }
            break;
    }
}

function calculatePlus(screen) {
    if (pendingOperator) {
        // Continue the calculation chain
        storedValue = storedValue + parseInt(currentValue);
    } else {
        // First part of calculation chain
        storedValue = parseInt(currentValue);
        pendingOperator = true;
    }

    // Write the output to the screen and clear the current value
    screen.textContent = storedValue.toString();
    currentValue = "";
}
