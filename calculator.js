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

        button.addEventListener("click", function () {
            // Remove selected class from previously selected button
            if (selectedButton) {
                selectedButton.classList.remove("selected");
            }

            // Set new selected button
            selectedButton = this;
            selectedButton.classList.add("selected");
        });

        // Add button to grid
        gridContainer.appendChild(button);
    });
}
