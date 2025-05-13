
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../helpers/api";

const Layout = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_#5b4b8a,_#7b5d8b,_#aa7f9a)] text-white">
      <Sidebar projects={projects} setProjects={setProjects} />
      <main className="flex-1 flex flex-col">
        <Navbar projects={projects} setProjects={setProjects} />
        {React.cloneElement(children, { projects, setProjects })}
      </main>
    </div>
  );
};

export default Layout;
