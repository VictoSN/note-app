import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'

function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  const filteredNotes = notes
  .filter(note => note.title.toLowerCase().includes(search.toLowerCase()))
  .filter(note => filterCategory ? note.category === filterCategory : true);

  const categories = [...new Set(notes.map(n => n.category).filter(Boolean))]

  useEffect(() => {
    fetch('http://localhost:3000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  })

  return (
    <div id="mainDiv">
      <div id="leftColumn">
        <SearchBar 
          search={search} setSearch={setSearch} categories={categories}
          filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
        <NoteList notes={filteredNotes} setNote={setCurrentNote} />
      </div>
      <NoteEditor currentNote={currentNote} setNote={setCurrentNote} />
    </div>
  )
}

export default App