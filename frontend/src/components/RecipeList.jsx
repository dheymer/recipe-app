import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) return <p>No hay recetas aún.</p>;
  return (
    <div className="grid">
      {recipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
    </div>
  );
}