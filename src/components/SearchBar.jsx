import { useState, useEffect } from "react";
import './SearchBar.css';
        
function SearchBar({ search, setSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div id="SearchBar">
            <form onSubmit={handleSubmit}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='searchInput' placeholder='Search...'></input>
            </form>
          <select></select>
        </div>
    );
}

export default SearchBar