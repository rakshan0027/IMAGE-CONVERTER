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
                        link.click();
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    });

    // 🚀 AI SEO Tools - Simulated Functionality
    document.querySelectorAll(".seo-tool-btn").forEach(button => {
        button.addEventListener("click", function () {
            let toolType = this.dataset.tool;
            let inputText = document.getElementById("seoInput").value;
            let resultContainer = document.getElementById("seoResult");
            if (!inputText) {
                alert("Please enter text to analyze.");
                return;
            }
            resultContainer.innerHTML = "Processing...";
            setTimeout(() => {
                let output = "";
                switch (toolType) {
                    case "keywordResearch":
                        output = "Suggested Keywords: AI tools, SEO analysis, digital marketing";
                        break;
                    case "seoScore":
                        output = "SEO Score: " + Math.floor(Math.random() * 100) + "/100";
                        break;
                    case "metaTagGenerator":
                        output = "Meta Tags: <meta name='description' content='Best AI SEO tools for optimization'>";
                        break;
                    case "contentOptimizer":
                        output = "Optimization Tip: Use keywords naturally in headings and body text.";
                        break;
                    case "backlinkChecker":
                        output = "Backlinks Found: 23 from high-authority domains.";
                        break;
                    case "plagiarismChecker":
                        output = "Plagiarism Check: 89% unique content.";
                        break;
                    case "aiWriter":
                        output = "Rewritten Content: AI-generated SEO-friendly text.";
                        break;
                    default:
                        output = "Tool not found.";
                }
                resultContainer.innerHTML = `Result for ${toolType}: ${output}`;
            }, 2000);
        });
    });

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
            prefill: {
                email: "shivohumcreation@gmail.com"
            }
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

    // ✉️ Feedback Submission
    document.getElementById("submitFeedback").addEventListener("click", function () {
        let feedbackText = document.querySelector("#feedback textarea").value.trim();
        if (!feedbackText) {
            alert("Please enter your feedback before submitting.");
            return;
        }
        let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbacks.push(feedbackText);
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
        alert("Thank you for your feedback!");
        document.querySelector("#feedback textarea").value = "";
    });

    // 🔀 Navigation Menu Functionality
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }
    window.showTool = showTool;
});
