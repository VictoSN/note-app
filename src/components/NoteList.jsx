import { useState, useEffect } from "react";
import "./NoteList.css";
import yellowStar from "../assets/star-yellow.svg";

function NoteList({ notes, setNote }) {    
    // When a note card is clicked, it will update the note editor by using setNote(notes)
    return (
       <div id="NoteList">
            {notes.map((note) => (
                <div className="noteCard" onClick={() => setNote(note)} key ={note.id}>
                    <div className="noteCardDetail">
                        <h1>{note.title}</h1>
                        <h2>{note.category}</h2>
                    </div>
                    <img className="svg" src={yellowStar} style={{ display: note.favorite ? "block" : "none"}} alt="star"></img>
                </div>
            ))}
        </div>
    );
}

export default NoteList