import { useState, useEffect } from "react";
import "./NoteList.css";

function NoteList({ notes, setNote }) {    
    // When a note card is clicked, it will update the note editor by using setNote(notes)
    return (
       <div id="NoteList">
            {notes.map((notes) => (
                <div className="noteCard" onClick={() => setNote(notes)} key ={notes._id}>
                    <div className="noteCardDetail">{notes.title} {notes.category}</div>
                    {notes.favorite ? "⭐" : ""}
                </div>
            ))}
        </div>
    );
}

export default NoteList