window.onload = function () {
    createNumbers();
};

function createNumbers() {
    const gridContainer = document.getElementById("number-bar");
    const messageDisplay = document.getElementById("message");
    let selectedButton = null;

    // Generate 9 buttons (3x3 grid)
    for (let i = 1; i <= 12; i++) {
        let tmp = i;

        if (tmp == 10) tmp = "0";
        else if (tmp == 11) tmp = ",";
        else if (tmp == 12) tmp = "C";
        const button = document.createElement("button");
        button.textContent = `${tmp}`;
        button.id = `btn-${tmp}`;

        // Add click event listener
        button.addEventListener("click", function () {
            // Remove selected class from previously selected button
            if (selectedButton) {
                selectedButton.classList.remove("selected");
            }

            // Set new selected button
            selectedButton = this;
            selectedButton.classList.add("selected");

            // Update message
            messageDisplay.textContent = `You clicked ${this.textContent}`;
        });

        // Add button to grid
        gridContainer.appendChild(button);
    }
}
