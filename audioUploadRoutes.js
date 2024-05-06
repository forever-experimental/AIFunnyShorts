import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up storage engine with Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');  // Destination folder
    },
    filename: function(req, file, cb) {
        // Rename the file to ensure it always has the .mp3 extension
        cb(null, `audio-${Date.now()}.mp3`);
    }
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/', upload.single('file'), (req, res) => {
    console.log('Received file:', req.file);
    res.json({
        message: 'File uploaded successfully',
        filePath: `/uploads/${req.file.filename}`
    });
});

export default router;
