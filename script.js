// Function to show the selected tool and hide others
function showTool(toolId) {
    document.querySelectorAll(".tool-section").forEach(section => {
        section.style.display = "none"; // Hide all sections
    });
    document.getElementById(toolId).style.display = "block"; // Show selected tool
}

// Event Listeners for Menu Options
document.getElementById("convert-to-pdf").addEventListener("click", function() {
    showTool("pdfTool");
});

document.getElementById("convert-from-pdf").addEventListener("click", function() {
    showTool("pdfToImageTool");
});

document.getElementById("remove-bg").addEventListener("click", function() {
    showTool("removeBgTool");
});

// Image to PNG, JPG, WebP Conversion
document.getElementById("convertBtn").addEventListener("click", function() {
    let input = document.getElementById("imageInput").files[0];
    let format = document.getElementById("formatSelect").value;

    if (!input) {
        alert("Please select an image first.");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(input);

    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let convertedImg = canvas.toDataURL(`image/${format}`);
            let link = document.getElementById("downloadLink");
            link.href = convertedImg;
            link.download = `converted-image.${format}`;
            link.style.display = "block";
            link.textContent = "Download Converted Image";
        };
    };
});

// ✅ FIXED: Image to PDF Conversion
document.getElementById("convertToPDF").addEventListener("click", function() {
    let input = document.getElementById("pdfImageInput").files[0];

    if (!input) {
        alert("Please select an image.");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(input);
    
    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            let doc = new jsPDF({
                orientation: img.width > img.height ? "landscape" : "portrait",
                unit: "px",
                format: [img.width, img.height]
            });

            doc.addImage(img, 'JPEG', 10, 10, img.width - 20, img.height - 20);

            let pdfData = doc.output("blob");

            let link = document.createElement("a");
            link.href = URL.createObjectURL(pdfData);
            link.download = "converted.pdf";
            link.style.display = "block";
            link.textContent = "Download PDF";
            document.getElementById("pdfTool").appendChild(link);
        };
    };
});

// ✅ PDF to Image Conversion
document.getElementById("convertFromPDF").addEventListener("click", function() {
    let input = document.getElementById("pdfInput").files[0];

    if (!input) {
        alert("Please select a PDF.");
        return;
    }

    let reader = new FileReader();
    reader.readAsArrayBuffer(input);

    reader.onload = function(event) {
        pdfjsLib.getDocument(new Uint8Array(event.target.result)).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                let scale = 2;
                let viewport = page.getViewport({ scale: scale });
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                page.render({ canvasContext: ctx, viewport: viewport }).promise.then(() => {
                    let link = document.getElementById("downloadImageFromPDF");
                    link.href = canvas.toDataURL("image/png");
                    link.download = "pdf-image.png";
                    link.style.display = "block";
                    link.textContent = "Download Image";
                });
            });
        });
    };
});

// ✅ Remove Background (Placeholder for Future)
document.getElementById("removeBackground").addEventListener("click", function() {
    alert("Free background removal isn't available yet! Working on an alternative.");
});
