document.addEventListener("DOMContentLoaded", function () {
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const toolId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showTool(toolId);
        });
    });

    // Image Converter
    document.getElementById("convertBtn").addEventListener("click", function () {
        const file = document.getElementById("imageInput").files[0];
        const format = document.getElementById("formatSelect").value;
        if (!file) {
            alert("Please select an image.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const convertedImg = canvas.toDataURL(`image/${format}`);
                const link = document.getElementById("downloadLink");
                link.href = convertedImg;
                link.download = `converted.${format}`;
                link.style.display = "block";
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", function () {
        const file = document.getElementById("pdfImageInput").files[0];
        if (!file) {
            alert("Please select an image.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const doc = new jspdf.jsPDF();
                doc.addImage(img, "JPEG", 10, 10, 180, 160);
                const pdfUrl = doc.output("bloburl");
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.download = "converted.pdf";
                link.innerText = "Download PDF";
                document.getElementById("pdfDownloadContainer").innerHTML = "";
                document.getElementById("pdfDownloadContainer").appendChild(link);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Remove Background Placeholder (Premium Feature)
    document.getElementById("buyPremium").addEventListener("click", function () {
        alert("Premium purchase is required to use this feature.");
    });

    // MP4 to MP3 Conversion
    document.getElementById("convertMp4ToMp3").addEventListener("click", function () {
        alert("MP4 to MP3 conversion will be handled by the backend.");
    });
});
