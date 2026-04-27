import { useState, useEffect } from "react";  
import './NoteEditor.css';        

async function loadNotes(noteId) {

}

function NoteEditor({ note, setNote }) {
    const [noteTitle, setNoteTitle] = useState("New Note");
    const [noteFavorite, setNoteFavorite] = useState(false);
    const [noteCategory, setNoteCategory] = useState("");
    const [displayMode, setDisplayMode] = useState(false);
    const [noteContent, setNoteContent] = useState("");


    useEffect(() => {
        async function fetchData() {
            if(note._id != null && note._id != undefined) {
                const res = await fetch(`http://localhost:3000/notes/${note._id}`);
                const data = await res.json();
                setNoteTitle(data.title);    
                setNoteFavorite(data.favorite);    
                setNoteCategory(data.category);    
                setNoteContent(data.content);    
            }
        }

        fetchData();
    }, []);

    const favoriteNote = () => {
        setNoteFavorite(prev => !prev);
    }

    const categoryNote = () => {
        setNoteCategory(prev => "Test");
    }

    const saveNote = async () => {
        await fetch(`http://localhost:3000/notes/${note._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                    title: noteTitle,
                    favorite: noteFavorite,
                    category: noteCategory,
                    content: noteContent
            })
        });
    }

    const removeNote = async () => {
        await fetch(`http://localhost:3000/notes/${note._id}`, { method: 'DELETE' });
    }

    const createNote = async () => {
        const res = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: null
        });
    }

    const duplicateNote = () => {

    }

    const changeDisplayMode = () => {
        setDisplayMode(prev => !prev);
    }

    return (
        <div id="NoteEditor">
            <section className="controlSection">
                <input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder='Title'></input>
                <button onClick={favoriteNote}>{noteFavorite ? "Unfavorite" : "Favorite"}</button>
                <select></select>
                <button onClick={saveNote}>Save</button>
                <button onClick={removeNote}>Delete</button>
                <button onClick={createNote}>New</button>
                <button onClick={duplicateNote}>Duplicate</button>
                <button onClick={changeDisplayMode}>{displayMode ? "Light" : "Dark"}</button>
            </section>
            <textarea className="textContent" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder='Insert note here'></textarea>
        </div>
    );
}

export default NoteEditor