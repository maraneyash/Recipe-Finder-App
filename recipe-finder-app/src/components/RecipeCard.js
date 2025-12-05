import React from 'react';

const RecipeCard = ({ recipe, onClick, onToggleFavorite, isFavorite }) => {
    const { title, image, calories, mealTypeLabel } = recipe;

    return (
        <div className="card" onClick={() => onClick?.(recipe)} role="button" tabIndex={0}>
            {image && <img src={image} alt={title} />}
            <div className="card-body">
                <div className="card-title">{title}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="pill">{mealTypeLabel || 'Recipe'}</span>
                    {typeof calories === 'number' && <span style={{ fontSize: 12 }}>{Math.round(calories)} cal</span>}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button type="button" onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(recipe); }}>
                        {isFavorite ? '★ Favorited' : '☆ Favorite'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
