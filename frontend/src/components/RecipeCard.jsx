import React from 'react';

export default function RecipeCard({ recipe, onEdit }) {
  return (
    <article className="card">
        {recipe.image && (
            <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
            />
        )}
        <h3>{recipe.title}</h3>
        {recipe.description && <p className="muted">{recipe.description}</p>}
        <div>
            <strong>Ingredientes:</strong>
            <ul>
                {recipe.ingredients?.map((ing, i) => <li key={i}>{ing.amount ? `${ing.amount} ` : ''}{ing.name}</li>)}
            </ul>
        </div>
        <div>
            <strong>Pasos:</strong>
            <ol>
                {recipe.steps?.map((s,i) => <li key={i}>{s}</li>)}
            </ol>
        </div>
        <button onClick={() => onEdit(recipe)}>Edit</button>
        <p className="meta">
            {recipe.servings ? `Porciones: ${recipe.servings}` : ''} {recipe.prepTime ? `• Prep ${recipe.prepTime}` : ''}
        </p>
    </article>
  );
}