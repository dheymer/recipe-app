import React, { useEffect, useState } from 'react';
import { fetchRecipes, createRecipe } from './api';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container">
      <header>
        <h1>Recetario de Meme</h1>
      </header>

      <section className="form-section">
        <h2>Crear receta</h2>
        <RecipeForm onCreate={handleCreate} />
      </section>

      <section>
        <h2>Recetas</h2>
        {loading ? <p>Cargando...</p> : <RecipeList recipes={recipes} />}
      </section>
    </div>
  );
}
