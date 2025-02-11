document.addEventListener("DOMContentLoaded", function() {
    // Image Conversion Functionality
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

    // YouTube Video Download Functionality
    document.getElementById("downloadYT").addEventListener("click", async function() {
        let url = document.getElementById("videoUrl").value;
        let format = document.getElementById("formatSelectYT").value;

        if (!url) {
            alert("Please enter a YouTube URL.");
            return;
        }

        let response = await fetch("https://your-backend-url.com/download", { // Update this URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, format })
        });

        let data = await response.json();
        if (data.success) {
            let link = document.getElementById("ytDownloadLink");
            link.href = data.downloadLink;
            link.style.display = "block";
        } else {
            alert("Failed to process video.");
        }
    });

    // Navigation Menu Functionality
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;
});
