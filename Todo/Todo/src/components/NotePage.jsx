import React from 'react';
import { FaPlusCircle, FaEdit, FaTrash, FaSun, FaHistory, FaRegCalendarPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotesPage = ({ notes, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleNewNote = () => {
    onEdit(null);
    navigate('/new');
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (dateObj) => dateObj.toLocaleDateString();

  const todayNotes = notes.filter(note => note.date === formatDate(today));
  const yesterdayNotes = notes.filter(note => note.date === formatDate(yesterday));
  const tomorrowNotes = notes.filter(note => note.date === formatDate(tomorrow));

  // Light pastel gradients for calmness
  const colorGradients = [
    "from-purple-100 via-pink-100 to-yellow-100",
    "from-blue-100 via-indigo-100 to-purple-100",
    "from-green-100 via-teal-100 to-cyan-100",
    "from-pink-100 via-rose-100 to-red-100",
    "from-yellow-100 via-orange-100 to-pink-100",
  ];

  const sectionIcons = {
    Today: <FaSun className="text-yellow-400" size={24} />,
    Yesterday: <FaHistory className="text-gray-400" size={22} />,
    Tomorrow: <FaRegCalendarPlus className="text-green-400" size={22} />,
  };

  const renderSection = (title, noteList) => (
    <section className="mb-20 w-full">
      {/* Heading with Icon */}
      <div className="mb-8 flex items-center gap-3">
        <div>{sectionIcons[title]}</div>
        <h2 className="text-4xl font-extrabold text-gray-800">{title}</h2>
      </div>
      <div className="w-20 h-1 bg-purple-400 rounded-full mb-8"></div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {noteList.map((note, index) => (
          <motion.div
            key={note.id}
            className={`bg-gradient-to-br ${colorGradients[index % colorGradients.length]} text-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all relative`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Date & Time */}
            <div className="flex justify-between text-xs text-gray-600 mb-4">
              <span>{note.date}</span>
              <span>{note.time}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3">{note.title}</h3>

            {/* Content */}
            <p className="text-base text-gray-700 mb-12 leading-relaxed">{note.content}</p>

            {/* Actions */}
            <div className="absolute bottom-5 right-5 flex space-x-4">
              <button
                onClick={() => {
                  onEdit(note);
                  navigate('/new');
                }}
                className="text-indigo-600 hover:text-indigo-800"
                title="Edit Note"
              >
                <FaEdit size={22} />
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Note"
              >
                <FaTrash size={22} />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Add New Note Card */}
        <motion.div
          onClick={handleNewNote}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-3xl p-8 cursor-pointer hover:border-gray-400 transition-all bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
        >
          <FaPlusCircle size={42} />
          <p className="mt-4 text-lg font-semibold">Add New Note</p>
        </motion.div>
      </motion.div>
    </section>
  );

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-10 w-full"
    >
      {todayNotes.length > 0 && renderSection("Today", todayNotes)}
      {yesterdayNotes.length > 0 && renderSection("Yesterday", yesterdayNotes)}
      {tomorrowNotes.length > 0 && renderSection("Tomorrow", tomorrowNotes)}
    </motion.div>
  );
};

export default NotesPage;
