import CompanyCard from "./CompanyCard";
import FilterBar from "./FilterBar";
import LoadingSpinner from "./LoadingSpinner";
import { useCompany } from "../context/CompanyContext";

const CompanyList = () => {
  const {
    companies,
    filteredCompanies,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    selectedLocation,
    setSelectedLocation,
    sortBy,
    setSortBy,
    industries,
    locations,
    resetFilters,
  } = useCompany();

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-2">Error Loading Companies</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        industries={industries}
        locations={locations}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Results count and reset button */}
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-600">
          Showing {filteredCompanies.length} of {companies.length} companies
        </span>
        {(searchTerm ||
          selectedIndustry ||
          selectedLocation ||
          sortBy !== "name") && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No companies found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
