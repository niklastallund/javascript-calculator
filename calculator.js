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
        else if (tmp == 11) tmp = ",";
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
    screen.textContent = button.type;

    if (button.classList.contains("operator")) screen.textContent = "operator";
    else screen.textContent = "number";
}
