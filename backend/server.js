import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import recipesRouter from "./routes/recipes.js";

dotenv.config();

const app = express();
app.use(cors());

// Note: we don't use express.json() for multipart/form-data endpoints with files,
// but it's still useful for routes that accept JSON (other endpoints).
app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Mount API routes
app.use('/api/recipes', recipesRouter);

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/recipesdb';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });