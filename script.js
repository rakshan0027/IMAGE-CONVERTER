document.addEventListener("DOMContentLoaded", () => {
    // Include jspdf
    const { jsPDF } = window.jspdf;

    // Get elements
    const imageInput = document.getElementById("imageInput");
    const formatSelect = document.getElementById("formatSelect");
    const convertBtn = document.getElementById("convertBtn");
    const downloadLink = document.getElementById("downloadLink");
    const progressBarContainer = document.getElementById("progressBarContainer");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const pdfImageInput = document.getElementById("pdfImageInput");
    const convertToPDF = document.getElementById("convertToPDF");

    const removeBgInput = document.getElementById("removeBgInput");
    const removeBackground = document.getElementById("removeBackground");
    const buyPremium = document.getElementById("buyPremium");

    const navLinks = document.querySelectorAll('nav ul li a');
    const toolSections = document.querySelectorAll('.tool-section');

    // Image Conversion
    convertBtn.addEventListener("click", () => {
        const file = imageInput.files;
        if (!file) return alert("Please select an image!");

        progressBarContainer.style.display = "block";
        progressText.style.display = "block";
        progressBar.value = 0;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                let convertedImage;
                if (formatSelect.value === "png") {
                    convertedImage = canvas.toDataURL("image/png");
                } else if (formatSelect.value === "jpeg") {
                    convertedImage = canvas.toDataURL("image/jpeg");
                } else if (formatSelect.value === "webp") {
                    convertedImage = canvas.toDataURL("image/webp");
                }

                progressBar.value = 100;
                progressText.textContent = "Conversion Complete!";

                downloadLink.href = convertedImage;
                downloadLink.download = `converted.${formatSelect.value}`;
                downloadLink.style.display = "block";

                progressBarContainer.style.display = "none";
                progressText.style.display = "none";

            };
        };
    });

    // PDF Conversion
    convertToPDF.addEventListener("click", () => {
        const file = pdfImageInput.files;
        if (!file) return alert("Please select an image to convert to PDF");

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            try {
                const pdf = new jsPDF();
                pdf.addImage(reader.result, "JPEG", 10, 10, 180, 160);

                const pdfBytes = pdf.output('arraybuffer');
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = pdfUrl;
                a.download = 'converted.pdf';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(pdfUrl);

            } catch (error) {
                console.error("Error converting to PDF:", error);
                alert("An error occurred during PDF conversion.");
            }
        };
    });

    // Background Removal (Placeholder)
    let freeTrials = 5;

    removeBackground.addEventListener("click", () => {
        const file = removeBgInput.files;
        if (!file) return alert("Please select an image to remove background!");

        if (freeTrials > 0) {
            freeTrials--;
            alert(`Background removal feature is a placeholder. You have ${freeTrials} free trials left.`);
            // Implement actual background removal here
        } else {
            alert("Free trials over! Buy premium to continue.");
        }
    });

    buyPremium.addEventListener("click", () => {
        alert("Redirecting to payment page...");
    });

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href');

            toolSections.forEach(section => section.classList.remove('active'));

            document.querySelector(targetId).classList.add('active');
        });
    });

    // Show the first section by default (optional)
    document.querySelector('#imageConverter').classList.add('active');

});
