import React, { useEffect, useState } from "react";
import CountriesCard from "./CountriesCard";
import { Link } from "react-router-dom";
import { BlinkBlur } from "react-loading-indicators";

const ITEMS_PER_PAGE = 12;

const CountriesList = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [continentFilter, setContinentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      let url = "";

      try {
        if (searchQuery) {
          url = `https://restcountries.com/v3.1/name/${searchQuery}`;
        } else if (continentFilter !== "All") {
          url = `https://restcountries.com/v3.1/region/${continentFilter}`;
        } else {
          url = `https://restcountries.com/v3.1/all`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("No matching countries found");
        const data = await res.json();

        const filteredData =
          searchQuery && continentFilter !== "All"
            ? data.filter((country) => country.region === continentFilter)
            : data;

        setCountriesData(filteredData);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setCountriesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [searchQuery, continentFilter]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleContinentChange = (e) => setContinentFilter(e.target.value);

  // Pagination
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentCountries = countriesData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(countriesData.length / ITEMS_PER_PAGE);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 bg-gradient-to-br from-white to-green-50 min-h-screen">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="🔍 Search by country name"
          className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <select
          value={continentFilter}
          onChange={handleContinentChange}
          className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          <option value="All">🌍 All Continents</option>
          <option value="Africa">🌍 Africa</option>
          <option value="Americas">🌎 Americas</option>
          <option value="Asia">🌏 Asia</option>
          <option value="Europe">🌍 Europe</option>
          <option value="Oceania">🌊 Oceania</option>
          <option value="Antarctic">❄️ Antarctic</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <BlinkBlur color="#32cd32" size="medium" />
        </div>
      ) : countriesData.length > 0 ? (
        <>
          {/* Country Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentCountries.map((country) => (
              <Link
                to={`/countries/${country.name.common}`}
                state={country}
                key={country.cca3}
              >
                <CountriesCard
                  image={country.flags.svg}
                  name={country.name.common}
                  population={country.population.toLocaleString("en-IN")}
                  region={country.region}
                  capital={country.capital?.[0]}
                />
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {/* Pagination Controls */}
          <div className="flex justify-center mt-12 gap-2 flex-wrap text-sm font-medium">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-green-100 disabled:opacity-40"
            >
              &lt;
            </button>

            {/* Dynamic Page Numbers with Ellipsis */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                );
              })
              .reduce((acc, page, i, arr) => {
                if (i > 0 && page - arr[i - 1] > 1) acc.push("ellipsis");
                acc.push(page);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "ellipsis" ? (
                  <span
                    key={idx}
                    className="w-10 h-10 flex items-center justify-center text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(item)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 border ${
                      currentPage === item
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-green-100 disabled:opacity-40"
            >
              &gt;
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-20">
          No countries found for{" "}
          <span className="font-semibold text-black">
            "{searchQuery || continentFilter}"
          </span>
        </p>
      )}
    </div>
  );
};

export default CountriesList;
