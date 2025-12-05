import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetails from '../components/RecipeDetails';
import Loader from '../components/Loader';
import { searchRecipes } from '../api/recipeApi';

const FAVORITES_KEY = 'rf_favorites_v1';

const Home = () => {
    const [queryParams, setQueryParams] = useState({ query: '', mealType: '', diet: '' });
    const [recipes, setRecipes] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(0);

    const [favorites, setFavorites] = useState(() => {
        try {
            const raw = localStorage.getItem(FAVORITES_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (id) => favorites.some((f) => f.id === id);
    const toggleFavorite = (recipe) => {
        setFavorites((prev) => {
            if (prev.some((f) => f.id === recipe.id)) {
                return prev.filter((f) => f.id !== recipe.id);
            }
            return [...prev, recipe];
        });
    };

    const onSearch = async (params) => {
        setQueryParams(params);
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { query, mealType, diet } = queryParams;
            if (!query) { setRecipes([]); setTotalResults(0); return; }
            setLoading(true);
            setError('');
            try {
                const { results, totalResults } = await searchRecipes({ query, mealType, diet, number: 20, offset: page * 20 });
                setRecipes(results);
                setTotalResults(totalResults);
            } catch (err) {
                setError('Failed to fetch recipes. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [queryParams, page]);

    const canPrev = page > 0;
    const canNext = (page + 1) * 20 < totalResults;

    const headerSummary = useMemo(() => {
        if (!queryParams.query) return 'Start by searching for recipes';
        return `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${queryParams.query}"`;
    }, [queryParams, totalResults]);

    return (
        <div>
            <SearchBar onSearch={onSearch} />

            <div style={{ marginTop: 16, marginBottom: 8 }}>
                <span className="pill" style={{ background: '#fff' }}>{headerSummary}</span>
            </div>

            {loading && <Loader />}
            {error && (
                <div className="pill" style={{ background: '#fff', margin: '12px 0' }}>{error}</div>
            )}

            {!loading && !error && (
                <div className="grid">
                    {recipes.map((r) => (
                        <RecipeCard
                            key={r.id}
                            recipe={r}
                            isFavorite={isFavorite(r.id)}
                            onToggleFavorite={toggleFavorite}
                            onClick={setSelected}
                        />
                    ))}
                </div>
            )}

            {!loading && !!recipes.length && (
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                    <button disabled={!canPrev} onClick={() => setPage((p) => Math.max(0, p - 1))}>Prev</button>
                    <button disabled={!canNext} onClick={() => setPage((p) => p + 1)}>Next</button>
                </div>
            )}

            {selected && (
                <RecipeDetails recipe={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    );
};

export default Home;
