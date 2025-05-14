import { FaHtml5 } from "react-icons/fa";

const SkillTestCard = ({ openModal }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center border  border-gray-200 w-full max-w-[610px] ml-0">
      <div className="flex items-center space-x-4">
        {/* Left Section: "HTML" Above the Logo */}
        <div className="flex flex-col items-center">
          <span className="text-md font-bold text-gray-800 tracking-wide">HTML</span>
          <FaHtml5 className="text-orange-700 text-5xl" />
        </div>

        {/* Right Section: Title & Details */}
        <div>
          <h3 className="text-md font-bold text-gray-900 leading-tight">
            Hyper Text Markup Language
          </h3>
          <p className="text-xs text-gray-500 leading-snug">
            Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
          </p>
        </div>
      </div>

      {/* Update Button - Opens Modal from Dashboard */}
      <button
        onClick={openModal}
        className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-md text-xs font-medium shadow-md">
        Update
      </button>
    </div>
  );
};

export default SkillTestCard;
