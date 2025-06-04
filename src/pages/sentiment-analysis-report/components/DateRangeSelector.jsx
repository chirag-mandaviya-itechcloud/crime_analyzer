import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import { getDateRange } from "utils/dateUtils";

const DateRangeSelector = ({ dateRange, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState(dateRange);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const presetRanges = [
    { label: "Last 7 days", days: "7days" },
    { label: "Last 30 days", days: "30days" },
    { label: "Last 90 days", days: "90days" },
    { label: "Last 6 months", days: "6months" },
    { label: "Last year", days: "1year" },
  ];

  const handlePresetSelect = (days) => {
    const { startDate, endDate } = getDateRange(days);

    const newRange = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    setTempRange(newRange);
    onChange(newRange);
    setIsOpen(false);
  };

  const handleStartDateChange = (e) => {
    const newStart = new Date(e.target.value);
    setTempRange((prev) => ({ ...prev, startDate: newStart }));
  };

  const handleEndDateChange = (e) => {
    const newEnd = new Date(e.target.value);
    setTempRange((prev) => ({ ...prev, endDate: newEnd }));
  };

  const handleApply = () => {
    onChange(tempRange);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempRange(dateRange);
    setIsOpen(false);
  };

  const formatInputDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 border border-border rounded-md bg-white text-sm font-medium text-text-primary hover:bg-background transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Icon name="Calendar" size={16} className="mr-2 text-text-secondary" />
        <span>
          {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
        </span>
        <Icon
          name="ChevronDown"
          size={16}
          className="ml-2 text-text-secondary"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-text-primary mb-3">
              Select Date Range
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-text-secondary mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={formatInputDate(tempRange.startDate)}
                  onChange={handleStartDateChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium text-text-secondary mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={formatInputDate(tempRange.endDate)}
                  onChange={handleEndDateChange}
                  max={formatInputDate(new Date())}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-medium text-text-secondary mb-2">
              Presets
            </h4>
            <div className="space-y-2">
              {presetRanges.map((range) => (
                <button
                  key={range.days}
                  onClick={() => handlePresetSelect(range.days)}
                  className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-background transition-colors"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 border border-border rounded-md text-sm font-medium text-text-primary hover:bg-background transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1.5 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-light transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
