import React, { useState } from 'react';

const mealTypes = [
    { value: '', label: 'Any Meal' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
];

const dietTypes = [
    { value: '', label: 'Any Diet' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'gluten free', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
];

const SearchBar = ({ onSearch, initialQuery = '', initialMealType = '', initialDiet = '' }) => {
    const [query, setQuery] = useState(initialQuery);
    const [mealType, setMealType] = useState(initialMealType);
    const [diet, setDiet] = useState(initialDiet);

    const submit = (e) => {
        e.preventDefault();
        onSearch({ query: query.trim(), mealType, diet });
    };

    return (
        <form className="searchbar" onSubmit={submit}>
            <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                {mealTypes.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                ))}
            </select>
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                {dietTypes.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                ))}
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
