document.addEventListener("DOMContentLoaded", () => {
    // Event listener for real-time color previews
    const fillColorInput = document.getElementById("fill_color");
    const backColorInput = document.getElementById("back_color");
    const previewButton = document.querySelector("button[type='submit']");

    if (fillColorInput && backColorInput && previewButton) {
        fillColorInput.addEventListener("input", updatePreview);
        backColorInput.addEventListener("input", updatePreview);
    }

    function updatePreview() {
        const fillColor = fillColorInput.value || "#000000";
        const backColor = backColorInput.value || "#FFFFFF";

        previewButton.style.background = fillColor;
        previewButton.style.color = backColor;
    }
});