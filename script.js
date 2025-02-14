document.addEventListener("DOMContentLoaded", function () {
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }

    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
        });
    });

    // Image Converter
    document.getElementById("convertBtn").addEventListener("click", function () {
        let input = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        if (!input) return alert("Please upload an image first.");
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.onload = function () {
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                let convertedImage = canvas.toDataURL(`image/${format}`);
                let link = document.getElementById("downloadLink");
                link.href = convertedImage;
                link.download = `converted.${format}`;
                link.style.display = "block";
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input);
    });

    // Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", function () {
        let input = document.getElementById("pdfImageInput").files[0];
        if (!input) return alert("Please upload an image first.");
        let reader = new FileReader();
        reader.onload = function (e) {
            let doc = new jspdf.jsPDF();
            let img = new Image();
            img.onload = function () {
                doc.addImage(img, "JPEG", 10, 10, 180, 160);
                let pdfOutput = doc.output("bloburl");
                let container = document.getElementById("pdfDownloadContainer");
                container.innerHTML = `<a href="${pdfOutput}" download="converted.pdf" class="download-btn">Download PDF</a>`;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input);
    });

    // PDF to Image
    document.getElementById("convertFromPDF").addEventListener("click", function () {
        let input = document.getElementById("pdfInput").files[0];
        if (!input) return alert("Please upload a PDF file first.");
        let reader = new FileReader();
        reader.onload = function (e) {
            pdfjsLib.getDocument({ data: e.target.result }).promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    let scale = 2;
                    let viewport = page.getViewport({ scale: scale });
                    let canvas = document.createElement("canvas");
                    let context = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    let renderContext = { canvasContext: context, viewport: viewport };
                    page.render(renderContext).promise.then(() => {
                        let imgURL = canvas.toDataURL("image/png");
                        let link = document.getElementById("downloadImageFromPDF");
                        link.href = imgURL;
                        link.download = "converted.png";
                        link.style.display = "block";
                    });
                });
            });
        };
        reader.readAsArrayBuffer(input);
    });

    // Remove Background (Premium Only)
    document.getElementById("buyPremium").addEventListener("click", function () {
        let options = {
            key: "your_razorpay_key",
            amount: 900,
            currency: "INR",
            name: "AI Tools Premium",
            description: "Premium Background Removal Access",
            handler: function (response) {
                document.getElementById("removeBackground").disabled = false;
                document.getElementById("bgRemovalMessage").style.display = "none";
            }
        };
        let rzp = new Razorpay(options);
        rzp.open();
    });

    // MP4 to MP3 Conversion
    document.getElementById("convertMp4ToMp3").addEventListener("click", function () {
        alert("MP4 to MP3 conversion requires server-side processing.");
    });
    document.getElementById("convertUrlToMp3").addEventListener("click", function () {
        alert("URL-based conversion is not supported yet.");
    });
});
