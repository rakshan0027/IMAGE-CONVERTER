document.addEventListener("DOMContentLoaded", function () {
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    
    document.getElementById("convertBtn").addEventListener("click", function () {
        const fileInput = document.getElementById("imageInput").files[0];
        const format = document.getElementById("formatSelect").value;
        if (!fileInput) {
            alert("Please select an image file.");
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const convertedImage = canvas.toDataURL("image/" + format);
                const downloadLink = document.getElementById("downloadLink");
                downloadLink.href = convertedImage;
                downloadLink.download = "converted-image." + format;
                downloadLink.style.display = "block";
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput);
    });
    
    document.getElementById("convertToPDF").addEventListener("click", function () {
        const fileInput = document.getElementById("pdfImageInput").files[0];
        if (!fileInput) {
            alert("Please select an image file.");
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.addImage(img, "JPEG", 10, 10, 180, 160);
                const pdfDownloadContainer = document.getElementById("pdfDownloadContainer");
                const pdfBlob = doc.output("bloburl");
                pdfDownloadContainer.innerHTML = `<a href="${pdfBlob}" download="converted.pdf" class="download-btn">Download PDF</a>`;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput);
    });
    
    document.getElementById("convertFromPDF").addEventListener("click", function () {
        const fileInput = document.getElementById("pdfInput").files[0];
        if (!fileInput) {
            alert("Please select a PDF file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const loadingTask = pdfjsLib.getDocument({ data: reader.result });
            loadingTask.promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const scale = 2;
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    
                    const renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };
                    page.render(renderContext).promise.then(() => {
                        const imgUrl = canvas.toDataURL("image/png");
                        const downloadLink = document.getElementById("downloadImageFromPDF");
                        downloadLink.href = imgUrl;
                        downloadLink.download = "converted-image.png";
                        downloadLink.style.display = "block";
                    });
                });
            });
        };
        reader.readAsArrayBuffer(fileInput);
    });
    
    document.getElementById("removeBackground").addEventListener("click", function () {
        alert("Background removal is available for premium users only.");
    });
    
    document.getElementById("buyPremium").addEventListener("click", function () {
        alert("Redirecting to payment gateway...");
    });
    
    document.getElementById("submitFeedback").addEventListener("click", function () {
        alert("Thank you for your feedback!");
    });
});
