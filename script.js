function showTool(toolId) {
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(toolId).style.display = 'block';
}

// Image Converter
const imageInput = document.getElementById("imageInput");
const formatSelect = document.getElementById("formatSelect");
const convertBtn = document.getElementById("convertBtn");
const downloadLink = document.getElementById("downloadLink");

convertBtn.addEventListener("click", () => {
    const file = imageInput.files[0];
    if (!file) return alert("Please select an image.");
    
    const format = formatSelect.value;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const convertedImage = canvas.toDataURL(`image/${format}`);
        downloadLink.href = convertedImage;
        downloadLink.download = `converted.${format}`;
        downloadLink.style.display = "block";
    };
    img.src = URL.createObjectURL(file);
});

// Image to PDF
const pdfImageInput = document.getElementById("pdfImageInput");
const convertToPDF = document.getElementById("convertToPDF");
const pdfDownloadContainer = document.getElementById("pdfDownloadContainer");

convertToPDF.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const file = pdfImageInput.files[0];
    if (!file) return alert("Please select an image.");
    
    const img = new Image();
    img.onload = () => {
        pdf.addImage(img, "JPEG", 10, 10, 180, 160);
        const pdfBlob = pdf.output("bloburl");
        pdfDownloadContainer.innerHTML = `<a href="${pdfBlob}" download="converted.pdf">Download PDF</a>`;
    };
    img.src = URL.createObjectURL(file);
});

// PDF to Image
const pdfInput = document.getElementById("pdfInput");
const convertFromPDF = document.getElementById("convertFromPDF");
const downloadImageFromPDF = document.getElementById("downloadImageFromPDF");

convertFromPDF.addEventListener("click", async () => {
    const file = pdfInput.files[0];
    if (!file) return alert("Please select a PDF.");
    
    const fileReader = new FileReader();
    fileReader.onload = async function () {
        const pdfData = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const page = await pdf.getPage(1);
        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        const imageURL = canvas.toDataURL("image/png");
        downloadImageFromPDF.href = imageURL;
        downloadImageFromPDF.download = "converted.png";
        downloadImageFromPDF.style.display = "block";
    };
    fileReader.readAsArrayBuffer(file);
});

// Remove Background (Premium)
document.getElementById("buyPremium").addEventListener("click", function() {
    var options = {
        key: "rzp_test_your_key_here",
        amount: 900,
        currency: "INR",
        name: "Premium Background Removal",
        description: "Get access to background removal feature.",
        handler: function (response) {
            document.getElementById("removeBackground").disabled = false;
            document.getElementById("bgRemovalMessage").innerText = "Background removal enabled!";
        }
    };
    var rzp = new Razorpay(options);
    rzp.open();
});

// MP4 to MP3 Conversion
const mp4Input = document.getElementById("mp4Input");
const convertMp4ToMp3 = document.getElementById("convertMp4ToMp3");
const mp3DownloadContainer = document.getElementById("mp3DownloadContainer");

convertMp4ToMp3.addEventListener("click", () => {
    const file = mp4Input.files[0];
    if (!file) return alert("Please select an MP4 file.");
    alert("MP4 to MP3 conversion will be added soon!");
});

const mp4Url = document.getElementById("mp4Url");
const convertUrlToMp3 = document.getElementById("convertUrlToMp3");

convertUrlToMp3.addEventListener("click", () => {
    if (!mp4Url.value) return alert("Please enter a valid URL.");
    alert("MP4 to MP3 conversion from URL will be added soon!");
});
