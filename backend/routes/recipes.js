const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const Recipe = require('../models/Recipe');
const { upload } = require('../middleware/upload');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET recipe by id
router.get('/:id', async (req, res) => {
  try {
    const r = await Recipe.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Recipe not found' });
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create recipe (with optional image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const body = req.body || {};

    // Parse arrays that were sent as JSON strings
    const ingredients = body.ingredients ? JSON.parse(body.ingredients) : [];
    const steps = body.steps ? JSON.parse(body.steps) : [];

    const recipeData = {
      title: body.title,
      description: body.description,
      ingredients,
      steps,
      prepTime: body.prepTime,
      cookTime: body.cookTime,
      temp: body.temp,
      servings: body.servings ? Number(body.servings) : undefined,
      tags: body.tags ? JSON.parse(body.tags) : [],
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };

    const newRecipe = new Recipe(recipeData);
    const saved = await newRecipe.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating recipe' });
  }
});

// PUT update recipe (with optional image)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const body = req.body || {};
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    // Parse arrays if provided
    const ingredients = body.ingredients ? JSON.parse(body.ingredients) : recipe.ingredients;
    const steps = body.steps ? JSON.parse(body.steps) : recipe.steps;
    const tags = body.tags ? JSON.parse(body.tags) : recipe.tags;

    const updateData = {
      title: body.title ?? recipe.title,
      description: body.description ?? recipe.description,
      ingredients,
      steps,
      prepTime: body.prepTime ?? recipe.prepTime,
      cookTime: body.cookTime ?? recipe.cookTime,
      temp: body.temp ?? recipe.temp,
      servings: body.servings ? Number(body.servings) : recipe.servings,
      tags
    };

    // If new file is uploaded, delete old file from disk (if existed) and set new image path
    if (req.file) {
      if (recipe.imageUrl) {
        const existingPath = path.join(process.cwd(), recipe.imageUrl);
        if (fs.existsSync(existingPath)) {
          fs.unlink(existingPath, (err) => {
            if (err) console.warn('Failed to delete old image', err);
          });
        }
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Recipe.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating recipe' });
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    // delete image file if exists
    if (recipe.imageUrl) {
      const p = path.join(process.cwd(), recipe.imageUrl);
      if (fs.existsSync(p)) {
        fs.unlink(p, (err) => {
          if (err) console.warn('Failed to delete image after deletion', err);
        });
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting recipe' });
  }
});

module.exports = router;