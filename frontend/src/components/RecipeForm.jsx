import React, { useState } from 'react';

function blankIngredient() { return { name: '', amount: '', miseenplace: '' }; }

export default function RecipeForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([blankIngredient()]);
  const [steps, setSteps] = useState(['']);
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState('');

  function updateIngredient(i, field, value) {
    const copy = [...ingredients];
    copy[i][field] = value;
    setIngredients(copy);
  }

  function addIngredient() {
    setIngredients(prev => [...prev, blankIngredient()]);
  }

  function updateStep(i, value) {
    const copy = [...steps];
    copy[i] = value;
    setSteps(copy);
  }

  function addStep() {
    setSteps(prev => [...prev, '']);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title, description,
      ingredients: ingredients.filter(it => it.name.trim() !== ''),
      steps: steps.filter(s => s.trim() !== ''),
      servings,
      prepTime
    };
    await onCreate(payload);
    // limpiar
    setTitle(''); setDescription(''); setIngredients([blankIngredient()]); setSteps(['']); setServings(2); setPrepTime('');
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <label>Título
        <input value={title} onChange={e=>setTitle(e.target.value)} required />
      </label>

      <label>Descripción
        <input value={description} onChange={e=>setDescription(e.target.value)} />
      </label>

      <fieldset>
        <legend>Ingredientes</legend>
        {ingredients.map((ing, i) => (
          <div key={i} className="row">
            <input placeholder="Cantidad (ej. 400 g)" value={ing.amount} onChange={e=>updateIngredient(i,'amount',e.target.value)} />
            <input placeholder="Nombre (ej. Lomo de res)" value={ing.name} onChange={e=>updateIngredient(i,'name',e.target.value)} />
            <input placeholder="Mise en place (ej. Cortado en tiras)" value={ing.miseenplace} onChange={e=>updateIngredient(i,'miseenplace',e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Añadir ingrediente</button>
      </fieldset>

      <fieldset>
        <legend>Pasos</legend>
        {steps.map((s,i) => (
          <div key={i} className="row">
            <textarea placeholder={`Paso ${i+1}`} value={s} onChange={e=>updateStep(i,e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addStep}>Añadir paso</button>
      </fieldset>

      <label>Porciones
        <input type="number" min="1" value={servings} onChange={e=>setServings(Number(e.target.value))} />
      </label>

      <label>Tiempo de preparación
        <input value={prepTime} onChange={e=>setPrepTime(e.target.value)} placeholder="20 min" />
      </label>

      <button type="submit">Crear receta</button>
    </form>
  );
}