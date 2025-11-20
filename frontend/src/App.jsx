import React, { useEffect, useState } from 'react';
import { fetchRecipes, createRecipe, updateRecipe } from './api';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (e) {
      console.error(e);
      alert('No se pudieron cargar recetas');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(recipe) {
    try {
      const created = await createRecipe(recipe);
      setRecipes(prev => [created, ...prev]);
    } catch (e) {
      console.error(e);
      alert('Error creando receta');
    }
  }

  function handleEdit(recipe) {
    setEditingRecipe(recipe); // load recipe into form
  }

  async function handleSave(updated) {
    if (updated.id) {
      // update existing recipe
      updateRecipe(updated);
    } else {
      // create new recipe
      try {
        const created = await createRecipe(updated);
        setRecipes(prev => [created, ...prev]);
      } catch (e) {
        console.error(e);
        alert('Error creando receta');
      }
    }
    setEditingRecipe(null);
  }

  return (
    <div className="container">
      <header>
        <h1>Recetario de Meme</h1>
      </header>

      <section className="form-section">
        <h2>Crear receta</h2>
        <RecipeForm initialData={editingRecipe} onSave={handleSave}/>
      </section>

      <section>
        <h2>Recetas</h2>
        {loading ? <p>Cargando...</p> : <RecipeList recipes={recipes} onEdit={handleEdit}/>}
      </section>
    </div>
  );
}
