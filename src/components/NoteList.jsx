import { useState, useEffect } from "react";
import "./NoteList.css";

function NoteList({ note, setNote }) {
    const [notes, setNotes] = useState([]);
    
    const loadNotes = async () => {
        const res = await fetch('http://localhost:3000/notes', { method: 'GET' });
        setNotes(await res.json()); 
    };

    useEffect(() => {
        loadNotes();
    }, [ note ])

    return (
       <div id="NoteList">
            {notes.map((note) => (
                <div className="noteCard" onClick={() => setNote(note)} key ={note._id}>
                    <div className="noteCardDetail">{note.title} {note.category}</div>
                    {note.favorite ? "⭐" : ""}
                </div>
            ))}
        </div>
    );
}

export default NoteList