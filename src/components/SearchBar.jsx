import { useState, useEffect } from "react";
import './SearchBar.css';
        
function SearchBar({ search, setSearch, categories, filterCategory, setFilterCategory }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div id="SearchBar">
            <form onSubmit={handleSubmit}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='searchInput' placeholder='Search...'></input>
            </form>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
    );
}

export default SearchBar