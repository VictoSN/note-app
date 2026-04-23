import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'

function App() {
  const [search, setSearch] = useState("");
  const [note, setNote] = useState("");

  return (
    <div id="mainDiv">
      <div id="leftColumn">
        <SearchBar search={search} setSearch={setSearch} />
        <NoteList note={note} setNote={setNote} />
      </div>
      <NoteEditor note={note} setNote={setNote} />
    </div>
  )
}

export default App