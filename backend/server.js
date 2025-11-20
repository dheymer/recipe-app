require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipesdb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/recipes', recipesRouter);

app.get('/', (req, res) => res.send('Recipe API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));