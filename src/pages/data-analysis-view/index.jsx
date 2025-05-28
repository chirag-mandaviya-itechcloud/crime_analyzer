import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import FilterPanel from "./components/FilterPanel";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import Breadcrumbs from "./components/Breadcrumbs";
import Icon from "../../components/AppIcon";
import { getDateRange } from "utils/dateUtils";
import axios from "axios";

const DataAnalysisView = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    crimeType: "all",
    dataSource: "all",
    dateRange: "90days",
  });

  // Mock data for the charts
  // const mockData = {
  //   lineChartData: [
  //     { date: "2023-01-01", count: 12 },
  //     { date: "2023-01-08", count: 19 },
  //     { date: "2023-01-15", count: 15 },
  //     { date: "2023-01-22", count: 25 },
  //     { date: "2023-01-29", count: 22 },
  //     { date: "2023-02-05", count: 30 },
  //     { date: "2023-02-12", count: 28 },
  //     { date: "2023-02-19", count: 15 },
  //     { date: "2023-02-26", count: 21 },
  //     { date: "2023-03-05", count: 24 },
  //     { date: "2023-03-12", count: 18 },
  //     { date: "2023-03-19", count: 22 },
  //   ],
  //   barChartData: [
  //     { category: "Theft", count: 145 },
  //     { category: "Assault", count: 87 },
  //     { category: "Fraud", count: 113 },
  //     { category: "Vandalism", count: 76 },
  //     { category: "Drug Offenses", count: 92 },
  //     { category: "Burglary", count: 65 },
  //   ],
  // };

  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
      const { startDate, endDate } = getDateRange(filters.dateRange);

      // Dynamic/custom parameter keys
      const params = {
        reported_date_after: startDate, // e.g., "fromDate"
        reported_date_before: endDate, // e.g., "toDate"
      };
      try {
        // Simulate API call
        // await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await axios.get(`${baseUrl}/get_chart_data`, {
          params,
        });

        const responseData = response.data;
        console.log(responseData);

        const lineChartData = responseData.Data.lineChartData.map(
          (item, index) => {
            return {
              id: index,
              date: item.reported_date,
              count: item.count,
            };
          }
        );

        const barChartData = responseData.Data.barChartData.map(
          (item, index) => {
            return {
              id: index,
              category: item.crime_type_name,
              count: item.count,
            };
          }
        );

        const data = {
          lineChartData: lineChartData,
          barChartData: barChartData,
        };

        setData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleDownload = () => {
    // In a real application, this would generate and download a CSV file
    alert("Downloading data as CSV...");
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header variant="contextual" />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />

          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {/* Filter Panel (20% width) */}
            <div className="w-full md:w-1/5">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Main Content Area (80% width) */}
            <div className="w-full md:w-4/5">
              <div className="bg-white p-4 rounded-lg border border-border shadow-sm mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Crime Frequency Over Time
                  </h2>
                  <button
                    onClick={handleDownload}
                    className="btn btn-ghost py-1.5 px-3 text-sm flex items-center"
                  >
                    <Icon name="Download" size={16} className="mr-1.5" />
                    Export CSV
                  </button>
                </div>

                {loading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-40 w-full bg-slate-200 rounded"></div>
                      <div className="mt-4 h-4 w-48 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <Icon
                      name="AlertCircle"
                      size={32}
                      className="text-danger mb-2"
                    />
                    <p className="text-text-secondary mb-4">{error}</p>
                    <button
                      onClick={handleRetry}
                      className="btn btn-primary py-1.5 px-4 text-sm"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <LineChart data={data?.lineChartData || []} />
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Crime Categories Comparison
                  </h2>
                </div>

                {loading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-40 w-full bg-slate-200 rounded"></div>
                      <div className="mt-4 h-4 w-48 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <Icon
                      name="AlertCircle"
                      size={32}
                      className="text-danger mb-2"
                    />
                    <p className="text-text-secondary mb-4">{error}</p>
                    <button
                      onClick={handleRetry}
                      className="btn btn-primary py-1.5 px-4 text-sm"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <BarChart data={data?.barChartData || []} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataAnalysisView;
