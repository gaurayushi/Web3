import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaProjectDiagram, FaTrash } from "react-icons/fa";
import { getUserFromToken, removeToken } from "../utils/auth.js";
import logo from "../assets/charts.png";
import { useRef, useState } from "react";
import api from "../helpers/api";
import { toast } from "react-toastify";

const Sidebar = ({ projects, setProjects }) => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [showProjects, setShowProjects] = useState(false);
  const hoverTimeout = useRef(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      const updated = projects.filter((proj) => proj._id !== id);
      setProjects(updated);
      toast.success("✅ Project deleted.");
      window.dispatchEvent(new Event("project-updated"));
    } catch (err) {
      toast.error("❌ Deletion failed.");
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setShowProjects(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowProjects(false);
    }, 300);
  };

  return (
    <div className="w-full md:w-64 min-h-screen bg-gradient-to-br from-[#4b3a7d] via-[#614284] to-[#805c9b] backdrop-blur-md text-white flex flex-col justify-between shadow-2xl">
      <div>
        <div className="p-4 border-b  border-white/10 flex justify-center">
          <img src={logo} alt="Task Tracker Logo" className="h-10 object-contain drop-shadow-lg" />
        </div>

        <nav className="mt-4 px-4 space-y-3 text-sm">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 hover:text-yellow-200 transition-all"
          >
            <FaHome /> <span>Dashboard</span>
          </Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 cursor-pointer transition-all">
              <FaProjectDiagram />
              <span>Projects</span>
            </div>

            {showProjects && (
              <ul className="absolute left-0 mt-2 w-60 max-h-56 overflow-y-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg z-10 py-2">
                {projects.map((proj) => (
                  <li
                    key={proj._id}
                    className="group flex justify-between items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition rounded-lg cursor-pointer"
                  >
                    <span
                      onClick={() => navigate(`/tasks/${proj._id}`)}
                      className="flex-1 group-hover:text-yellow-300 truncate"
                    >
                      {proj.name}
                    </span>
                    <FaTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(proj._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 ml-2 transition"
                      title="Delete Project"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>

      <div className="px-3 py-3 border-t border-white/10">
        <button
          onClick={() => {
            removeToken();
            navigate("/");
          }}
          className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
