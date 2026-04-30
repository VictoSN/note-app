import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'

function App() {
  // Fetch the initial data from db
  const [notes, setNotes] = useState(() => {
    const data = JSON.parse(localStorage.getItem("notes"));
    return Array.isArray(data) ? data : [];
  }, []);

  const [search, setSearch] = useState("");
  const [currentNote, setCurrentNote] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileView, setMobileView] = useState("list") // "list" | "editor"

  const selectNote = (note) => {
    setCurrentNote(note);
    setMobileView("editor");
  }

  const filteredNotes = notes
  .filter(note => note.title.toLowerCase().includes(search.toLowerCase()))
  .filter(note => filterCategory ? note.category === filterCategory : true)
  .filter(note => showFavorites ? note.favorite === true : true);

  // Categories are a set of note.category
  const categories = [...new Set(notes.map(n => n.category).filter(Boolean))]

  const updateNote = (updatedNote) => {
    if(!updatedNote) {
      // create / remove note, just unselect it
      setCurrentNote(null)
      return
    }
    if(notes.find(n => n.id === updatedNote.id)) {
      // existing note, then update it
      setNotes(prev => prev.map(n => n.id === updatedNote?.id ? updatedNote : n));
    } else {
      // new note (add/duplicate), add it to the note list
      setNotes(prev => [...prev, updatedNote]);
    }
  }

  const deleteNote = (deleteId) => {
    setNotes(prev => prev.filter(n => n.id !== deleteId));
    setCurrentNote(null)
  }

  // Update the data into localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div id="mainDiv">
        <div id="leftColumn" className={mobileView === "editor" ? "hidden-mobile" : ""}>          
          <SearchBar 
            search={search} setSearch={setSearch} categories={categories}
            filterCategory={filterCategory} setFilterCategory={setFilterCategory} 
            showFavorites={showFavorites} setShowFavorites={setShowFavorites} 
          />
          <NoteList notes={filteredNotes} setNote={selectNote} />
        </div>
        <div id="rightColumn" className={mobileView === "list" ? "hidden-mobile" : ""}>
          <NoteEditor
            currentNote={currentNote} setNote={updateNote} 
            onDelete={deleteNote} setMobileView={setMobileView}
          />
        </div>
    </div>
  )
}

export default App