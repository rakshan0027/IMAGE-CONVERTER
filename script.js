function convertImage() {
    let input = document.getElementById("imageInput").files[0];
    let format = document.getElementById("formatSelect").value;

    if (!input) {
        alert("Please select an image first!");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function (e) {
        let img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let newImage = canvas.toDataURL("image/" + format);
            let link = document.getElementById("downloadLink");
            link.href = newImage;
            link.download = "converted_image." + format;
            link.style.display = "block";
            link.innerText = "Download " + format.toUpperCase() + " Image";
        };
    };
}
