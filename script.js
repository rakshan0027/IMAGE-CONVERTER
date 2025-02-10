document.addEventListener("DOMContentLoaded", function () {
    // Image Converter
    document.getElementById("convertBtn").addEventListener("click", function () {
        let fileInput = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        if (!fileInput) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                let convertedImage = canvas.toDataURL("image/" + format);
                let link = document.getElementById("downloadLink");
                link.href = convertedImage;
                link.download = "converted_image." + format;
                link.style.display = "block";
                link.innerText = "Download Converted Image";
            };
        };
        reader.readAsDataURL(fileInput);
    });

    // Image to PDF Converter
    document.getElementById("convertToPDF").addEventListener("click", function () {
        let fileInput = document.getElementById("pdfImageInput").files[0];
        if (!fileInput) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (event) {
            let img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                let { jsPDF } = window.jspdf;
                let doc = new jsPDF();
                doc.addImage(img, 'JPEG', 10, 10, 180, 160);
                let pdfOutput = doc.output("bloburl");
                let link = document.createElement("a");
                link.href = pdfOutput;
                link.download = "converted.pdf";
                link.innerText = "Download PDF";
                document.getElementById("pdfDownloadContainer").innerHTML = "";
                document.getElementById("pdfDownloadContainer").appendChild(link);
            };
        };
        reader.readAsDataURL(fileInput);
    });

    // PDF to Image Converter
    document.getElementById("convertFromPDF").addEventListener("click", function () {
        let fileInput = document.getElementById("pdfInput").files[0];
        if (!fileInput) {
            alert("Please select a PDF file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function (event) {
            let loadingTask = pdfjsLib.getDocument(event.target.result);
            loadingTask.promise.then(function (pdf) {
                pdf.getPage(1).then(function (page) {
                    let scale = 2;
                    let viewport = page.getViewport({ scale: scale });
                    let canvas = document.createElement("canvas");
                    let context = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    let renderContext = { canvasContext: context, viewport: viewport };
                    page.render(renderContext).promise.then(function () {
                        let link = document.getElementById("downloadImageFromPDF");
                        link.href = canvas.toDataURL("image/png");
                        link.download = "pdf_image.png";
                        link.style.display = "block";
                        link.innerText = "Download Image";
                    });
                });
            });
        };
        reader.readAsArrayBuffer(fileInput);
    });

    // Remove Background - Placeholder Functionality
    document.getElementById("removeBackground").addEventListener("click", function () {
        alert("Free background removal isn't available yet! Stay tuned.");
    });

    // Navigation Functionality
    window.showTool = function (toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    };
});
