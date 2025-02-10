function convertImage() {
    const fileInput = document.getElementById('imageInput');
    const format = document.getElementById('formatSelect').value;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }

    const file = fileInput.files[0];
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(event) {
        img.src = event.target.result;
    };

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let convertedImage = canvas.toDataURL(`image/${format}`);
        downloadLink.href = convertedImage;
        downloadLink.download = `converted-image.${format}`;
        downloadLink.innerText = "Download Converted Image";
        downloadLink.style.display = "block";
    };

    reader.readAsDataURL(file);
}
