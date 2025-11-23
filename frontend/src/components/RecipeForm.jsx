'use client';
import React, { useState, useEffect } from "react";

export default function RecipeForm({ initialData = null, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [temp, setTemp] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", miseenplace: "" }
  ]);
  const [steps, setSteps] = useState([""]);
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  // Load initial values when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setServings(initialData.servings || "");
      setPrepTime(initialData.prepTime || "");
      setCookTime(initialData.cookTime || "");
      setTemp(initialData.temp || "");
      setIngredients(initialData.ingredients || [
        { name: "", amount: "", miseenplace: "" }
      ]);
      setSteps(initialData.steps || [""]);
      setTags(initialData.tags || "");
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

  // ------------------------
  //   INGREDIENT HANDLERS
  // ------------------------
  function handleIngredientChange(index, field, value) {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  }

  function addIngredient() {
    setIngredients([...ingredients, { name: "", amount: "", miseenplace: "" }]);
  }

  function removeIngredient(index) {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated.length ? updated : [{ name: "", amount: "", miseenplace: "" }]);
  }

  // ------------------------
  //   INSTRUCTION HANDLERS
  // ------------------------
  function handleStepChange(index, value) {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  }

  function addStep() {
    setSteps([...steps, ""]);
  }

  function removeStep(index) {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated.length ? updated : [""]);
  }

  // ------------------------
  //   SUBMIT
  // ------------------------
  function handleSubmit(e) {
    e.preventDefault();

    const cleanedIngredients = ingredients.filter(
      ing => ing.name.trim() !== "" || ing.amount.trim() !== "" || ing.miseenplace.trim() !== ""
    );

    const cleanedSteps = steps.filter(step => step.trim() !== "");

    // const cleanedTags = tags.split(',');

    const recipe = {
      ...initialData,
      title,
      description,
      servings,
      prepTime,
      cookTime,
      temp,
      ingredients: cleanedIngredients,
      steps: cleanedSteps,
      tags,
      image,
    };
    console.log(recipe);

    onSave(recipe);

    if (!initialData) {
      setTitle("");
      setDescription("");
      setServings("");
      setPrepTime("");
      setCookTime("");
      setTemp("");
      setIngredients([{ name: "", amount: "", miseenplace: "" }]);
      setSteps([""]);
      setTags("");
      setImage(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>{initialData ? "Update Recipe" : "Add a Recipe"}</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* DESCRIPTION */}
      <label>Description</label>
      <input
        value={description}
        onChange={(e) => setTitle(e.target.value)}
      />
    <label>Info</label>
    <div className="row">
        <input
            placeholder="Servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
        />
        <input
            placeholder="Prep Time"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
        />
        <input
            placeholder="Cook Time"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
        />
        <input
            placeholder="Oven Temp"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
        />
    </div>

      {/* INGREDIENTS */}
      <label>Ingredients</label>
      {ingredients.map((ing, index) => (
        <div className="row" key={index}>
          <input
            placeholder="Name"
            value={ing.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
            required
          />

          <input
            placeholder="Amount"
            value={ing.amount}
            onChange={(e) =>
              handleIngredientChange(index, "amount", e.target.value)
            }
            required
          />

          <input
            placeholder="Mise en Place"
            value={ing.miseenplace}
            onChange={(e) =>
              handleIngredientChange(index, "miseenplace", e.target.value)
            }
          />

          <button type="button" onClick={() => removeIngredient(index)}>
            -
          </button>
        </div>
      ))}

      <button type="button" onClick={addIngredient} className="add-btn">
        + Add Ingredient
      </button>

      {/* INSTRUCTIONS */}
      <label>Steps</label>
      {steps.map((step, index) => (
        <div className="row" key={index}>
          <textarea
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            required
          />

          <button type="button" onClick={() => removeStep(index)}>
            -
          </button>
        </div>
      ))}

      <button type="button" onClick={addStep} className="add-btn">
        + Add Step
      </button>

      {/* TAGS */}
      <label>Tags</label>
      <input
        placeholder="Separated by commas"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* IMAGE */}
      <label>Dish Photo</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} className="image-preview" />}

      <button type="submit">
        {initialData ? "Update Recipe" : "Save Recipe"}
      </button>
    </form>
  );
}
