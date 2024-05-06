import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Set up storage engine with Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'server/edit/audio/');  // Destination folder
    },
    filename: function(req, file, cb) {
        // Rename the file to ensure it always has the .mp3 extension
        cb(null, `${Date.now()}.mp3`);
    }
});
const upload = multer({ storage: storage });


// Route to handle file upload and video editing
router.post('/', upload.single('file'), (req, res) => {
    const editedVideoPath = editVideo(req.file.path);
    res.json({ filePath: `/video.mp4` });
});


function editVideo(audioPath) {
    console.log(`Editing video using audio from: ${audioPath}`);
    // For now, just pass the path of a static video file
    return path.resolve('/video.mp4');
}


export default router;
