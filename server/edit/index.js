import express from 'express';
import multer from 'multer';
import {main} from './main.js';

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
    main(req.file.path);
    res.json({ filePath: `/video.mp4` });
});


export default router;
