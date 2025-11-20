const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const r = await Recipe.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Recipe not found' });
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedRecipe = req.body;

  const idx = recipes.findIndex((r) => r.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  recipes[idx] = updatedRecipe;
  res.json(updatedRecipe);
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Recipe.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;