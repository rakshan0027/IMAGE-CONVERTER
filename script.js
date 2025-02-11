document.addEventListener("DOMContentLoaded", function () {
    // 🖼️ Convert Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", function () {
        let input = document.getElementById("pdfImageInput").files[0];

        if (!input) {
            alert("Please select an image file.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.crossOrigin = "anonymous"; // Fix potential CORS issue
            img.src = e.target.result;

            img.onload = function () {
                let { jsPDF } = window.jspdf;
                let pdf = new jsPDF();
                let width = pdf.internal.pageSize.getWidth();
                let height = (img.height / img.width) * width;

                pdf.addImage(img, "JPEG", 0, 0, width, height);
                let pdfBlob = pdf.output("blob");

                let link = document.createElement("a");
                link.href = URL.createObjectURL(pdfBlob);
                link.download = "converted.pdf";
                link.click();
            };
        };
        reader.readAsDataURL(input);
    });

    // 📄 Convert PDF to Image
    document.getElementById("convertFromPDF").addEventListener("click", function () {
        let fileInput = document.getElementById("pdfInput");
        let file = fileInput.files[0];

        if (!file) {
            alert("Please select a PDF file.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (event) {
            let pdfData = new Uint8Array(event.target.result);

            pdfjsLib.getDocument({ data: pdfData }).promise.then(function (pdf) {
                pdf.getPage(1).then(function (page) {
                    let scale = 2;
                    let viewport = page.getViewport({ scale: scale });

                    let canvas = document.createElement("canvas");
                    let context = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    let renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };

                    page.render(renderContext).promise.then(function () {
                        let imageUrl = canvas.toDataURL("image/png");

                        let link = document.getElementById("downloadImageFromPDF");
                        link.href = imageUrl;
                        link.download = "pdf-image.png";
                        link.style.display = "block";
                    });
                });
            });
        };

        reader.readAsArrayBuffer(file);
    });

    // 🚀 Buy Premium Feature (Unlock Background Removal)
    document.getElementById("buyPremium").addEventListener("click", function () {
        var options = {
            key: "rzp_test_5XL0rkhnhFm6QX",
            amount: 9, // ₹499
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

    // ✅ Unlock Background Removal for Premium Users
    if (localStorage.getItem("premiumUser") === "true") {
        document.getElementById("removeBackground").disabled = false;
        document.getElementById("bgRemovalMessage").style.display = "none";
    }

    // 🔀 Navigation Menu Functionality
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;
});
