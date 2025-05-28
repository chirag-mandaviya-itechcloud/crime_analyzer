import React from "react";
import Icon from "../../../components/AppIcon";

const FilterPanel = ({ filters, onFilterChange }) => {
  const crimeTypes = [
    { value: "all", label: "All Crime Types" },
    { value: "theft", label: "Theft" },
    { value: "assault", label: "Assault" },
    { value: "fraud", label: "Fraud" },
    { value: "vandalism", label: "Vandalism" },
    { value: "drug_offenses", label: "Drug Offenses" },
    { value: "burglary", label: "Burglary" },
  ];

  const dataSources = [
    { value: "all", label: "All Sources" },
    { value: "social_media", label: "Social Media" },
    { value: "news", label: "News Articles" },
    { value: "community", label: "Community Reports" },
    { value: "police", label: "Police Records" },
  ];

  const dateRanges = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "6months", label: "Last 6 Months" },
    { value: "1year", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
  ];

  const handleCrimeTypeChange = (e) => {
    onFilterChange({ crimeType: e.target.value });
  };

  const handleDataSourceChange = (e) => {
    onFilterChange({ dataSource: e.target.value });
  };

  const handleDateRangeChange = (e) => {
    onFilterChange({ dateRange: e.target.value });
  };

  const handleReset = () => {
    onFilterChange({
      crimeType: "all",
      dataSource: "all",
      dateRange: "30days",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <button
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-dark flex items-center"
        >
          <Icon name="RotateCcw" size={14} className="mr-1" />
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="crimeType" className="block text-sm font-medium text-text-secondary mb-1">
            Crime Type
          </label>
          <select
            id="crimeType"
            value={filters.crimeType}
            onChange={handleCrimeTypeChange}
            className="input-field text-sm"
          >
            {crimeTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dataSource" className="block text-sm font-medium text-text-secondary mb-1">
            Data Source
          </label>
          <select
            id="dataSource"
            value={filters.dataSource}
            onChange={handleDataSourceChange}
            className="input-field text-sm"
          >
            {dataSources.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-text-secondary mb-1">
            Date Range
          </label>
          <select
            id="dateRange"
            value={filters.dateRange}
            onChange={handleDateRangeChange}
            className="input-field text-sm"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {filters.dateRange === "custom" && (
          <div className="space-y-3 pt-2">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-text-secondary mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-text-secondary mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="input-field text-sm"
              />
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            className="w-full btn btn-primary py-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;