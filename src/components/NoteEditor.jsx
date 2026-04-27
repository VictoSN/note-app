import { useState, useEffect } from "react";  
import './NoteEditor.css';        

function NoteEditor({ note, setNote }) {
    const [noteTitle, setNoteTitle] = useState("New Note");
    const [noteFavorite, setNoteFavorite] = useState(false);
    const [noteCategory, setNoteCategory] = useState("");
    const [displayMode, setDisplayMode] = useState(false);
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        if(!note) return;

        setNoteTitle(note.title || "New Note");
        setNoteFavorite(note.favorite || false);
        setNoteCategory(note.category || "");
        setNoteContent(note.content || "");
    }, [note]);

    const favoriteNote = () => {
        setNoteFavorite(prev => !prev);
    }

    const categoryNote = () => {
        setNoteCategory(prev => "Test");
    }

    // Save the note to db and update to parent
    const saveNote = async () => {
        try {
            if(note?._id) {
                await fetch(`http://localhost:3000/notes/${note?._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                            title: noteTitle,
                            favorite: noteFavorite,
                            category: noteCategory,
                            content: noteContent
                    })
                });
            } else {
                const res = await fetch(`http://localhost:3000/notes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                            title: noteTitle,
                            favorite: noteFavorite,
                            category: noteCategory,
                            content: noteContent
                    })
                });
    
                const newNote = await res.json();
                setNote(newNote);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Delete from database and clear the editor
    const removeNote = async () => {
        try {
            if(note?._id) {
                await fetch(`http://localhost:3000/notes/${note?._id}`, { method: 'DELETE' });
            };

            createNote();
        } catch (err) {
            console.log(err);
        }
    };

    // Create new note and select it
    const createNote = () => {
        setNote(null);

        setNoteTitle("New Note");
        setNoteFavorite(false);
        setNoteCategory("");
        setNoteContent("");
    };

    const duplicateNote = () => {

    }

    const changeDisplayMode = () => {
        setDisplayMode(prev => !prev);
    };

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