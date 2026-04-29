import { useState, useEffect } from "react";
import './SearchBar.css';
import yellowStar from "../assets/star-yellow.svg";
import whiteStar from "../assets/star-white.svg";
        
function SearchBar({ search, setSearch, categories, filterCategory, setFilterCategory, showFavorites, setShowFavorites }) {
    // Update the search and category using the setSearch and setFilterCategory.
    return (
        <div id="SearchBar">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...'></input>
            <div className="filterDiv">
                <select className="catFilter" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                    <option value="">All</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <label className="favFilter">
                    <input
                        type="checkbox"
                        checked={showFavorites}
                        onChange={(e) => setShowFavorites(e.target.checked)}
                        hidden
                    />
                    {showFavorites ? (<img className="svg" src={yellowStar} />) : (<img className="svg" src={whiteStar} />)}
                </label>
            </div>
        </div>
    );
}

export default SearchBar