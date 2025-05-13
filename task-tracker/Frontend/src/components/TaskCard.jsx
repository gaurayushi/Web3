import React from "react";
import {
  FaTrash,
  FaEdit,
  FaArrowRight,
  FaArrowLeft,
  FaTasks,
} from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusOrder = ["Todo", "In Progress", "Done"];
  const currentIndex = statusOrder.indexOf(task.status);

  const moveStatus = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < statusOrder.length) {
      onStatusChange(task, statusOrder[newIndex]);
    }
  };

  return (
    <div className=" border border-white/10 text-white p-5 rounded-2xl shadow-lg transition hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaTasks className="text-yellow-300" /> {task.title}
          </h3>
          <p className="text-sm text-white/80 mt-1">{task.description}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="bg-white/20 hover:bg-red-500/60 text-red-300 hover:text-white p-2 rounded-full transition"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="flex items-center gap-2 text-white/70">
          <FaArrowRight /> {task.status}
        </span>

        <div className="flex gap-2">
          {currentIndex > 0 && (
            <button
              onClick={() => moveStatus(-1)}
              className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-full transition"
              title="Move Left"
            >
              <FaArrowLeft />
            </button>
          )}
          {currentIndex < statusOrder.length - 1 && (
            <button
              onClick={() => moveStatus(1)}
              className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-full transition"
              title="Move Right"
            >
              <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
