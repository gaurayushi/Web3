import { FaTrophy, FaClipboardCheck, FaChartBar } from "react-icons/fa";

const Statistics = ({ rank, percentile, correct }) => {
  return (
    <div className="bg-white p-5 shadow-md rounded-lg border border-gray-200 ">
      {/* Quick Statistics Title */}
      <h3 className="text-base font-semibold text-gray-700 mb-7">Quick Statistics</h3>

     
      <div className="flex justify-between items-center">
        {/* Rank Section */}
        <div className="flex items-center flex-1 justify-center">
          <div className="bg-gray-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mr-3">
            <FaTrophy className="text-yellow-500 text-xl" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">{rank}</h4>
            <p className="text-sm text-gray-500 font-medium">Your Rank</p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-10 w-px bg-gray-300"></div>

        {/* Percentile Section */}
        <div className="flex items-center flex-1 justify-center">
          <div className="bg-gray-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mr-3">
            <FaChartBar className="text-gray-500 text-xl" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">{percentile}%</h4>
            <p className="text-sm text-gray-500 font-medium">Percentile</p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-10 w-px bg-gray-300"></div>

        {/* Correct Answers Section */}
        <div className="flex items-center flex-1 justify-center">
          <div className="bg-gray-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mr-3">
            <FaClipboardCheck className="text-green-500 text-xl" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">{correct}/15</h4>
            <p className="text-sm text-gray-500 font-medium">Correct Answers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
