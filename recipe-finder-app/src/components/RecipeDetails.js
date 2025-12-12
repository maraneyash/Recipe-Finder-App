import React from 'react';

const RecipeDetails = ({ recipe, onClose }) => {
    if (!recipe) return null;
    const { title, image, instructions, analyzedInstructions = [], summary, sourceUrl, extendedIngredients = [], nutrition = {} } = recipe;
    const nutrients = nutrition?.nutrients || [];
    const steps = Array.isArray(analyzedInstructions) && analyzedInstructions.length
        ? (analyzedInstructions[0]?.steps || [])
        : [];

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                style={{ marginTop: 72, marginBottom: 24, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
            >
                <div className="modal-header">
                    <h3 style={{ margin: 0 }}>{title}</h3>
                    <button onClick={onClose}>Close</button>
                </div>
                {image && <img src={image} alt={title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
                <div className="modal-body">
                    <h4>Ingredients</h4>
                    <ul>
                        {extendedIngredients.map((ing) => (
                            <li key={ing.id || ing.name}>{ing.original || ing.name}</li>
                        ))}
                    </ul>

                    {(steps.length > 0 || instructions || summary || sourceUrl) && (
                        <>
                            <h4>Instructions</h4>
                            {steps.length > 0 ? (
                                <ol>
                                    {steps.map((s) => (
                                        <li key={s.number}>{s.step}</li>
                                    ))}
                                </ol>
                            ) : instructions ? (
                                <div dangerouslySetInnerHTML={{ __html: instructions }} />
                            ) : summary ? (
                                <div dangerouslySetInnerHTML={{ __html: summary }} />
                            ) : (
                                sourceUrl && (
                                    <a href={sourceUrl} target="_blank" rel="noreferrer">View full recipe</a>
                                )
                            )}
                        </>
                    )}

                    {!!nutrients.length && (
                        <>
                            <h4>Nutrition</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                                {nutrients.slice(0, 8).map((n, idx) => (
                                    <div key={`${n.name}-${idx}`} className="pill" style={{ background: '#fff' }}>
                                        {n.name}: {Math.round(n.amount)} {n.unit}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;