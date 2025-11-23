const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
const API_ROOT = API_BASE.replace(/\/api\/?$/, '') || 'http://localhost:4000';

export async function fetchRecipes() {
  const res = await fetch(`${API_BASE}/recipes`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function fetchRecipeById(id) {
  const res = await fetch(`${API_BASE}/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
}

/**
 * recipeObj: plain object with fields (title, description, ingredients (array), instructions (array), prepTime, cookTime, ovenTemp, servings, tags)
 * imageFile: optional File object
 */
export async function createRecipeOnServer(recipeObj, imageFile = null) {
  const formData = new FormData();
  for (const key in recipeObj) {
    if (Array.isArray(recipeObj[key]) || typeof recipeObj[key] === 'object') {
      formData.append(key, JSON.stringify(recipeObj[key]));
    } else if (recipeObj[key] !== undefined && recipeObj[key] !== null) {
      formData.append(key, String(recipeObj[key]));
    }
  }
  if (imageFile) formData.append('image', imageFile);

  const res = await fetch(`${API_BASE}/recipes`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Failed to create recipe');
  return res.json();
}

/**
 * id: recipe id
 * recipeObj: same shape as create
 * imageFile: optional File to replace existing image
 */
export async function updateRecipeOnServer(id, recipeObj, imageFile = null) {
  const formData = new FormData();
  for (const key in recipeObj) {
    if (Array.isArray(recipeObj[key]) || typeof recipeObj[key] === 'object') {
      formData.append(key, JSON.stringify(recipeObj[key]));
    } else if (recipeObj[key] !== undefined && recipeObj[key] !== null) {
      formData.append(key, String(recipeObj[key]));
    }
  }
  if (imageFile) formData.append('image', imageFile);

  const res = await fetch(`${API_BASE}/recipes/${id}`, {
    method: 'PUT',
    body: formData
  });

  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
}

export async function deleteRecipeOnServer(id) {
  const res = await fetch(`${API_BASE}/recipes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
  return res.json();
}

export { API_ROOT, API_BASE };