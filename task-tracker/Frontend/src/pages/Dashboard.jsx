import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaFolderOpen } from "react-icons/fa";

const Dashboard = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start px-6 py-10 text-white min-h-[calc(100vh-80px)]">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/tasks/${project._id}`)}
              className="bg-white/10 hover:bg-white/20 p-6 rounded-2xl shadow-md cursor-pointer transition-all backdrop-blur-sm border border-white/10 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold truncate">{project.name}</h3>
                <FaFolderOpen className="text-white/40 group-hover:text-yellow-300 transition" />
              </div>
              <p className="text-sm text-white/60">
                Created {moment(project.createdAt).fromNow()}
              </p>
              <p className="text-xs text-white/40 mt-1 italic">
                Click to manage tasks
              </p>
            </div>
          ))
        ) : (
          <p className="text-white/70 text-sm mt-4">
            No projects yet. Click <span className="underline font-medium">New Project</span> to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
