import express from 'express';
import edit from './edit/index.js';

const app = express();
const PORT = 6969;

app.use(express.static('docs'));
app.use('/edit', edit);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
