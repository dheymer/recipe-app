import React from 'react';
import { API_ROOT } from '../api';

export default function RecipeCard({ recipe, onEdit, onDelete }) {
  const imageUrl = recipe.imageUrl
    ? (recipe.imageUrl.startsWith('http') ? recipe.imageUrl : `${API_ROOT}${recipe.imageUrl}`)
    : null;

  return (
    <article className="card">
      {imageUrl && <img src={imageUrl} alt={recipe.title} className="recipe-image" />}

      <h3>{recipe.title}</h3>
      {recipe.description && <p className="muted">{recipe.description}</p>}

      <div>
        <strong>Ingredients</strong>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((ing, i) => (
            <li key={i}>{(ing.amount ? ing.amount + ' ' : '')} {ing.name}{(ing.miseenplace ? ', ' + ing.miseenplace : '')}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Steps</strong>
        <ol>
          {recipe.steps && recipe.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>

      <p className="meta">
        {recipe.servings ? `Servings: ${recipe.servings}` : ''} {recipe.prepTime ? `• Prep ${recipe.prepTime}` : ''} {recipe.cookTime ? `• Cook ${recipe.cookTime}` : ''}
        {recipe.temp ? ` • Oven ${recipe.temp}` : ''}
      </p>
      <p className="meta">
        {recipe.tags && recipe.tags.map((tag, i) => (
            <span className='tag-pill' key={i}>{tag}</span>
        ))}
      </p>

      <div className="card-actions">
        {onEdit && <button onClick={() => onEdit(recipe)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(recipe._id)}>Delete</button>}
      </div>
    </article>
  );
}