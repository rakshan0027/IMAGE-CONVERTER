document.addEventListener("DOMContentLoaded", function() {
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;

    // ✅ Convert Image Function
    document.getElementById("convertBtn").addEventListener("click", function() {
        let input = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        if (!input) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                let convertedImage = canvas.toDataURL("image/" + format);
                let link = document.getElementById("downloadLink");
                link.href = convertedImage;
                link.download = "converted-image." + format;
                link.style.display = "block";
            };
        };
        reader.readAsDataURL(input);
    });

    // ✅ Convert Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", function() {
        let input = document.getElementById("pdfImageInput").files[0];
        if (!input) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            const { jsPDF } = window.jspdf;
            let pdf = new jsPDF();
            let img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                let width = pdf.internal.pageSize.getWidth();
                let height = (img.height / img.width) * width;
                pdf.addImage(img, "JPEG", 10, 10, width - 20, height);
                let pdfBlob = pdf.output("blob");
                let pdfURL = URL.createObjectURL(pdfBlob);
                let link = document.createElement("a");
                link.href = pdfURL;
                link.download = "converted.pdf";
                link.textContent = "Download PDF";
                link.className = "download-btn";
                document.getElementById("pdfDownloadContainer").innerHTML = "";
                document.getElementById("pdfDownloadContainer").appendChild(link);
            };
        };
        reader.readAsDataURL(input);
    });

    // ✅ Convert PDF to Image
    document.getElementById("convertFromPDF").addEventListener("click", async function() {
        let input = document.getElementById("pdfInput").files[0];
        if (!input) {
            alert("Please select a PDF file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = async function(e) {
            let pdfData = new Uint8Array(e.target.result);
            let pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            let page = await pdf.getPage(1);
            let viewport = page.getViewport({ scale: 2.0 });
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            let renderContext = { canvasContext: ctx, viewport: viewport };
            await page.render(renderContext).promise;
            let imageDataURL = canvas.toDataURL("image/png");
            let link = document.getElementById("downloadImageFromPDF");
            link.href = imageDataURL;
            link.download = "converted-image.png";
            link.style.display = "block";
        };
        reader.readAsArrayBuffer(input);
    });

    // ✅ Remove Background (Using TensorFlow BodyPix)
    document.getElementById("removeBackground").addEventListener("click", async function() {
        let input = document.getElementById("removeBgInput").files[0];
        if (!input) {
            alert("Please select an image file.");
            return;
        }
        let reader = new FileReader();
        reader.onload = async function(e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = async function() {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Load BodyPix Model
                let net = await bodyPix.load();
                let segmentation = await net.segmentPerson(img, {
                    internalResolution: 'medium',
                    segmentationThreshold: 0.5
                });

                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (segmentation.data[i / 4] === 0) {
                        data[i + 3] = 0;
                    }
                }
                ctx.putImageData(imageData, 0, 0);

                let removedBgImage = canvas.toDataURL("image/png");
                let link = document.getElementById("downloadBgRemoved");
                link.href = removedBgImage;
                link.download = "bg-removed.png";
                link.style.display = "block";
            };
        };
        reader.readAsDataURL(input);
    });

    // ✅ AI Image Enhance (Premium)
    document.getElementById("enhanceImage").addEventListener("click", function() {
        alert("AI Image Enhancement requires premium access.");
    });

    // ✅ Feedback Submission
    document.getElementById("submitFeedback").addEventListener("click", function() {
        let feedbackText = document.querySelector("#feedback textarea").value.trim();
        if (feedbackText === "") {
            alert("Please enter your feedback.");
            return;
        }
        alert("Thank you for your feedback!");
        document.querySelector("#feedback textarea").value = "";
    });
});
