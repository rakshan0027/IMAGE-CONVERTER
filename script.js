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

    // Razorpay Payment for Premium Feature
    document.getElementById("buyPremium").addEventListener("click", function () {
        let options = {
            "key": "rzp_test_5XL0rkhnhFm6QX", // Replace with your actual Razorpay Key
            "amount": 9, // Amount in paisa (₹499.00)
            "currency": "INR",
            "name": "Premium Access",
            "description": "Unlock background removal",
            "handler": function (response) {
                alert("Payment Successful! Background Removal Unlocked!");
                localStorage.setItem("premiumUser", "true");
                document.getElementById("removeBgSection").style.display = "block";
            },
            "prefill": {
                "email": "user@example.com"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        let rzp1 = new Razorpay(options);
        rzp1.open();
    });

    // Check if user already purchased premium
    if (localStorage.getItem("premiumUser") === "true") {
        document.getElementById("removeBgSection").style.display = "block";
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
