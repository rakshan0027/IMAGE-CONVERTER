document.addEventListener("DOMContentLoaded", function() {
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;

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

    document.getElementById("submitFeedback").addEventListener("click", function() {
        let feedbackText = document.querySelector("#feedback textarea").value.trim();
        if (feedbackText === "") {
            alert("Please enter your feedback.");
            return;
        }
        alert("Thank you for your feedback!");
        document.querySelector("#feedback textarea").value = "";
    });

    document.getElementById("enhanceImage").addEventListener("click", function() {
        alert("AI Image Enhancement requires premium access.");
    });
});
