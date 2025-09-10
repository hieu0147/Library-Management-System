import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';
import app from './app';

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
}); 