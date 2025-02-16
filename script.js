<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Image Converter</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4625351312268360"
        crossorigin="anonymous"></script>
</head>

<body>
    <header>
        <h1>AI Image Converter</h1>
        <nav>
            <ul>
                <li><a href="#imageConverter">Image Converter</a></li>
                <li><a href="#pdfConverter">PDF Converter</a></li>
                <li><a href="#removeBG">Remove Background</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="imageConverter" class="tool-section">
            <h2>Image Converter</h2>
            <input type="file" id="imageInput">
            <select id="formatSelect">
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
            </select>
            <button id="convertBtn">Convert</button>
            <div id="progressBarContainer" style="display:none;">
                <progress id="progressBar" value="0" max="100"></progress>
                <p id="progressText">Processing...</p>
            </div>
            <a id="downloadLink" class="download-btn" style="display:none;">Download Converted Image</a>
        </section>

        <section id="pdfConverter" class="tool-section">
            <h2>PDF Converter</h2>
            <input type="file" id="pdfImageInput">
            <button id="convertToPDF">Convert to PDF</button>
        </section>

        <section id="removeBG" class="tool-section">
            <h2>Remove Background</h2>
            <input type="file" id="removeBgInput">
            <button id="removeBackground">Remove Background</button>
            <button id="buyPremium">Buy Premium</button>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 AI Image Converter</p>
    </footer>

    <script src="script.js"></script>
</body>

</html>
