import React, { useState } from "react";
import { FaFolderPlus, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getUserFromToken } from "../utils/auth";
import profilePlaceholder from "../assets/profile.jpg";
import api from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ projects, setProjects }) => {
  const user = getUserFromToken();
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = async () => {
    if (!projectName.trim()) return;
    try {
      if (projects.length >= 4) {
        toast.warn("⚠️ Limit: Only 4 projects allowed.");
        return;
      }

      const res = await api.post("/projects", { name: projectName });
      setProjects([...projects, res.data]);
      setProjectName("");
      setShowInput(false);
      toast.success("🎉 Project created");
      window.dispatchEvent(new Event("project-updated"));
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const avatarSrc = user?.avatar?.trim() ? user.avatar : profilePlaceholder;

  return (
    <div className="w-full bg-transparent text-white px-6 py-4 flex justify-between items-center shadow-md backdrop-blur-sm border-b border-white/10">
      <div className="text-xl font-semibold tracking-wide"></div>

      <div className="flex items-center gap-4">
        {showInput ? (
          <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/20 transition-all">
            <input
              type="text"
              placeholder="Enter project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-transparent text-white placeholder-white/70 focus:outline-none w-40"
            />
            <button
              onClick={handleCreateProject}
              className="text-green-300 hover:text-green-500 transition"
              title="Create"
            >
              <FaCheckCircle size={18} />
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setProjectName("");
              }}
              className="text-red-300 hover:text-red-500 transition"
              title="Cancel"
            >
              <FaTimesCircle size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all border border-white/20"
          >
            <FaFolderPlus size={14} />
            <span className="text-sm font-medium">New Project</span>
          </button>
        )}

        {/* ✅ Avatar */}
        <img
          src={avatarSrc}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
