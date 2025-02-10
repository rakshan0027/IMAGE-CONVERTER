document.addEventListener("DOMContentLoaded", function() {
    // Image Conversion
    document.getElementById("convertBtn").addEventListener("click", function() {
        let input = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        if (!input) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                let convertedImage = canvas.toDataURL("image/" + format);
                let link = document.getElementById("downloadLink");
                link.href = convertedImage;
                link.download = "converted-image." + format;
                link.style.display = "block";
            };
        };
        reader.readAsDataURL(input);
    });

    // Image to PDF Conversion
    document.getElementById("convertToPDF").addEventListener("click", function() {
        let input = document.getElementById("pdfImageInput").files[0];
        if (!input) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            const { jsPDF } = window.jspdf;
            let pdf = new jsPDF();
            let img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                pdf.addImage(img, "JPEG", 10, 10, 180, 160);
                let pdfOutput = pdf.output("bloburl");
                let link = document.createElement("a");
                link.href = pdfOutput;
                link.download = "converted.pdf";
                link.textContent = "Download PDF";
                document.getElementById("pdfDownloadContainer").innerHTML = "";
                document.getElementById("pdfDownloadContainer").appendChild(link);
            };
        };
        reader.readAsDataURL(input);
    });

    // Feedback Submission
    document.getElementById("submitFeedback").addEventListener("click", function() {
        let feedbackText = document.querySelector("#feedback textarea").value.trim();
        if (feedbackText === "") {
            alert("Please enter your feedback.");
            return;
        }
        alert("Thank you for your feedback!");
        document.querySelector("#feedback textarea").value = "";
    });

    // Navigation
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;
});
