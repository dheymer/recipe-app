'use client';
import React, { useEffect, useState } from 'react';
import { createRecipeOnServer, updateRecipeOnServer } from '../api';

export default function RecipeForm({ initialData = null, onSaved }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', miseenplace: '' }]);
  const [steps, setSteps] = useState(['']);
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [temp, setTemp] = useState('');
  const [servings, setServings] = useState(1);
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState(null); // File
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // local preview

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setIngredients(initialData.ingredients && initialData.ingredients.length ? initialData.ingredients : [{ name: '', amount: '', miseenplace: '' }]);
      setSteps(initialData.steps && initialData.steps.length ? initialData.steps : ['']);
      setPrepTime(initialData.prepTime || '');
      setCookTime(initialData.cookTime || '');
      setTemp(initialData.temp || '');
      setServings(initialData.servings || 1);
      setTags((initialData.tags || []).join(', '));
      setImageFile(null);
      setImagePreviewUrl(initialData.imageUrl ? initialData.imageUrl : null); // if editing and has image path, show it
    } else {
      // reset when creating new
      setTitle('');
      setDescription('');
      setIngredients([{ name: '', amount: '', miseenplace: '' }]);
      setSteps(['']);
      setPrepTime('');
      setCookTime('');
      setTemp('');
      setServings(1);
      setTags('');
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  }, [initialData]);

  // image input change
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  }

  // Ingredients handlers
  function handleIngredientChange(index, field, value) {
    const copy = [...ingredients];
    copy[index] = { ...copy[index], [field]: value };
    setIngredients(copy);
  }
  function addIngredient() { setIngredients([...ingredients, { name: '', amount: '', miseenplace: '' }]); }
  function removeIngredient(index) {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated.length ? updated : [{ name: '', amount: '', miseenplace: '' }]);
  }

  // Instructions handlers
  function handleInstructionChange(index, value) {
    const copy = [...steps];
    copy[index] = value;
    setSteps(copy);
  }
  function addInstruction() { setSteps([...steps, '']); }
  function removeInstruction(index) {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated.length ? updated : ['']);
  }

  // Submit
  async function handleSubmit(e) {
    e.preventDefault();

    const cleanedIngredients = ingredients.filter(ing => (ing.name || ing.amount || ing.miseenplace));
    const cleanedInstructions = steps.filter(s => s && s.trim() !== '');
    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      title,
      description,
      ingredients: cleanedIngredients,
      steps: cleanedInstructions,
      prepTime,
      cookTime,
      temp,
      servings,
      tags: tagsArray
    };

    try {
      let saved;
      if (initialData && initialData._id) {
        saved = await updateRecipeOnServer(initialData._id, payload, imageFile);
      } else {
        saved = await createRecipeOnServer(payload, imageFile);
      }
      if (onSaved) onSaved(saved);
    } catch (err) {
      console.error(err);
      alert('Error saving recipe');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>{initialData ? 'Edit recipe' : 'Create recipe'}</h2>

      <label>Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} required />

      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Ingredients</label>
      {ingredients.map((ing, i) => (
        <div className="row" key={i}>
          <input placeholder="Name" value={ing.name} onChange={e => handleIngredientChange(i, 'name', e.target.value)} />
          <input placeholder="Amount" value={ing.amount} onChange={e => handleIngredientChange(i, 'amount', e.target.value)} />
          <input placeholder="Mise en Place" value={ing.miseenplace} onChange={e => handleIngredientChange(i, 'miseenplace', e.target.value)} />
          <button type="button" onClick={() => removeIngredient(i)}>-</button>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={addIngredient}>+ Add ingredient</button>

      <label>Steps</label>
      {steps.map((step, i) => (
        <div className="row" key={i}>
          <textarea placeholder={`Step ${i+1}`} value={step} onChange={e => handleInstructionChange(i, e.target.value)} />
          <button type="button" onClick={() => removeInstruction(i)}>-</button>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={addInstruction}>+ Add step</button>

      <div className="two-columns">
        <div>
          <label>Prep time</label>
          <input value={prepTime} onChange={e => setPrepTime(e.target.value)} placeholder="20 min" />
        </div>
        <div>
          <label>Cook time</label>
          <input value={cookTime} onChange={e => setCookTime(e.target.value)} placeholder="40 min" />
        </div>
      </div>

      <div className="two-columns">
        <div>
          <label>Oven temp</label>
          <input value={temp} onChange={e => setTemp(e.target.value)} placeholder="180°C" />
        </div>
        <div>
          <label>Servings</label>
          <input type="number" min="1" value={servings} onChange={e => setServings(Number(e.target.value))} />
        </div>
      </div>

      <label>Tags (comma separated)</label>
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="italian, pasta" />

      <label>Dish photo</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="preview" className="image-preview" />}

      <button type="submit">{initialData ? 'Update recipe' : 'Create recipe'}</button>
    </form>
  );
}
