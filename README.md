# Recipe App

A complete recipe application built with **React (Vite)** for the frontend and **Node + Express + MongoDB** for the backend. Includes full CRUD for recipes, ingredient and step management, and a clean architecture ready for future features like authentication, image uploads, and filtering.

---

## 🚀 Technologies Used

### **Frontend**

* React 18
* Vite
* Fetch API
* Simple CSS (no frameworks)

### **Backend**

* Node.js
* Express
* MongoDB + Mongoose
* Dotenv
* CORS
* Nodemon (development)

---

## 📁 Project Structure

```
recipe-app/
├─ backend/
│  ├─ server.js
│  ├─ models/
│  ├─ routes/
│  ├─ .env.example
│  ├─ seed.js
│  └─ package.json
└─ frontend/
   ├─ src/
   ├─ public/
   ├─ .env
   └─ package.json
```

---

## 🟦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-user/recipe-app.git
cd recipe-app
```

---

# 🟧 Backend (Node + Express)

### 2️⃣ Install dependencies

```bash
cd backend
npm install
```

### 3️⃣ Create the `.env` file

Based on `.env.example`:

```
MONGO_URI=mongodb://localhost:27017/recipesdb
PORT=4000
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Backend will run at:

```
http://localhost:4000
```

### 5️⃣ (Optional) Seed the database

```bash
npm run seed
```

---

# 🟩 Frontend (React + Vite)

### 1️⃣ Install dependencies

```bash
cd ../frontend
npm install
```

### 2️⃣ Create the `.env` file

```
VITE_API_BASE=http://localhost:4000/api
```

### 3️⃣ Run development server

```bash
npm run dev
```

Frontend available at:

```
http://localhost:5173
```

---

# 📡 Backend API Endpoints

### `GET /api/recipes`

Fetch all recipes.

### `GET /api/recipes/:id`

Fetch a recipe by ID.

### `POST /api/recipes`

Create a new recipe.

### `PUT /api/recipes/:id`

Update an existing recipe.

### `DELETE /api/recipes/:id`

Delete a recipe.

---

# 🧱 Recipe Model Structure

```js
{
  title: String,
  description: String,
  ingredients: [ { name: String, amount: String } ],
  steps: [String],
  prepTime: String,
  cookTime: String,
  servings: Number,
  tags: [String],
  imageUrl: String,
  createdAt: Date
}
```

---

# 🎨 Frontend Features

* Dynamic recipe creation form
* Recipe grid list
* Clean card-style preview
* Automatic refresh after creating a recipe

---

# 🧭 Useful Scripts

### Backend

```bash
npm run dev   # development
npm start     # production
npm run seed  # insert demo data
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

---

# 🧪 Future Improvements

* Authentication (JWT)
* Image uploads (Cloudinary / S3)
* Favorites & ratings
* Tag filtering and search
* UI with Tailwind or Material UI
* Testing (Vitest / Jest)

---

# 📝 License

MIT — feel free to modify and expand.

---

# 🖤 Author

Project built by **Dheymer León** and **Lía Lunaris** ✨
