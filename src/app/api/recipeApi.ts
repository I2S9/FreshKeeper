import axios from 'axios';

const API_KEY = 'cf87dee2510f46b2b55456d95a7b0b89 '; 
const BASE_URL = 'https://api.spoonacular.com/recipes';

interface Recipe {
  id: number;
  title: string;
  sourceUrl: string;
}

export const fetchRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  try {
      const response = await axios.get(BASE_URL, {
          params: {
              ingredients: ingredients.join(','),
              number: 5,
              apiKey: API_KEY,
          },
      });

      console.log('API Response:', response.data);

      return response.data.map((recipe: any) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          sourceUrl: recipe.sourceUrl,
      }));
  } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
  }
};
