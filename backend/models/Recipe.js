const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
  miseenplace: String,
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [IngredientSchema], // [{ name, amount }]
  steps: [String],
  prepTime: String,
  cookTime: String,
  servings: Number,
  temp: String,
  tags: [String],
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', RecipeSchema);