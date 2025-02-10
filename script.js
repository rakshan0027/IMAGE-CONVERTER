document.addEventListener("DOMContentLoaded", function () {
    // Image Conversion Functionality
    document.getElementById("convertBtn").addEventListener("click", function () {
        let input = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        if (!input) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
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
                link.textContent = "Download Converted Image";
            };
        };
        reader.readAsDataURL(input);
    });

    // Image to PDF Conversion
    document.getElementById("convertToPDF").addEventListener("click", function () {
        let input = document.getElementById("pdfImageInput").files[0];
        if (!input) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            const { jsPDF } = window.jspdf;
            let pdf = new jsPDF();
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
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

    // PDF to Image Conversion
    document.getElementById("convertFromPDF").addEventListener("click", function () {
        let input = document.getElementById("pdfInput").files[0];
        if (!input) {
            alert("Please select a PDF file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            let loadingTask = pdfjsLib.getDocument({ data: e.target.result });
            loadingTask.promise.then(function (pdf) {
                pdf.getPage(1).then(function (page) {
                    let scale = 2;
                    let viewport = page.getViewport({ scale });
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    let renderTask = page.render({ canvasContext: ctx, viewport: viewport });
                    renderTask.promise.then(function () {
                        let link = document.getElementById("downloadImageFromPDF");
                        link.href = canvas.toDataURL("image/png");
                        link.download = "converted-image.png";
                        link.style.display = "block";
                    });
                });
            });
        };
        reader.readAsArrayBuffer(input);
    });

    // AI Image Enhancement (4K & 8K)
    document.getElementById("enhanceImageBtn").addEventListener("click", function () {
        let input = document.getElementById("enhanceImageInput").files[0];
        let resolution = document.getElementById("resolutionSelect").value;
        if (!input) {
            alert("Please select an image file.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let scaleFactor = resolution === "4k" ? 2 : 4; // 2x for 4K, 4x for 8K
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                let enhancedImage = canvas.toDataURL("image/png");
                let link = document.createElement("a");
                link.href = enhancedImage;
                link.download = `enhanced-${resolution}.png`;
                link.textContent = `Download ${resolution.toUpperCase()} Image`;
                document.getElementById("enhanceDownloadContainer").innerHTML = "";
                document.getElementById("enhanceDownloadContainer").appendChild(link);
            };
        };
        reader.readAsDataURL(input);
    });

    // Feedback Submission
    document.getElementById("submitFeedback").addEventListener("click", function () {
        let feedbackText = document.querySelector("#feedback textarea").value.trim();
        if (feedbackText === "") {
            alert("Please enter your feedback.");
            return;
        }
        alert("Thank you for your feedback!");
        document.querySelector("#feedback textarea").value = "";
    });

    // Navigation Menu Functionality
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;
});
