import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SkillTestCard from "../components/SkillTestCard";
import Statistics from "../components/Statistics";
import ComparisonGraph from "../components/ComparisonGraph";
import SyllabusAnalysis from "../components/SyllabusAnalysis";
import QuestionAnalysis from "../components/QuestionAnalysis";
import UpdateScores from "../components/UpdateScores";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rank, setRank] = useState(4);
  const [percentile, setPercentile] = useState(90);
  const [correctAnswers, setCorrectAnswers] = useState(12);
  const [updatedScore, setUpdatedScore] = useState(null);
  
  // Function to handle score updates from modal
  const handleSave = (newRank, newPercentile, newScore) => {
    setRank(newRank);
    setPercentile(newPercentile);
    setCorrectAnswers(newScore); // Dynamically update correct answers
    setUpdatedScore(newScore);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 bg-white px-10 py-6 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-gray-500 text-lg font-semibold">Skill Test</h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-4">
            <SkillTestCard openModal={() => setIsModalOpen(true)} />
            <Statistics rank={rank} percentile={percentile} correct={correctAnswers} />
            <ComparisonGraph updatedScore={updatedScore} percentile={percentile} />
          </div>

          <div className="col-span-4 flex flex-col gap-4 self-start">
            <SyllabusAnalysis />
            <QuestionAnalysis correctAnswers={correctAnswers} /> {/* ✅ Pass correctAnswers */}
          </div>
        </div>

        {isModalOpen && <UpdateScores isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
      </div>
    </div>
  );
};

export default Dashboard;
