const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function fetchRecipes() {
  const res = await fetch(`${BASE}/recipes`);
  if (!res.ok) throw new Error('Error fetching recipes');
  return res.json();
}

export async function createRecipe(data) {
  const res = await fetch(`${BASE}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creating recipe');
  return res.json();
}

export async function updateRecipe(recipe) {
  const res = await fetch(`${BASE}/recipes/${recipe._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!res.ok) {
    throw new Error("Failed to update recipe");
  }

  return await res.json();
}