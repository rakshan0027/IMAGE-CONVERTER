document.addEventListener("DOMContentLoaded", function () {
    // Image Conversion Functionality
    document.getElementById("convertBtn").addEventListener("click", function () {
        let input = document.getElementById("imageInput").files[0];
        let format = document.getElementById("formatSelect").value;

        if (!input) {
            alert("Please select an image file.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.crossOrigin = "anonymous"; // Fix CORS issue
            img.src = e.target.result;

            img.onload = function () {
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                let convertedImage = canvas.toDataURL("image/" + format);
                
                if (convertedImage) {
                    let link = document.getElementById("downloadLink");
                    link.href = convertedImage;
                    link.download = "converted-image." + format;
                    link.style.display = "block";
                } else {
                    alert("Failed to convert image. Try again.");
                }
            };
        };
        reader.readAsDataURL(input);
    });

    // Buy Premium Feature (Unlock Background Removal)
    document.getElementById("buyPremium").addEventListener("click", function () {
        var options = {
            key: "rzp_test_5XL0rkhnhFm6QX",
            amount: 9, // Amount in paise (₹499)
            currency: "INR",
            name: "Premium Access",
            description: "Unlock Background Removal",
            handler: function (response) {
                localStorage.setItem("premiumUser", "true");
                alert("Payment successful! Background removal unlocked.");
                document.getElementById("removeBackground").disabled = false;
                document.getElementById("bgRemovalMessage").style.display = "none";
            },
            prefill: {
                email: "shivohumcreation@gmail.com"
            }
        };

        var rzp = new Razorpay(options);
        rzp.open();
    });

    // Unlock Background Removal for Premium Users
    if (localStorage.getItem("premiumUser") === "true") {
        document.getElementById("removeBackground").disabled = false;
        document.getElementById("bgRemovalMessage").style.display = "none";
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
