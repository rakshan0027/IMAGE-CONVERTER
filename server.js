const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setup file upload
const upload = multer({ dest: "uploads/" });

// MP4 to MP3 conversion
app.post("/convert-mp4-to-mp3", upload.single("video"), (req, res) => {
    const inputPath = req.file.path;
    const outputPath = `uploads/${req.file.filename}.mp3`;

    exec(`ffmpeg -i ${inputPath} -q:a 0 -map a ${outputPath}`, (error) => {
        if (error) {
            return res.status(500).json({ error: "Conversion failed" });
        }
        res.json({ downloadUrl: `https://your-backend-url.onrender.com/download/${req.file.filename}.mp3` });
    });
});

// Serve converted files
app.get("/download/:filename", (req, res) => {
    const filePath = `uploads/${req.params.filename}`;
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
