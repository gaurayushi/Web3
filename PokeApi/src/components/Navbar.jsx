import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

const tabs = [
  { label: "Home", color: "#6B7280" },
  { label: "Pokédex", color: "#E53E3E" },
  { label: "Video Games & Apps", color: "#F97316" },
  { label: "Animation", color: "#4ADE80" },
  { label: "Play! Pokémon Events", color: "#38BDF8" },
];

const pokemonTypes = [
  "All", "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const Navbar = ({ searchQuery, setSearchQuery, selectedType, setSelectedType }) => {
  const [activeTab, setActiveTab] = useState("Pokédex");
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const tabRefs = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl) {
      setUnderlineStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeTab]);

  const activeColor = tabs.find((tab) => tab.label === activeTab)?.color;

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) setSearchQuery(""); // clear input when closing
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-100 via-blue-100 to-purple-100 bg-opacity-90 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-6 py-3 relative">
        {/* LEFT: Navigation Tabs */}
        <div className="relative flex gap-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[tab.label] = el)}
              onClick={() => setActiveTab(tab.label)}
              className={`pb-2 text-sm font-medium px-3 py-1 rounded-md transition-all duration-300 ${
                activeTab === tab.label
                  ? "text-white"
                  : "text-gray-600 hover:text-black"
              }`}
              style={{
                backgroundColor:
                  activeTab === tab.label ? tab.color : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}

          {/* Underline only under tab buttons */}
          <motion.span
            layout
            className="absolute bottom-0 h-1 rounded"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              backgroundColor: activeColor,
              position: "absolute",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 50 }}
          />
        </div>

        {/* RIGHT: Search and Dropdown */}
        <div className="relative flex items-center gap-4 rounded-full bg-gradient-to-r from-purple-200 via-white to-indigo-200   ">
          {isSearchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 text-sm rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all w-full bg-white"
              />
              <FaTimes
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={toggleSearch}
              />
            </motion.div>
          ) : (
            <button
              onClick={toggleSearch}
              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition"
              title="Search"
            >
              <FaSearch />
            </button>
          )}

          {/* Type Filter Dropdown */}
          <select
  value={selectedType}
  onChange={(e) =>
    setSelectedType(e.target.value === "All" ? "" : e.target.value)
  }
  className="px-3 py-2 rounded-full bg-gradient-to-r from-purple-200 via-white to-indigo-200 text-sm text-gray-700 shadow-inner border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
>
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
