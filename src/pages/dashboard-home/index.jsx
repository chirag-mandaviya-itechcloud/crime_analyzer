import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import MapVisualization from "./components/MapVisualization";
import MetricCards from "./components/MetricCards";
import TimeFilterSelector from "./components/TimeFilterSelector";
import RecentActivity from "./components/RecentActivity";
import { getDateRange } from "utils/dateUtils";

const DashboardHome = () => {
  const [timeFilter, setTimeFilter] = useState("30");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const baseUrl = "http://localhost:8000";

      const { startDate, endDate } = getDateRange(90);

      // Dynamic/custom parameter keys
      const params = {
        reported_date_after: startDate, // e.g., "fromDate"
        reported_date_before: endDate, // e.g., "toDate"
      };

      try {
        // // Simulate API call with timeout
        // await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await axios.get(`${baseUrl}/get_crime_counts`, {
          params,
        });

        const responseData = response.data.Data;
        console.log(response.data.Data);

        const metrics = responseData.counts.slice(0, 3).map((item, index) => {
          return {
            id: index,
            title: item.crime_type_name,
            value: item.count,
            change: 2.1,
            icon: "Home",
          };
        });

        const centers = responseData.map_data.center;

        const hotspots = responseData.map_data.hotspots
          .slice(0, 3)
          .map((item, index) => {
            return {
              id: index,
              lat: item.latitude,
              lng: item.longitude,
              count: item.count,
              category: "Crime",
            };
          });

        const recentActivity = responseData.recent
          .slice(0, 3)
          .map((item, index) => {
            return {
              id: index,
              type: "incident",
              title: item.crime_type_name,
              location: item.location,
              time: "recently",
              category: item.premises_name,
            };
          });

        const data = {
          metrics: metrics,
          mapData: {
            center: centers,
            hotspots: hotspots,
          },
          recentActivity: recentActivity,
        };

        // Mock data based on selected time filter
        // const data = {
        //   metrics: [
        //     {
        //       id: 1,
        //       title: "Violent Crimes",
        //       value:
        //         timeFilter === "7" ? 127 : timeFilter === "30" ? 486 : 1254,
        //       change:
        //         timeFilter === "7" ? -3.2 : timeFilter === "30" ? 2.8 : 5.6,
        //       icon: "AlertTriangle",
        //     },
        //     {
        //       id: 2,
        //       title: "Property Crimes",
        //       value:
        //         timeFilter === "7" ? 342 : timeFilter === "30" ? 1248 : 3567,
        //       change:
        //         timeFilter === "7" ? 1.5 : timeFilter === "30" ? -2.1 : -4.3,
        //       icon: "Home",
        //     },
        //     {
        //       id: 3,
        //       title: "Public Disorder",
        //       value: timeFilter === "7" ? 89 : timeFilter === "30" ? 376 : 982,
        //       change:
        //         timeFilter === "7" ? -5.7 : timeFilter === "30" ? -1.9 : 0.8,
        //       icon: "Users",
        //     },
        //   ],
        //   mapData: {
        //     center: { lat: 34.0522, lng: -118.2437 },
        //     hotspots: [
        //       {
        //         id: 1,
        //         lat: 34.052,
        //         lng: -118.243,
        //         count: timeFilter === "7" ? 23 : timeFilter === "30" ? 87 : 214,
        //         category: "Theft",
        //       },
        //       {
        //         id: 2,
        //         lat: 34.047,
        //         lng: -118.251,
        //         count: timeFilter === "7" ? 18 : timeFilter === "30" ? 65 : 176,
        //         category: "Assault",
        //       },
        //       {
        //         id: 3,
        //         lat: 34.058,
        //         lng: -118.235,
        //         count: timeFilter === "7" ? 12 : timeFilter === "30" ? 43 : 118,
        //         category: "Vandalism",
        //       },
        //       {
        //         id: 4,
        //         lat: 34.061,
        //         lng: -118.248,
        //         count: timeFilter === "7" ? 9 : timeFilter === "30" ? 38 : 97,
        //         category: "Burglary",
        //       },
        //       {
        //         id: 5,
        //         lat: 34.043,
        //         lng: -118.267,
        //         count: timeFilter === "7" ? 15 : timeFilter === "30" ? 56 : 143,
        //         category: "Robbery",
        //       },
        //     ],
        //   },
        //   recentActivity: [
        //     {
        //       id: 1,
        //       type: "incident",
        //       title: "Multiple vehicle break-ins reported",
        //       location: "Downtown area",
        //       time: "2 hours ago",
        //       category: "Property Crime",
        //     },
        //     {
        //       id: 2,
        //       type: "alert",
        //       title: "Increased activity detected",
        //       location: "North District",
        //       time: "5 hours ago",
        //       category: "Pattern Recognition",
        //     },
        //     {
        //       id: 3,
        //       type: "report",
        //       title: "Weekly crime summary generated",
        //       time: "Yesterday",
        //       category: "System",
        //     },
        //   ],
        // };
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeFilter]);

  const handleTimeFilterChange = (value) => {
    console.log(value);
    setTimeFilter(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Crime Analytics Dashboard
            </h1>
            <p className="text-text-secondary mt-1">
              Real-time insights and crime pattern analysis
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <TimeFilterSelector
              value={timeFilter}
              onChange={handleTimeFilterChange}
              isLoading={isLoading}
            />

            <div className="flex space-x-2">
              <Link
                to="/data-analysis-view"
                className="btn btn-ghost py-2 px-3 text-sm flex items-center"
              >
                <Icon name="BarChart" size={16} className="mr-1.5" />
                Data Analysis
              </Link>

              <Link
                to="/sentiment-analysis-report"
                className="btn btn-ghost py-2 px-3 text-sm flex items-center"
              >
                <Icon name="PieChart" size={16} className="mr-1.5" />
                Sentiment Report
              </Link>
            </div>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Icon name="AlertCircle" className="text-danger mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-danger">
                  Error Loading Dashboard
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => handleTimeFilterChange(timeFilter)}
                  className="mt-2 text-sm font-medium text-danger hover:text-red-800 flex items-center"
                >
                  <Icon name="RefreshCw" size={14} className="mr-1" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-lg border border-border p-4 h-32 animate-pulse"
                  >
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                    <div className="h-8 bg-slate-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <MetricCards metrics={dashboardData?.metrics || []} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <h2 className="font-semibold text-text-primary">
                      Crime Hotspot Map
                    </h2>
                    <button className="text-text-secondary hover:text-primary p-1 rounded">
                      <Icon name="Maximize2" size={18} />
                    </button>
                  </div>

                  <div className="relative" style={{ height: "60vh" }}>
                    {isLoading ? (
                      <div className="absolute inset-0 bg-slate-50 animate-pulse flex items-center justify-center">
                        <Icon name="Map" size={48} className="text-slate-200" />
                      </div>
                    ) : (
                      <MapVisualization
                        center={dashboardData?.mapData.center}
                        hotspots={dashboardData?.mapData.hotspots}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg border border-border h-full">
                  <div className="p-4 border-b border-border">
                    <h2 className="font-semibold text-text-primary">
                      Recent Activity
                    </h2>
                  </div>

                  {isLoading ? (
                    <div className="p-4 space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="animate-pulse">
                          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                          <div className="mt-3 border-b border-border pb-3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <RecentActivity
                      activities={dashboardData?.recentActivity || []}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardHome;
