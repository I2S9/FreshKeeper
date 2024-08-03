import axios from 'axios';

const API_KEY = 'cf87dee2510f46b2b55456d95a7b0b89 '; 
const BASE_URL = 'https://api.spoonacular.com/recipes';

interface Recipe {
  id: number;
  title: string;
  sourceUrl: string;
}

export const fetchRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  const url = `${BASE_URL}/findByIngredients?ingredients=${ingredients.join(',')}&number=5&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
