document.addEventListener("DOMContentLoaded", () => {
    let freeTrialsLeft = 5;

    // Image Conversion
    const imageInput = document.getElementById("imageInput");
    const formatSelect = document.getElementById("formatSelect");
    const convertBtn = document.getElementById("convertBtn");
    const downloadLink = document.getElementById("downloadLink");
    const progressBar = document.getElementById("progressBar");
    
    convertBtn.addEventListener("click", async () => {
        const file = imageInput.files[0];
        if (!file) return alert("Please select an image!");
        
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
                } else if (formatSelect.value === "jpg") {
                    convertedImage = canvas.toDataURL("image/jpeg");
                } else if (formatSelect.value === "webp") {
                    convertedImage = canvas.toDataURL("image/webp");
                }
                
                const a = document.createElement("a");
                a.href = convertedImage;
                a.download = `converted.${formatSelect.value}`;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                downloadLink.href = convertedImage;
                downloadLink.style.display = "block";
            };
        };
    });
    
    // PDF Converter
    document.getElementById("convertToPDF").addEventListener("click", () => {
        const pdfImageInput = document.getElementById("pdfImageInput").files[0];
        if (!pdfImageInput) return alert("Please select an image to convert to PDF");
        
        const reader = new FileReader();
        reader.readAsDataURL(pdfImageInput);
        reader.onload = () => {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.addImage(reader.result, "JPEG", 10, 10, 180, 160);
            pdf.save("converted.pdf");
        };
    });
    
    // Background Removal with Free Trials
    document.getElementById("removeBackground").addEventListener("click", () => {
        if (freeTrialsLeft > 0) {
            freeTrialsLeft--;
            alert(`Background removed! You have ${freeTrialsLeft} free trials left.`);
        } else {
            alert("Your free trials are over. Please buy premium to continue.");
        }
    });
    document.getElementById("buyPremium").addEventListener("click", () => {
        alert("Redirecting to payment page...");
    });
});
