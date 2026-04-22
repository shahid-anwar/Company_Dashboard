import { createContext, useContext, useState, useEffect } from "react";

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within CompanyProvider");
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  // Data states
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch("/companies.json");
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        const data = await response.json();
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Get unique industries and locations
  const industries = [...new Set(companies.map((company) => company.industry))];
  const locations = [...new Set(companies.map((company) => company.location))];

  // Filter and sort companies
  useEffect(() => {
    let result = [...companies];

    // Search filter
    if (debouncedSearchTerm) {
      result = result.filter((company) =>
        company.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
    }

    // Industry filter
    if (selectedIndustry) {
      result = result.filter(
        (company) => company.industry === selectedIndustry,
      );
    }

    // Location filter
    if (selectedLocation) {
      result = result.filter(
        (company) => company.location === selectedLocation,
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "employees") {
        return b.employees - a.employees;
      } else if (sortBy === "founded") {
        return b.founded - a.founded;
      }
      return 0;
    });

    setFilteredCompanies(result);
  }, [
    companies,
    debouncedSearchTerm,
    selectedIndustry,
    selectedLocation,
    sortBy,
  ]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedIndustry("");
    setSelectedLocation("");
    setSortBy("name");
  };

  const value = {
    // Data
    companies,
    filteredCompanies,
    loading,
    error,

    // Filters
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    selectedLocation,
    setSelectedLocation,
    sortBy,
    setSortBy,

    // Utilities
    industries,
    locations,
    resetFilters,
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};
