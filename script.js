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
            img.crossOrigin = "anonymous";
            img.src = e.target.result;
            img.onload = function () {
                let { jsPDF } = window.jspdf;
                let pdf = new jsPDF();
                let width = pdf.internal.pageSize.getWidth();
                let height = (img.height / img.width) * width;
                pdf.addImage(img, "JPEG", 0, 0, width, height);
                pdf.save("converted.pdf");
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
                    let renderContext = { canvasContext: context, viewport: viewport };
                    page.render(renderContext).promise.then(function () {
                        let imageUrl = canvas.toDataURL("image/png");
                        let link = document.getElementById("downloadImageFromPDF");
                        link.href = imageUrl;
                        link.download = "pdf-image.png";
                        link.style.display = "block";
                        link.click();
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    });

    // 🚀 Meta Tag & Description Generator (OpenAI API Integration)
    async function generateMetaTags(content) {
        const apiKey = "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";  // Replace with your OpenAI API key
        const apiUrl = "https://api.openai.com/v1/completions";
        
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Generate an SEO-friendly meta description for: ${content}`,
                max_tokens: 50
            })
        });

        const data = await response.json();
        document.getElementById("meta-output").innerText = data.choices[0].text.trim();
    }
    window.generateMetaTags = generateMetaTags;

    // 🚀 Buy Premium Feature (Unlock Background Removal)
    document.getElementById("buyPremium").addEventListener("click", function () {
        var options = {
            key: "rzp_test_5XL0rkhnhFm6QX",
            amount: 9,
            currency: "INR",
            name: "Premium Access",
            description: "Unlock Background Removal",
            handler: function (response) {
                localStorage.setItem("premiumUser", "true");
                alert("Payment successful! Background removal unlocked.");
                enablePremiumFeatures();
            },
            prefill: { email: "shivohumcreation@gmail.com" }
        };
        var rzp = new Razorpay(options);
        rzp.open();
    });

    // ✅ Unlock Background Removal for Premium Users
    function enablePremiumFeatures() {
        document.getElementById("removeBackground").disabled = false;
        document.getElementById("bgRemovalMessage").style.display = "none";
    }
    if (localStorage.getItem("premiumUser") === "true") {
        enablePremiumFeatures();
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
