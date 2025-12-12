import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.spoonacular.com',
    params: { apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY },
});

// Normalize API response into our card-friendly shape
const normalizeRecipe = (r) => ({
    id: r.id,
    title: r.title,
    image: r.image,
    calories: r.nutrition?.nutrients?.find?.((n) => n.name === 'Calories')?.amount,
    mealTypeLabel: Array.isArray(r.dishTypes) && r.dishTypes.length ? r.dishTypes[0] : undefined,
    instructions: r.instructions,
    analyzedInstructions: r.analyzedInstructions,
    summary: r.summary,
    sourceUrl: r.sourceUrl,
    extendedIngredients: r.extendedIngredients,
    nutrition: r.nutrition,
});

// Search by query with optional filters
export async function searchRecipes({ query, mealType, diet, number = 20, offset = 0 }) {
    // Using complexSearch for robust filtering and addRecipeInformation for details
    const { data } = await api.get('/recipes/complexSearch', {
        params: {
            query,
            type: mealType || undefined,
            diet: diet || undefined,
            number,
            offset,
            addRecipeInformation: true,
            instructionsRequired: true,
            fillIngredients: true,
            addRecipeNutrition: true,
        },
    });

    const results = Array.isArray(data.results) ? data.results.map(normalizeRecipe) : [];
    return { results, totalResults: data.totalResults || results.length };
}

export async function getRecipeById(id) {
    const { data } = await api.get(`/recipes/${id}/information`, {
        params: { includeNutrition: true },
    });
    return normalizeRecipe(data);
}