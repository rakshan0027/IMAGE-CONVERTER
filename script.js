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
        reader.onload = function (event) {
            const loadingTask = pdfjsLib.getDocument({ data: event.target.result });
            loadingTask.promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext).promise.then(() => {
                        const downloadLink = document.getElementById("downloadImageFromPDF");
                        downloadLink.href = canvas.toDataURL("image/png");
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
    
    document.getElementById("convertMp4ToMp3").addEventListener("click", function () {
        const fileInput = document.getElementById("mp4Input").files[0];
        if (!fileInput) {
            alert("Please select an MP4 file.");
            return;
        }
        
        const formData = new FormData();
        formData.append("video", fileInput);
        
        fetch("https://your-backend-url.onrender.com/convert-mp4-to-mp3", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.downloadUrl) {
                const downloadLink = document.getElementById("downloadMp3");
                downloadLink.href = data.downloadUrl;
                downloadLink.style.display = "block";
            } else {
                alert("Conversion failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while converting.");
        });
    });
});
