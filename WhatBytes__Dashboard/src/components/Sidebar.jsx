import { FaChartBar, FaBook, FaFileAlt, FaMapMarkerAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white text-black px-5 py-6 flex flex-col shadow-md border-r">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <img src="/image.webp" alt="WhatBytes Logo" className="h-7" />
        <h1 className="text-xl font-bold">WhatBytes</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <a href="#" className="flex items-center px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded">
          <FaChartBar className="mr-2 text-black" /> Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-3 bg-gray-100 text-blue-600 font-semibold rounded">
          <FaMapMarkerAlt className="mr-2 text-blue-600" /> Skill Test
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded">
          <FaFileAlt className="mr-2 text-black" /> Internship
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
