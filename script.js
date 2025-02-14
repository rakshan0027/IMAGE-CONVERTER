document.addEventListener("DOMContentLoaded", function() {
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => section.style.display = "none");
        document.getElementById(toolId).style.display = "block";
    }

    // Image Converter
    document.getElementById("convertBtn").addEventListener("click", function() {
        let file = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        if (file) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                let link = document.getElementById("downloadLink");
                link.href = canvas.toDataURL("image/" + format);
                link.download = "converted_image." + format;
                link.style.display = "block";
            };
            img.src = URL.createObjectURL(file);
        }
    });

    // Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", function() {
        let file = document.getElementById("pdfImageInput").files[0];
        if (file) {
            let pdf = new jsPDF();
            let img = new Image();
            img.onload = function() {
                pdf.addImage(img, "JPEG", 10, 10, 180, 160);
                let pdfBlob = pdf.output("blob");
                let link = document.createElement("a");
                link.href = URL.createObjectURL(pdfBlob);
                link.download = "converted.pdf";
                link.textContent = "Download PDF";
                link.classList.add("download-btn");
                document.getElementById("pdfDownloadContainer").innerHTML = "";
                document.getElementById("pdfDownloadContainer").appendChild(link);
            };
            img.src = URL.createObjectURL(file);
        }
    });

    // PDF to Image
    document.getElementById("convertFromPDF").addEventListener("click", function() {
        let file = document.getElementById("pdfInput").files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function() {
                let loadingTask = pdfjsLib.getDocument({data: reader.result});
                loadingTask.promise.then(function(pdf) {
                    pdf.getPage(1).then(function(page) {
                        let scale = 1.5;
                        let viewport = page.getViewport({scale: scale});
                        let canvas = document.createElement("canvas");
                        let context = canvas.getContext("2d");
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        let renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext).promise.then(() => {
                            let link = document.getElementById("downloadImageFromPDF");
                            link.href = canvas.toDataURL("image/png");
                            link.download = "converted_image.png";
                            link.style.display = "block";
                        });
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        }
    });

    // Remove Background (Dummy Feature for Premium Users)
    document.getElementById("buyPremium").addEventListener("click", function() {
        let options = {
            key: "rzp_test_yourkey",
            amount: 900,
            currency: "INR",
            name: "Premium Background Removal",
            description: "Unlock background removal feature",
            handler: function(response) {
                document.getElementById("removeBackground").disabled = false;
                document.getElementById("bgRemovalMessage").textContent = "Background removal unlocked!";
            },
            prefill: {
                email: "user@example.com"
            }
        };
        let rzp = new Razorpay(options);
        rzp.open();
    });

    // MP4 to MP3 Conversion
    document.getElementById("convertMp4ToMp3").addEventListener("click", function() {
        let file = document.getElementById("mp4Input").files[0];
        if (file) {
            let link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "converted_audio.mp3";
            link.textContent = "Download MP3";
            link.classList.add("download-btn");
            document.getElementById("mp3DownloadContainer").innerHTML = "";
            document.getElementById("mp3DownloadContainer").appendChild(link);
        }
    });

    document.getElementById("convertUrlToMp3").addEventListener("click", function() {
        alert("URL to MP3 conversion requires a server-side solution.");
    });
});
