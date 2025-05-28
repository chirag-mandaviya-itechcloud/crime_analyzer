import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SourceFilter = ({ selectedSource, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const sources = [
    { id: "all", name: "All Sources", icon: "Database" },
    { id: "social", name: "Social Media Only", icon: "Share2" },
    { id: "community", name: "Community Reports", icon: "Users" },
    { id: "news", name: "News Sources", icon: "Newspaper" }
  ];
  
  const handleSelect = (sourceId) => {
    onChange(sourceId);
    setIsOpen(false);
  };
  
  const selectedSourceObj = sources.find(s => s.id === selectedSource) || sources[0];
  
  return (
    <div className="relative">
      <div className="inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center px-4 py-2 bg-white border border-border rounded-md shadow-sm text-sm font-medium text-text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Icon name={selectedSourceObj.icon} size={16} className="mr-2 text-text-secondary" />
          {selectedSourceObj.name}
          <Icon name="ChevronDown" size={16} className="ml-2 text-text-secondary" />
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg border border-border animate-fade-in">
          <div className="py-1">
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => handleSelect(source.id)}
                className={`w-full text-left px-4 py-2 flex items-center text-sm ${
                  selectedSource === source.id 
                    ? 'bg-primary bg-opacity-10 text-primary' :'text-text-primary hover:bg-background'
                }`}
              >
                <Icon name={source.icon} size={16} className="mr-2" />
                {source.name}
                {selectedSource === source.id && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceFilter;