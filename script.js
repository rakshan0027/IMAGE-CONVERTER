document.addEventListener("DOMContentLoaded", function () {
    function showTool(toolId) {
        document.querySelectorAll('.tool-section').forEach(section => section.style.display = 'none');
        document.getElementById(toolId).style.display = 'block';
    }

    // Image Conversion (JPG, PNG, WebP)
    document.getElementById("convertBtn").addEventListener("click", function () {
        let fileInput = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        
        if (!fileInput) {
            alert("Please select an image!");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                let convertedImage = canvas.toDataURL(`image/${format}`);
                let downloadLink = document.getElementById("downloadLink");
                downloadLink.href = convertedImage;
                downloadLink.download = `converted.${format}`;
                downloadLink.style.display = "block";
                downloadLink.innerText = "Download Converted Image";
            };
        };
        reader.readAsDataURL(fileInput);
    });

    // Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", function () {
        let fileInput = document.getElementById("pdfImageInput").files[0];
        
        if (!fileInput) {
            alert("Please select an image!");
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
                pdf.save("converted.pdf");
            };
        };
        reader.readAsDataURL(fileInput);
    });

    // PDF to Image
    document.getElementById("convertFromPDF").addEventListener("click", async function () {
        let fileInput = document.getElementById("pdfInput").files[0];

        if (!fileInput) {
            alert("Please select a PDF file!");
            return;
        }

        let reader = new FileReader();
        reader.onload = async function (e) {
            let loadingTask = pdfjsLib.getDocument({ data: e.target.result });
            let pdf = await loadingTask.promise;
            let page = await pdf.getPage(1);
            let scale = 2;
            let viewport = page.getViewport({ scale });

            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            let renderContext = { canvasContext: context, viewport: viewport };
            
            await page.render(renderContext).promise;

            let imgData = canvas.toDataURL("image/png");
            let downloadImage = document.getElementById("downloadImageFromPDF");
            downloadImage.href = imgData;
            downloadImage.download = "converted_image.png";
            downloadImage.style.display = "block";
            downloadImage.innerText = "Download Image";
        };
        reader.readAsArrayBuffer(fileInput);
    });

    // Background Removal
    document.getElementById("removeBackground").addEventListener("click", async function () {
        alert("This feature requires a backend server to function properly.");
    });
});
