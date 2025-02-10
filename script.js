document.getElementById("convertBtn").addEventListener("click", function() {
    let input = document.getElementById("imageInput").files[0];
    let format = document.getElementById("formatSelect").value;

    if (!input) {
        alert("Please select an image first.");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(input);

    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let convertedImg = canvas.toDataURL(`image/${format}`);
            let link = document.getElementById("downloadLink");
            link.href = convertedImg;
            link.download = `converted-image.${format}`;
            link.style.display = "block";
            link.textContent = "Download Converted Image";
        };
    };
});

// Additional Tools (Future Enhancements)
document.getElementById("convert-to-pdf").addEventListener("click", function() {
    alert("Image to PDF conversion will be added soon!");
});

document.getElementById("convert-from-pdf").addEventListener("click", function() {
    alert("PDF to Image conversion will be added soon!");
});

document.getElementById("remove-bg").addEventListener("click", function() {
    alert("Background removal will be added soon!");
});
