// script.js - Updated with working Remove Background feature

document.addEventListener("DOMContentLoaded", () => {
    setupImageConverter();
    setupPDFConverter();
    setupPDFToImageConverter();
    setupBackgroundRemover();
});

// Show tools based on selection
function showTool(toolId) {
    document.querySelectorAll(".tool-section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(toolId).style.display = "block";
}

// Image format conversion
function setupImageConverter() {
    const imageInput = document.getElementById("imageInput");
    const formatSelect = document.getElementById("formatSelect");
    const convertBtn = document.getElementById("convertBtn");
    const downloadLink = document.getElementById("downloadLink");

    convertBtn.addEventListener("click", () => {
        if (!imageInput.files.length) return alert("Please select an image");
        const file = imageInput.files[0];
        const format = formatSelect.value;
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const newDataUrl = canvas.toDataURL(`image/${format}`);
                downloadLink.href = newDataUrl;
                downloadLink.download = `converted.${format}`;
                downloadLink.style.display = "block";
                downloadLink.textContent = "Download Converted Image";
            };
        };
        reader.readAsDataURL(file);
    });
}

// Convert Image to PDF
function setupPDFConverter() {
    const pdfImageInput = document.getElementById("pdfImageInput");
    const convertToPDF = document.getElementById("convertToPDF");
    const pdfDownloadContainer = document.getElementById("pdfDownloadContainer");

    convertToPDF.addEventListener("click", () => {
        if (!pdfImageInput.files.length) return alert("Please select an image");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const file = pdfImageInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                pdf.addImage(img, "JPEG", 10, 10, 180, 160);
                const pdfBlob = pdf.output("blob");
                const url = URL.createObjectURL(pdfBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "converted.pdf";
                link.textContent = "Download PDF";
                pdfDownloadContainer.innerHTML = "";
                pdfDownloadContainer.appendChild(link);
            };
        };
        reader.readAsDataURL(file);
    });
}

// Convert PDF to Image
function setupPDFToImageConverter() {
    const pdfInput = document.getElementById("pdfInput");
    const convertFromPDF = document.getElementById("convertFromPDF");
    const downloadImageFromPDF = document.getElementById("downloadImageFromPDF");

    convertFromPDF.addEventListener("click", async () => {
        if (!pdfInput.files.length) return alert("Please select a PDF file");
        const file = pdfInput.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const pdfData = new Uint8Array(event.target.result);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            const page = await pdf.getPage(1);
            const scale = 2;
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: context, viewport }).promise;
            const imageURL = canvas.toDataURL("image/png");
            downloadImageFromPDF.href = imageURL;
            downloadImageFromPDF.download = "converted.png";
            downloadImageFromPDF.style.display = "block";
            downloadImageFromPDF.textContent = "Download Image";
        };
        reader.readAsArrayBuffer(file);
    });
}

// Remove Background Feature
async function setupBackgroundRemover() {
    const removeBgInput = document.getElementById("removeBgInput");
    const removeBackground = document.getElementById("removeBackground");
    const resultContainer = document.getElementById("removeBgTool");

    removeBackground.addEventListener("click", async () => {
        if (!removeBgInput.files.length) return alert("Please select an image");
        const file = removeBgInput.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
                const net = await bodyPix.load();
                const segmentation = await net.segmentPerson(img);
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (segmentation.data[i / 4] === 0) {
                        data[i + 3] = 0;
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                const transparentImg = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = transparentImg;
                link.download = "background_removed.png";
                link.textContent = "Download Transparent Image";
                resultContainer.appendChild(link);
            };
        };
        reader.readAsDataURL(file);
    });
}
