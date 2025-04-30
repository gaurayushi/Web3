import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaStickyNote, FaPlus, FaUser } from 'react-icons/fa';
import NoteForm from '../src/components/NoteForm';
import NotesPage from '../src/components/NotePage';
import { getNotes } from './pages/utils';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  const [notes, setNotes] = useState(getNotes);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSave = (note) => {
    if (noteToEdit) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
      setNoteToEdit(null);
    } else {
      setNotes([note, ...notes]);
    }
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Router>
      <div className=" w-full gradient-bg font-sans overflow-x-hidden">

        {/* NAVBAR */}
        <motion.nav
          className="w-full px-9 sm:px-9 py-9 flex flex-col sm:flex-row justify-between items-center bg-white/10 backdrop-blur-md shadow-md"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center mb-3 sm:mb-0 space-x-2 bg-black/30 px-4 py-2 rounded-full shadow text-white">
            <FaUser className="text-base" />
            <span className="font-medium text-sm">Welcome</span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-end">
            <Link
              to="/"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-medium py-2 px-4 rounded-full shadow transition-all"
            >
              <FaStickyNote />
              <span>All Notes</span>
            </Link>
            <Link
              to="/new"
              className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white text-sm font-medium py-2 px-4 rounded-full shadow transition-all"
            >
              <FaPlus />
              <span>Add Note</span>
            </Link>
          </div>
        </motion.nav>

        {/* PAGE CONTENT */}
        <motion.div
          className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 mt-10 pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Routes>
            <Route
              path="/"
              element={<NotesPage notes={notes} onEdit={setNoteToEdit} onDelete={handleDelete} />}
            />
            <Route
              path="/new"
              element={<NoteForm onSave={handleSave} editNote={noteToEdit} />}
            />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;
