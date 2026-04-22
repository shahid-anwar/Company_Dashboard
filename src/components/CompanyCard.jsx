const CompanyCard = ({ company }) => {
  // Industry-based gradient colors
  const industryColors = {
    Technology: "from-blue-500 to-indigo-600",
    Energy: "from-orange-500 to-amber-600",
    Finance: "from-emerald-500 to-teal-600",
    Healthcare: "from-pink-500 to-rose-600",
    Education: "from-purple-500 to-violet-600",
    Retail: "from-fuchsia-500 to-pink-600",
    Automotive: "from-gray-600 to-slate-700",
    Media: "from-red-500 to-orange-600",
    Food: "from-lime-500 to-green-600",
    Construction: "from-yellow-600 to-orange-600",
    Travel: "from-cyan-500 to-blue-600",
    Aerospace: "from-indigo-600 to-purple-700",
  };

  const gradientClass =
    industryColors[company.industry] || "from-gray-500 to-gray-700";

  return (
    <div className="bg-white rounded-2xl card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden group">
      {/* Colorful header with gradient */}
      <div className={`bg-gradient-to-br ${gradientClass} p-6 relative`}>
        <div className="flex items-center justify-between">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" />
            </svg>
          </div>
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold rounded-full text-gray-800">
            {company.industry}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {company.name}
        </h3>

        <div className="space-y-3 mb-4">
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <span className="mr-2">📍</span>
            <span className="text-sm">{company.location}</span>
          </div>

          {/* Employees */}
          <div className="flex items-center text-gray-600">
            <span className="mr-2">👥</span>
            <span className="text-sm">
              {company.employees.toLocaleString()} employees
            </span>
          </div>

          {/* Revenue (mock data) */}
          <div className="flex items-center text-gray-600">
            <span className="mr-2">💰</span>
            <span className="text-sm font-semibold text-green-600">
              ${((company.employees * 100000) / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">Est. {company.founded}</span>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Visit →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
