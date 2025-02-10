// Show/hide different tools
function showTool(toolId) {
    document.querySelectorAll(".tool-section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(toolId).style.display = "block";
}

// ✅ Image Converter (JPG, PNG, WebP)
document.getElementById("convertBtn").addEventListener("click", function () {
    let input = document.getElementById("imageInput").files[0];
    let format = document.getElementById("formatSelect").value;

    if (!input) {
        alert("Please select an image.");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(input);

    reader.onload = function (event) {
        let link = document.getElementById("downloadLink");
        link.href = event.target.result;
        link.download = `converted.${format}`;
        link.style.display = "block";
        link.textContent = "Download Converted Image";
    };
});

// ✅ Image to PDF Converter
document.getElementById("convertToPDF").addEventListener("click", function () {
    let input = document.getElementById("pdfImageInput").files[0];

    if (!input) {
        alert("Please select an image.");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(input);

    reader.onload = function (event) {
        let img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            let { jsPDF } = window.jspdf;
            let doc = new jsPDF();

            doc.addImage(img, "JPEG", 10, 10, 180, 160);

            let pdfBlob = doc.output("blob");
            let link = document.createElement("a");
            link.href = URL.createObjectURL(pdfBlob);
            link.download = "converted.pdf";
            link.style.display = "block";
            link.textContent = "Download PDF";
            document.getElementById("pdfDownloadContainer").innerHTML = "";
            document.getElementById("pdfDownloadContainer").appendChild(link);
        };
    };
});

// ✅ PDF to Image Converter
document.getElementById("convertFromPDF").addEventListener("click", function () {
    let input = document.getElementById("pdfInput").files[0];

    if (!input) {
        alert("Please select a PDF file.");
        return;
    }

    let reader = new FileReader();
    reader.readAsArrayBuffer(input);

    reader.onload = async function (event) {
        let pdfData = new Uint8Array(event.target.result);
        let pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        let page = await pdf.getPage(1);
        let scale = 2;
        let viewport = page.getViewport({ scale });

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        let renderContext = { canvasContext: ctx, viewport: viewport };
        await page.render(renderContext).promise;

        let link = document.getElementById("downloadImageFromPDF");
        link.href = canvas.toDataURL("image/png");
        link.download = "pdf-converted.png";
        link.style.display = "block";
        link.textContent = "Download Image";
    };
});

// ✅ Remove Background (Currently Placeholder)
document.getElementById("removeBackground").addEventListener("click", function () {
    alert("Free background removal is not available yet! Stay tuned.");
});
