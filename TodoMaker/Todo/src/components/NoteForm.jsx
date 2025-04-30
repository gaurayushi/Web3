import React, { useState, useEffect } from 'react';
import { formatTime } from '../pages/utils';
import { motion } from 'framer-motion';
import { FaUserCircle, FaFont, FaItalic, FaCode } from 'react-icons/fa'; // Icons

const NoteForm = ({ onSave, editNote }) => {
  const [title, setTitle] = useState(editNote ? editNote.title : '');
  const [content, setContent] = useState(editNote ? editNote.content : '');
  const [fontStyle, setFontStyle] = useState(editNote?.fontStyle || 'font-sans');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const now = new Date();
      const note = {
        id: editNote ? editNote.id : Date.now(),
        title,
        content,
        date: now.toLocaleDateString(),
        time: formatTime(now),
        fontStyle,
      };
      onSave(note);
      setTitle('');
      setContent('');
      setFontStyle('font-sans');
    } catch {
      setError('Error saving note');
    } finally {
      setLoading(false);
    }
  };

  const fontOptions = [
    { value: 'font-sans', label: 'Sans', icon: <FaFont /> },
    { value: 'font-serif', label: 'Serif', icon: <FaItalic /> },
    { value: 'font-mono', label: 'Mono', icon: <FaCode /> },
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg transition-all relative"
      >
        {/* Avatar on top */}
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-6xl text-purple-500 shadow-md rounded-full" />
        </div>

        {/* Font style options */}
        <div className="flex justify-center gap-4 mb-6">
          {fontOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFontStyle(opt.value)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                fontStyle === opt.value
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'bg-white text-gray-700 border-gray-300'
              } hover:scale-105 transition-all`}
              title={opt.label}
            >
              {opt.icon}
            </button>
          ))}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full mb-4 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content..."
          required
          rows="5"
          className={`w-full mb-6 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${fontStyle}`}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-md font-semibold hover:scale-105 transition-all"
        >
          {loading ? 'Saving...' : 'Save Note'}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </motion.div>
  );
};

export default NoteForm;
