import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDb from './config/db.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDb();

const __dirname = path.resolve()

const app = express();


app.use(express.json());
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/user/uploads', express.static(path.join(__dirname, '/uploads')), uploadRoutes);




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))