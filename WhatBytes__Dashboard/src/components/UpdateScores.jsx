import { useState } from "react";
import { FaHtml5 } from "react-icons/fa";

const UpdateScores = ({ isOpen, onClose, onSave }) => {
  const [rank, setRank] = useState(4);
  const [percentile, setPercentile] = useState(90);
  const [score, setScore] = useState(10);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-lg font-bold mb-4">Update scores</h3>
        
        {/* HTML Icon in the Top Right */}
        <div className="absolute top-4 right-4">
          <FaHtml5 className="text-orange-600 text-3xl" />
        </div>

        {/* Rank */}
        <div className="flex items-center mb-3">
          <p className="font-semibold">Update your <span className="text-gray-900 font-bold">Rank</span></p>
        </div>
        <input 
          type="number" 
          value={rank} 
          onChange={(e) => setRank(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Percentile */}
        <div className="flex items-center mb-3">
        
          <p className="font-semibold">Update your <span className="text-gray-900 font-bold">Percentile</span></p>
        </div>
        <input 
          type="number" 
          value={percentile} 
          onChange={(e) => setPercentile(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Score */}
        <div className="flex items-center mb-3">
        
          <p className="font-semibold">Update your <span className="text-gray-900 font-bold">Current Score (out of 15)</span></p>
        </div>
        <input 
          type="number" 
          value={score} 
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200">
            cancel
          </button>
          <button 
            onClick={() => onSave(rank, percentile, score)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            save →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateScores;
