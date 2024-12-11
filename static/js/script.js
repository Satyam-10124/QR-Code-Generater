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

    // Event listener for the form submission
    const form = document.getElementById('text-qr-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way

            // Retrieve values from the form
            const text = document.getElementById('text').value;
            const fillColor = fillColorInput.value;
            const backColor = backColorInput.value;

            // Make an AJAX request to generate the QR code
            fetch('/generate_text_qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    fill_color: fillColor,
                    back_color: backColor
                })
            })
            .then(response => response.json())
            .then(data => {
                // Display the QR code in the div
                const qrCodeContainer = document.getElementById('qr-code-container');
                const generatedQrImage = document.getElementById('generated-qr');

                if (data.qr_code_image) {
                    generatedQrImage.src = data.qr_code_image; // Assume the backend returns the image URL or base64 string
                    qrCodeContainer.style.display = 'block'; // Show the QR code container
                }
            })
            .catch(error => console.error('Error generating QR code:', error));
        });
    }
});