import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { FaBullseye } from "react-icons/fa";

// Register Chart.js elements
Chart.register(ArcElement, Tooltip, Legend);

const QuestionAnalysis = ({ correctAnswers }) => { 
  const totalQuestions = 15;
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Chart Data
  const data = {
    datasets: [
      {
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ["#1E88E5", "#E0E0E0"], 
        borderWidth: 0,
        cutout: "60%", 
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white p-4 sm:p-4 lg:p-6 shadow-lg rounded-lg border border-gray-200 w-full">
      
      {/* Header with Responsive Font Sizes */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md sm:text-lg md:text-xl font-semibold text-gray-900">
          Question Analysis
        </h3>
      </div>

      {/* Correct Answers Text - Compact and Responsive */}
      <p className="text-xs sm:text-sm md:text-md text-gray-700">
        You scored <span className="font-bold">{correctAnswers} questions correct</span> out of {totalQuestions}.
        However, it still needs some improvements.
      </p>

      {/* Donut Chart with Responsive Size & Less Padding */}
      <div className="relative flex justify-center mt-2">
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaBullseye className="text-xl sm:text-2xl md:text-3xl text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnalysis;
