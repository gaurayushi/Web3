const SyllabusAnalysis = () => {
  const syllabusData = [
    { title: "HTML Tools, Forms, History", percentage: 80, color: "bg-blue-600" },
    { title: "Tags & References in HTML", percentage: 60, color: "bg-orange-500" },
    { title: "Tables & References in HTML", percentage: 24, color: "bg-red-500" },
    { title: "Tables & CSS Basics", percentage: 96, color: "bg-green-500" },
  ];

  return (
    <div className="bg-white p-10 shadow-md rounded-md border border-gray-200 w-full">
      <h3 className="text-md  md:text-xl font-semibold  mb-2">Syllabus  Analysis</h3>

      <div className="space-y-4">
        {syllabusData.map((item, index) => (
          <div key={index}>
            {/* Row with Title and Percentage */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">{item.title}</p>
              <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
            </div>

            {/* Progress Bar Below */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 relative">
              <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusAnalysis;
