import express from 'express';
import audioUploadRouter from './audioUploadRoutes.js';

const app = express();
const PORT = 6969;

app.use(express.static('docs'));
app.use('/upload-audio', audioUploadRouter);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
