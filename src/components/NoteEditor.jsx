import { useState, useEffect } from "react";  
import './NoteEditor.css';        
import whiteStar from "../assets/star-white.svg";
import yellowStar from "../assets/star-yellow.svg";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";

function NoteEditor({ currentNote, setNote, onDelete, setMobileView }) {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteFavorite, setNoteFavorite] = useState(false);
    const [noteCategory, setNoteCategory] = useState("");
    const [noteContent, setNoteContent] = useState("");

    // localStorage stores strings, need some logic to avoid permanent dark mode
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("displayMode") === "true";
    });

    // change the body's class into dark mode
    useEffect(() => {
        document.body.className = darkMode ? "dark" : "";
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("displayMode", darkMode);
    }, [darkMode]);

    // Sync local state when a different note is selected
    useEffect(() => {
        if(!currentNote) {
            // Reset editor when null
            setNoteTitle("")
            setNoteFavorite(false)
            setNoteCategory("")
            setNoteContent("")
            return
        }

        setNoteTitle(currentNote.title || "");
        setNoteFavorite(currentNote.favorite || false);
        setNoteCategory(currentNote.category || "");
        setNoteContent(currentNote.content || "");
    }, [currentNote]);

    // Update the UI then persist to db
    const favoriteNote = async () => {
        if(!noteTitle.trim()) return;
        
        const newFavorite = !noteFavorite;
        setNoteFavorite(newFavorite);
        
        try {
            if(!currentNote?._id) {
                // New note, POST with favorite already set
                const res = await fetch(`http://localhost:3000/notes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                            title: noteTitle,
                            favorite: newFavorite,
                            category: noteCategory,
                            content: noteContent
                    })
                });
    
                const newNote = await res.json();
                setNote(newNote);
                return;  
            }

            await fetch(`http://localhost:3000/notes/${currentNote?._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    favorite: newFavorite
                })
            });
            setNote({ ...currentNote, favorite: newFavorite });
        } catch (err) {
            console.log(err);
        }
    }

    // Save to db. PATCH if exist, POST if not exist.
    const saveNote = async () => {
        if(!noteTitle.trim()) return;
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

                // Update parent so noteList can immediately change
                setNote({ 
                    ...currentNote, 
                    title: noteTitle,
                    category: noteCategory,
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

    // Delete from database and clear the editor to blank
    const removeNote = async () => {
        try {
            if(currentNote?._id) {
                await fetch(`http://localhost:3000/notes/${currentNote?._id}`, { method: 'DELETE' });
                onDelete(currentNote._id);
            } else {
                createNote();
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Reset the editor to blank
    const createNote = () => {
        setNote(null);

        setNoteTitle("");
        setNoteFavorite(false);
        setNoteCategory("");
        setNoteContent("");
    };

    // POST current content as a new one
    const duplicateNote = async () => {
        if(!noteTitle.trim()) return;

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

    return (
        <div id="NoteEditor">
            <section className="controlSection">
                <div className="controlDiv mobileControlDiv">
                    <div className="mobileSubDiv">
                        <button className="bckButton" onClick={() => setMobileView("list")}>←</button>
                        <input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder='Title'></input>
                    </div>
                    <div className="mobileSubDiv">
                        <button className="favButton" onClick={favoriteNote}>
                            <img className="svg" src={noteFavorite ? yellowStar : whiteStar} alt="star"></img>
                        </button>
                        <input value={noteCategory} onChange={(e) => setNoteCategory(e.target.value)} placeholder="Category"></input>
                    </div>
                </div>
                
                <div className="controlDiv">
                    <button className="savButton" onClick={saveNote}>Save</button>
                    <button className="delButton" onClick={removeNote}>Delete</button>
                    <button className="newButton" onClick={createNote}>New</button>
                    <button className="dupButton" onClick={duplicateNote}>Duplicate</button>
                    <button className="modButton" onClick={() => setDarkMode(!darkMode)}>
                        <img className="svg" src={darkMode ? moon : sun} alt="Dark mode logo"></img>
                    </button>
                </div>
            </section>
            <textarea className="textContent" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder='Insert note here'></textarea>
        </div>
    );
}

export default NoteEditor