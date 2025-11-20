'use client';
import React, { useState, useEffect } from "react";

export default function RecipeForm({ initialData = null, onSave }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
        let initialIngredients = "";
        initialData.ingredients?.forEach((item) => {
            initialIngredients += `${item.amount} de ${item.name}${(item.miseenplace)? ', ' + item.miseenplace : ''}. \n`;
        });
        setTitle(initialData.title || "");
        setIngredients(initialIngredients || "");
        setInstructions(initialData.steps || "");
        setImage(initialData.image || null);
    }
  }, [initialData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const recipe = {
      ...initialData, // keep ID when editing
      title,
      ingredients,
      instructions,
      image, // base64 or null
    };

    onSave(recipe);

    // reset only when creating, not editing
    if (!initialData) {
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>{initialData ? "Update Recipe" : "Add a Recipe"}</h2>

      <label>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Ingredients</label>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <label>Instructions</label>
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />

      <label>Dish Photo</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {image && <img src={image} className="image-preview" />}

      <button type="submit">
        {initialData ? "Update Recipe" : "Save Recipe"}
      </button>
    </form>
  );
}