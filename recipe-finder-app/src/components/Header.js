import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-inner container">
                <div className="brand">Recipe Finder</div>
                <nav style={{ display: 'flex', gap: 12 }}>
                    <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? 700 : 500 })}>Home</NavLink>
                    <NavLink to="/favorites" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 500 })}>Favorites</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
