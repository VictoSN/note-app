import { useState } from "react";
import './SearchBar.css';
        
function SearchBar({ search, setSearch }) {
    return (
        <div id="SearchBar">
          <input className='searchInput' placeholder='Search'></input>
          <select></select>
        </div>
    );
}

export default SearchBar