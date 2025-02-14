document.addEventListener("DOMContentLoaded", function () {
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => section.style.display = "none");
        document.getElementById(toolId).style.display = "block";
    }

    window.showTool = showTool;

    // Image Converter
    document.getElementById("convertBtn").addEventListener("click", function () {
        let file = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;
        if (file) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let img = new Image();
            let reader = new FileReader();
            reader.onload = function (event) {
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    let convertedImage = canvas.toDataURL("image/" + format);
                    let link = document.getElementById("downloadLink");
                    link.href = convertedImage;
                    link.download = "converted_image." + format;
                    link.style.display = "block";
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", function () {
        let file = document.getElementById("pdfImageInput").files[0];
        if (file) {
            let doc = new jspdf.jsPDF();
            let reader = new FileReader();
            reader.onload = function (event) {
                let img = new Image();
                img.onload = function () {
                    doc.addImage(img, "JPEG", 10, 10, 180, 160);
                    let pdfBlob = doc.output("blob");
                    let link = document.createElement("a");
                    link.href = URL.createObjectURL(pdfBlob);
                    link.download = "converted.pdf";
                    link.innerText = "Download PDF";
                    link.className = "download-btn";
                    document.getElementById("pdfDownloadContainer").innerHTML = "";
                    document.getElementById("pdfDownloadContainer").appendChild(link);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // MP4 to MP3 Conversion
    document.getElementById("convertMp4ToMp3").addEventListener("click", function () {
        let file = document.getElementById("mp4Input").files[0];
        if (file) {
            let formData = new FormData();
            formData.append("video", file);
            fetch("YOUR_BACKEND_ENDPOINT", {
                method: "POST",
                body: formData
            })
            .then(response => response.blob())
            .then(blob => {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "converted.mp3";
                link.innerText = "Download MP3";
                link.className = "download-btn";
                document.getElementById("mp3DownloadContainer").innerHTML = "";
                document.getElementById("mp3DownloadContainer").appendChild(link);
            })
            .catch(error => console.error("Conversion error:", error));
        }
    });

    document.getElementById("convertUrlToMp3").addEventListener("click", function () {
        let videoUrl = document.getElementById("mp4Url").value;
        if (videoUrl) {
            fetch("YOUR_BACKEND_ENDPOINT?videoUrl=" + encodeURIComponent(videoUrl))
            .then(response => response.blob())
            .then(blob => {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "converted.mp3";
                link.innerText = "Download MP3";
                link.className = "download-btn";
                document.getElementById("mp3DownloadContainer").innerHTML = "";
                document.getElementById("mp3DownloadContainer").appendChild(link);
            })
            .catch(error => console.error("Conversion error:", error));
        }
    });
});
