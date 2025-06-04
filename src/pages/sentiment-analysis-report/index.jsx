import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import DateRangeSelector from "./components/DateRangeSelector";
import DonutChart from "./components/DonutChart";
import TagCloud from "./components/TagCloud";
import LineChart from "./components/LineChart";
import SourceFilter from "./components/SourceFilter";
import LoadingIndicator from "./components/LoadingIndicator";
import { getDateRange } from "utils/dateUtils";
import axios from "axios";

const SentimentAnalysisReport = () => {
  const { startDate, endDate } = getDateRange("7days");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);

  // Mock data for sentiment analysis
  const mockSentimentData = {
    overview: {
      positive: 42,
      neutral: 35,
      negative: 23,
    },
    topics: [
      { id: 1, name: "Public Safety", weight: 85, sentiment: 0.2 },
      { id: 2, name: "Police Response", weight: 65, sentiment: -0.3 },
      { id: 3, name: "Community Outreach", weight: 55, sentiment: 0.7 },
      { id: 4, name: "Neighborhood Watch", weight: 45, sentiment: 0.5 },
      { id: 5, name: "Traffic Violations", weight: 40, sentiment: -0.4 },
      { id: 6, name: "Drug Activity", weight: 38, sentiment: -0.6 },
      { id: 7, name: "Property Crime", weight: 35, sentiment: -0.5 },
      { id: 8, name: "Youth Programs", weight: 32, sentiment: 0.6 },
      { id: 9, name: "Emergency Services", weight: 30, sentiment: 0.4 },
      { id: 10, name: "Homelessness", weight: 28, sentiment: -0.2 },
      { id: 11, name: "Street Lighting", weight: 25, sentiment: 0.1 },
      { id: 12, name: "Noise Complaints", weight: 22, sentiment: -0.3 },
      { id: 13, name: "Community Events", weight: 20, sentiment: 0.8 },
      { id: 14, name: "School Safety", weight: 18, sentiment: 0.3 },
      { id: 15, name: "Parking Issues", weight: 15, sentiment: -0.1 },
    ],
    timeline: [
      { date: "2023-05-01", positive: 38, neutral: 40, negative: 22 },
      { date: "2023-05-08", positive: 40, neutral: 38, negative: 22 },
      { date: "2023-05-15", positive: 45, neutral: 35, negative: 20 },
      { date: "2023-05-22", positive: 42, neutral: 36, negative: 22 },
      { date: "2023-05-29", positive: 40, neutral: 35, negative: 25 },
      { date: "2023-06-05", positive: 38, neutral: 34, negative: 28 },
      { date: "2023-06-12", positive: 41, neutral: 33, negative: 26 },
      { date: "2023-06-19", positive: 44, neutral: 32, negative: 24 },
      { date: "2023-06-26", positive: 46, neutral: 33, negative: 21 },
      { date: "2023-07-03", positive: 45, neutral: 34, negative: 21 },
      { date: "2023-07-10", positive: 43, neutral: 35, negative: 22 },
      { date: "2023-07-17", positive: 42, neutral: 35, negative: 23 },
    ],
    sources: {
      social: {
        twitter: { positive: 40, neutral: 30, negative: 30 },
        facebook: { positive: 45, neutral: 35, negative: 20 },
        instagram: { positive: 50, neutral: 30, negative: 20 },
      },
      community: {
        forums: { positive: 35, neutral: 40, negative: 25 },
        reports: { positive: 30, neutral: 45, negative: 25 },
      },
      news: {
        local: { positive: 40, neutral: 35, negative: 25 },
        regional: { positive: 45, neutral: 30, negative: 25 },
      },
    },
  };

  // Fetch data based on filters
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
      const startDate = dateRange.startDate.toISOString().split("T")[0];
      const endDate = dateRange.endDate.toISOString().split("T")[0];

      // Dynamic/custom parameter keys
      const params = {
        tweet_date_after: startDate, // e.g., "fromDate"
        tweet_date_before: endDate, // e.g., "toDate"
      };
      console.log(params);

      try {
        const response = await axios.get(
          `${baseUrl}/get-sentiment-percentage`,
          {
            params,
          }
        );

        const responseData = response.data;
        console.log(response.data);

        const res = await axios.get(`${baseUrl}/get-word-cloud`);
        const resData = res.data;
        console.log(res.data);
        const overviewData = responseData.overview;
        const timelineData = responseData.timeline;
        const topics = resData.topics;

        const data = {
          overview: {
            positive: overviewData.positive,
            neutral: overviewData.neutral,
            negative: overviewData.negative,
          },
          timeline: timelineData,
          topics: topics,
          sources: {
            social: {
              twitter: { positive: 40, neutral: 30, negative: 30 },
              facebook: { positive: 45, neutral: 35, negative: 20 },
              instagram: { positive: 50, neutral: 30, negative: 20 },
            },
            community: {
              forums: { positive: 35, neutral: 40, negative: 25 },
              reports: { positive: 30, neutral: 45, negative: 25 },
            },
            news: {
              local: { positive: 40, neutral: 35, negative: 25 },
              regional: { positive: 45, neutral: 30, negative: 25 },
            },
          },
        };

        // Filter data based on selected source and topic
        let filteredData = { ...data };

        if (selectedSource !== "all") {
          // Apply source filtering logic here
          // This is simplified for the mock implementation
        }

        if (selectedTopic) {
          // Apply topic filtering logic here
          // This is simplified for the mock implementation
        }
        console.log(mockSentimentData);
        console.log(data);
        setSentimentData(filteredData);
      } catch (err) {
        console.error("Error fetching sentiment data:", err);
        setError("Failed to load sentiment data. Please try again later.");
        // Still set partial data for graceful degradation
        setSentimentData(mockSentimentData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange, selectedSource, selectedTopic]);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  const handleSourceChange = (source) => {
    setSelectedSource(source);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic === selectedTopic ? null : topic);
  };

  const handleShareReport = () => {
    // Generate shareable URL with current filters
    const shareableUrl = `${
      window.location.origin
    }/sentiment-analysis-report?start=${dateRange.start.toISOString()}&end=${dateRange.end.toISOString()}&source=${selectedSource}${
      selectedTopic ? `&topic=${selectedTopic}` : ""
    }`;

    // Copy to clipboard
    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        alert("Report URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        alert("Failed to copy URL. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="contextual" />

      <main className="container mx-auto px-4 py-6">
        {/* Page header with filters */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Sentiment Analysis Report
            </h1>
            <p className="text-text-secondary">
              Analysis of public sentiment from social media and community
              sources
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <DateRangeSelector
              dateRange={dateRange}
              onChange={handleDateRangeChange}
            />

            <button
              onClick={handleShareReport}
              className="inline-flex items-center px-3 py-2 border border-border rounded-md bg-white text-sm font-medium text-text-primary hover:bg-background transition-colors"
              aria-label="Share report"
            >
              <Icon
                name="Share2"
                size={16}
                className="mr-2 text-text-secondary"
              />
              Share
            </button>
          </div>
        </div>

        {/* Source filter */}
        <div className="mb-6">
          <SourceFilter
            selectedSource={selectedSource}
            onChange={handleSourceChange}
          />
        </div>

        {isLoading && <LoadingIndicator />}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-danger flex items-center">
              <Icon name="AlertTriangle" size={18} className="mr-2" />
              {error}
            </p>
          </div>
        )}

        {sentimentData && (
          <>
            {/* Sentiment overview */}
            <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm col-span-1">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Sentiment Overview
                </h2>
                <div className="flex items-center justify-center h-64">
                  <DonutChart
                    data={[
                      {
                        name: "Positive",
                        value: sentimentData.overview.positive,
                        color: "#059669",
                      },
                      {
                        name: "Neutral",
                        value: sentimentData.overview.neutral,
                        color: "#6B7280",
                      },
                      {
                        name: "Negative",
                        value: sentimentData.overview.negative,
                        color: "#DC2626",
                      },
                    ]}
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-success mr-1"></span>
                      <span className="text-sm font-medium">Positive</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {sentimentData.overview.positive}%
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-gray-500 mr-1"></span>
                      <span className="text-sm font-medium">Neutral</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {sentimentData.overview.neutral}%
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-danger mr-1"></span>
                      <span className="text-sm font-medium">Negative</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {sentimentData.overview.negative}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-border shadow-sm col-span-1 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Sentiment Timeline
                  </h2>
                  {selectedTopic && (
                    <div className="flex items-center">
                      <span className="text-sm text-text-secondary mr-2">
                        Filtered by:
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary">
                        {
                          sentimentData.topics.find(
                            (t) => t.id === selectedTopic
                          )?.name
                        }
                        <button
                          onClick={() => setSelectedTopic(null)}
                          className="ml-1.5 text-primary hover:text-primary-dark"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    </div>
                  )}
                </div>
                <div className="h-64">
                  <LineChart data={sentimentData.timeline} />
                </div>
              </div>
            </div>

            {/* Trending topics */}
            <div className="mb-8 bg-white p-6 rounded-lg border border-border shadow-sm">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Trending Topics
              </h2>
              <p className="text-text-secondary text-sm mb-4">
                Click on any topic to filter the sentiment data. Size indicates
                frequency of mentions.
              </p>
              <div className="h-64 flex items-center justify-center">
                <TagCloud
                  topics={sentimentData.topics}
                  onSelectTopic={handleTopicSelect}
                  selectedTopic={selectedTopic}
                />
              </div>
            </div>

            {/* Source breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Social Media Sentiment
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-border pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Twitter</span>
                      <span className="text-sm text-text-secondary">
                        {sentimentData.sources.social.twitter.positive}%
                        Positive
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${sentimentData.sources.social.twitter.positive}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="border-b border-border pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Facebook</span>
                      <span className="text-sm text-text-secondary">
                        {sentimentData.sources.social.facebook.positive}%
                        Positive
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${sentimentData.sources.social.facebook.positive}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Instagram</span>
                      <span className="text-sm text-text-secondary">
                        {sentimentData.sources.social.instagram.positive}%
                        Positive
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${sentimentData.sources.social.instagram.positive}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Community Sentiment
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-border pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Community Forums
                      </span>
                      <span className="text-sm text-text-secondary">
                        {sentimentData.sources.community.forums.positive}%
                        Positive
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${sentimentData.sources.community.forums.positive}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Direct Reports
                      </span>
                      <span className="text-sm text-text-secondary">
                        {sentimentData.sources.community.reports.positive}%
                        Positive
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${sentimentData.sources.community.reports.positive}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  News Media Sentiment
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-border pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Local News</span>
                      <span className="text-sm text-text-secondary">
                        {sentimentData.sources.news.local.positive}% Positive
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${sentimentData.sources.news.local.positive}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Regional News</span>
                      <span className="text-sm text-text-secondary">
                        {sentimentData.sources.news.regional.positive}% Positive
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${sentimentData.sources.news.regional.positive}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex justify-between items-center">
              <Link
                to="/dashboard-home"
                className="inline-flex items-center text-primary hover:text-primary-dark"
              >
                <Icon name="ArrowLeft" size={16} className="mr-1" />
                Back to Dashboard
              </Link>

              <Link
                to="/data-analysis-view"
                className="inline-flex items-center text-primary hover:text-primary-dark"
              >
                View Full Data Analysis
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </Link>
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-border py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} Crime Analyzer. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SentimentAnalysisReport;
