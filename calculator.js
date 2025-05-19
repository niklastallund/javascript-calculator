function createNumbers() {
    const gridContainer = document.getElementById("numer-bar");
    const messageDisplay = document.getElementById("message");
    let selectedButton = null;

    // Generate 9 buttons (3x3 grid)
    for (let i = 0; i < 9; i++) {
        const button = document.createElement("button");
        button.textContent = `Button ${i + 1}`;
        button.id = `btn-${i}`;

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
