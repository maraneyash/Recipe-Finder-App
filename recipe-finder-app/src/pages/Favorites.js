import React, { useMemo, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeDetails from '../components/RecipeDetails';

const FAVORITES_KEY = 'rf_favorites_v1';

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const raw = localStorage.getItem(FAVORITES_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });
    const [selected, setSelected] = useState(null);

    const empty = useMemo(() => favorites.length === 0, [favorites]);

    const toggleFavorite = (recipe) => {
        setFavorites((prev) => {
            const next = prev.filter((f) => f.id !== recipe.id);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
            return next;
        });
    };

    return (
        <div>
            <h2>Favorites</h2>
            {empty ? (
                <div className="pill" style={{ background: '#fff' }}>No favorites yet.</div>
            ) : (
                <div className="grid">
                    {favorites.map((r) => (
                        <RecipeCard
                            key={r.id}
                            recipe={r}
                            isFavorite={true}
                            onToggleFavorite={toggleFavorite}
                            onClick={setSelected}
                        />
                    ))}
                </div>
            )}

            {selected && (
                <RecipeDetails recipe={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    );
};

export default Favorites;
