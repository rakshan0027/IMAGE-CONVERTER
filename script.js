document.addEventListener("DOMContentLoaded", () => {
    const backendURL = "https://image-converter-lmef.onrender.com"; // Update with your Render backend URL

    // Function to switch between tools
    function showTool(toolId) {
        document.querySelectorAll(".tool-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(toolId).style.display = "block";
    }

    // Image Converter
    document.getElementById("convertBtn").addEventListener("click", async () => {
        const fileInput = document.getElementById("imageInput").files[0];
        const format = document.getElementById("formatSelect").value;

        if (!fileInput) {
            alert("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append("image", fileInput);
        formData.append("format", format);

        try {
            const response = await fetch(`${backendURL}/convert-image`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.downloadUrl) {
                const downloadLink = document.getElementById("downloadLink");
                downloadLink.href = data.downloadUrl;
                downloadLink.textContent = "Download Converted Image";
                downloadLink.style.display = "block";
            } else {
                alert("Conversion failed. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while converting the image.");
        }
    });

    // Convert Image to PDF
    document.getElementById("convertToPDF").addEventListener("click", async () => {
        const fileInput = document.getElementById("pdfImageInput").files[0];

        if (!fileInput) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", fileInput);

        try {
            const response = await fetch(`${backendURL}/convert-image-to-pdf`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.downloadUrl) {
                document.getElementById("pdfDownloadContainer").innerHTML = `
                    <a href="${data.downloadUrl}" class="download-btn">Download PDF</a>
                `;
            } else {
                alert("Conversion failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    });

    // Convert PDF to Image
    document.getElementById("convertFromPDF").addEventListener("click", async () => {
        const fileInput = document.getElementById("pdfInput").files[0];

        if (!fileInput) {
            alert("Please select a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", fileInput);

        try {
            const response = await fetch(`${backendURL}/convert-pdf-to-image`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.downloadUrl) {
                document.getElementById("downloadImageFromPDF").href = data.downloadUrl;
                document.getElementById("downloadImageFromPDF").style.display = "block";
            } else {
                alert("Conversion failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    });

    // MP4 to MP3 Conversion
    document.getElementById("convertMp4ToMp3").addEventListener("click", async () => {
        const fileInput = document.getElementById("mp4Input").files[0];

        if (!fileInput) {
            alert("Please select an MP4 file.");
            return;
        }

        const formData = new FormData();
        formData.append("video", fileInput);

        try {
            const response = await fetch(`${backendURL}/convert-mp4-to-mp3`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.downloadUrl) {
                document.getElementById("mp3DownloadContainer").innerHTML = `
                    <a href="${data.downloadUrl}" class="download-btn">Download MP3</a>
                `;
            } else {
                alert("Conversion failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while converting the MP4 file.");
        }
    });

    // MP4 URL to MP3 Conversion
    document.getElementById("convertUrlToMp3").addEventListener("click", async () => {
        const videoUrl = document.getElementById("mp4Url").value.trim();

        if (!videoUrl) {
            alert("Please enter a valid video URL.");
            return;
        }

        try {
            const response = await fetch(`${backendURL}/convert-url-to-mp3`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: videoUrl }),
            });

            const data = await response.json();

            if (data.downloadUrl) {
                document.getElementById("mp3DownloadContainer").innerHTML = `
                    <a href="${data.downloadUrl}" class="download-btn">Download MP3</a>
                `;
            } else {
                alert("Conversion failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while converting.");
        }
    });

    // Background Removal (Premium Only)
    document.getElementById("removeBackground").addEventListener("click", async () => {
        const fileInput = document.getElementById("removeBgInput").files[0];

        if (!fileInput) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", fileInput);

        try {
            const response = await fetch(`${backendURL}/remove-bg`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.downloadUrl) {
                document.getElementById("bgRemovalMessage").innerHTML = `
                    <a href="${data.downloadUrl}" class="download-btn">Download Image</a>
                `;
            } else {
                alert("Background removal failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    });

    // Payment Handling for Premium Features
    document.getElementById("buyPremium").addEventListener("click", async () => {
        try {
            const response = await fetch(`${backendURL}/create-order`, { method: "POST" });
            const data = await response.json();

            const options = {
                key: "your-razorpay-key",
                amount: data.amount,
                currency: "INR",
                order_id: data.id,
                handler: function (response) {
                    alert("Payment successful! You now have premium access.");
                    document.getElementById("removeBackground").removeAttribute("disabled");
                },
            };

            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error:", error);
            alert("Payment failed.");
        }
    });

});
