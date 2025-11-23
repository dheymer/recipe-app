require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipesdb';

const sample = [
  {
    title: 'Ceviche de lomo con mango',
    description: 'Ceviche especial...',
    ingredients: [
        { name: 'Lomo', amount: '400 g', miseenplace: 'cortado en tiras' }, 
        { name: 'Mango', amount: '1 mediano', miseenplace: 'cortado en macedonia' },
        { name: 'Lima', amount: '4 unidades', miseenplace: 'el jugo' },
        { name: 'Cebolla morada', amount: '1 pequeña', miseenplace: 'cortado en julianas' },
        { name: 'Ají amarillo', amount: '1 unidad', miseenplace: 'cortado en julianas' },
        { name: 'Cilantro', amount: '50 g', miseenplace: 'cortado en chiffonade' }
    ],
    steps: ['Marinar el lomo', 'Cevichar el lomo','Servir con los vegetales', 'Acompañar con chips de batata, yuca, nachos o maíz cancha'],
    prepTime: '20 min',
    cookTime: '0',
    temp: 'N/A',
    servings: 2,
    tags: ['peruano', 'mar y monte'],
    imageUrl: ''
  },
  {
    title: 'Carbonara clásica',
    description: 'Pasta carbonara al estilo romano.',
    ingredients: [
        { name: 'Pasta', amount: '200 g' }, 
        { name: 'Guanciale', amount: '100 g', miseenplace: 'cortado en cubos pequeños' }, 
        { name: 'huevos', amount: '1 grande', miseenplace: 'batido' }, 
        { name: 'Queso Pecorino Romano', amount: '50 g', miseenplace: 'rallado' }, 
        { name: 'Pimienta negra', amount: '10 g', miseenplace: 'recién molida' }
    ],
    steps: ['Cocer pasta', 'Mezclar huevos, pimienta y queso', 'Saltear pasta con pancetta', 'Combinar todo con agua de la pasta'],
    prepTime: '10 min',
    cookTime: '10 min',
    temp: 'N/A',
    servings: 2,
    tags: ['italiana', 'pasta'],
    imageUrl: ''
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    await Recipe.deleteMany({});
    await Recipe.insertMany(sample);
    console.log('Seed completed');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));