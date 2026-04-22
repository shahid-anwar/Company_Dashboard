import CompanyList from "./CompanyList";

const CompanyDashboard = () => {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header with gradient */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-2">
            Company Directory
          </h1>
          <p className="text-gray-700 text-lg">
            Discover and explore our curated database of leading companies
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CompanyList />
      </main>
    </div>
  );
};

export default CompanyDashboard;
