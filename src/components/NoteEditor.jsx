import { useState } from "react";  
import './NoteEditor.css';        

function NoteEditor({ note, setNote }) {
    return (
        <div id="NoteEditor">
            <section className="controlSection">
                <input placeholder='title'></input>
                <button>favorite</button>
                <select></select>
                <button>Save</button>
                <button>Delete</button>
                <button>New</button>
                <button>Mode</button>
            </section>
            <textarea className="textContent" placeholder='Insert note here'></textarea>
        </div>
    );
}

export default NoteEditor