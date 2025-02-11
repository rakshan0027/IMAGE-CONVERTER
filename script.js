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

    // Razorpay Payment Integration for Premium Purchase
    document.getElementById("buyPremium").addEventListener("click", function() {
        var options = {
            "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
            "amount": "49900", // Amount in paise (499 INR)
            "currency": "INR",
            "name": "AI Tool Image",
            "description": "Lifetime Premium Access",
            "handler": function (response) {
                alert("Payment successful! Premium unlocked.");
                localStorage.setItem("premium", "true");
                document.getElementById("removeBgSection").style.display = "block";
                document.getElementById("buyPremium").style.display = "none";
            },
            "theme": { "color": "#3399cc" }
        };
        var rzp = new Razorpay(options);
        rzp.open();
    });

    // Unlock Premium Feature if Purchased Before
    if (localStorage.getItem("premium") === "true") {
        document.getElementById("removeBgSection").style.display = "block";
        document.getElementById("buyPremium").style.display = "none";
    }

    // Navigation Menu Functionality
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;
});
