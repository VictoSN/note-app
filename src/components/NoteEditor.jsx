import { useState, useEffect } from "react";  
import './NoteEditor.css';        

function NoteEditor({ currentNote, setNote }) {
    const [noteTitle, setNoteTitle] = useState("New Note");
    const [noteFavorite, setNoteFavorite] = useState(false);
    const [noteCategory, setNoteCategory] = useState("");
    const [displayMode, setDisplayMode] = useState(false);
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        if(!currentNote) return;

        setNoteTitle(currentNote.title || "New Note");
        setNoteFavorite(currentNote.favorite || false);
        setNoteCategory(currentNote.category || "");
        setNoteContent(currentNote.content || "");
    }, [currentNote]);

    const favoriteNote = async () => {
        const newFavorite = !noteFavorite;
        setNoteFavorite(newFavorite);
        setNote({ ...currentNote, favorite: newFavorite });

        try {
            if(currentNote?._id) {
                await fetch(`http://localhost:3000/notes/${currentNote?._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        favorite: newFavorite
                    })
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    const categoryNote = async () => {
        const newCategory = ""
        setNoteCategory(newCategory);
        setNote({ ...currentNote, category: newCategory });

        try {
            if(currentNote?._id) {
                await fetch(`http://localhost:3000/notes/${currentNote?._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        category: noteCategory
                    })
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Save the note to db and update to parent
    const saveNote = async () => {
        try {
            if(currentNote?._id) {
                await fetch(`http://localhost:3000/notes/${currentNote?._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                            title: noteTitle,
                            favorite: noteFavorite,
                            category: noteCategory,
                            content: noteContent
                    })
                });

                setNote({ 
                    ...currentNote, 
                    title: noteTitle,
                    content: noteContent
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
            if(currentNote?._id) {
                await fetch(`http://localhost:3000/notes/${currentNote?._id}`, { method: 'DELETE' });
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

    const duplicateNote = async () => {
        try {
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
        } catch (err) {
            console.log(err);
        }
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