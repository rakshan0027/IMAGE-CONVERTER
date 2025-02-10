document.addEventListener("DOMContentLoaded", function () {
    // Show selected tool
    function showTool(toolId) {
        document.querySelectorAll('.tool-section').forEach(section => section.style.display = 'none');
        document.getElementById(toolId).style.display = 'block';
    }

    // Image Conversion
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
                let pdfOutput = pdf.output("bloburl");

                let downloadBtn = document.createElement("a");
                downloadBtn.href = pdfOutput;
                downloadBtn.innerText = "Download PDF";
                downloadBtn.download = "converted.pdf";
                document.getElementById("pdfDownloadContainer").innerHTML = "";
                document.getElementById("pdfDownloadContainer").appendChild(downloadBtn);
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
    async function removeBackground() {
        let fileInput = document.getElementById("removeBgInput").files[0];

        if (!fileInput) {
            alert("Please select an image!");
            return;
        }

        let reader = new FileReader();
        reader.onload = async function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = async function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Load TensorFlow.js BodyPix model
                const net = await bodyPix.load();
                const segmentation = await net.segmentPerson(img);

                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let pixels = imageData.data;

                for (let i = 0; i < pixels.length; i += 4) {
                    if (segmentation.data[i / 4] === 0) {
                        pixels[i + 3] = 0; // Make background transparent
                    }
                }
                ctx.putImageData(imageData, 0, 0);

                let processedImg = canvas.toDataURL("image/png");
                let downloadLink = document.createElement("a");
                downloadLink.href = processedImg;
                downloadLink.download = "no_bg_image.png";
                downloadLink.innerText = "Download Image Without Background";
                document.getElementById("removeBgTool").appendChild(downloadLink);
            };
        };
        reader.readAsDataURL(fileInput);
    }

    document.getElementById("removeBackground").addEventListener("click", removeBackground);
});
