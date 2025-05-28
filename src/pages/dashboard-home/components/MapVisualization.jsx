import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MapVisualization = ({ center, hotspots }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  
  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };
  
  const closeTooltip = () => {
    setSelectedHotspot(null);
  };
  
  // Calculate intensity color based on count
  const getIntensityColor = (count) => {
    if (count > 150) return "bg-red-500";
    if (count > 100) return "bg-red-400";
    if (count > 50) return "bg-orange-500";
    if (count > 25) return "bg-orange-400";
    return "bg-yellow-500";
  };

  return (
    <div className="relative w-full h-full">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Crime Hotspot Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${center.lat},${center.lng}&z=14&output=embed`}
        className="border-0"
      ></iframe>
      
      {/* Overlay hotspots on the map */}
      <div className="absolute inset-0 pointer-events-none">
        {hotspots.map((hotspot) => (
          <div 
            key={hotspot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ 
              left: `${Math.random() * 80 + 10}%`, 
              top: `${Math.random() * 80 + 10}%` 
            }}
            onClick={() => handleHotspotClick(hotspot)}
          >
            <div className={`${getIntensityColor(hotspot.count)} w-5 h-5 rounded-full flex items-center justify-center cursor-pointer relative`}>
              <div className={`${getIntensityColor(hotspot.count)} w-10 h-10 rounded-full absolute animate-ping opacity-30`}></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tooltip for selected hotspot */}
      {selectedHotspot && (
        <div 
          className="absolute bg-white rounded-lg shadow-lg border border-border p-3 z-10 w-64"
          style={{ 
            left: `${Math.random() * 60 + 20}%`, 
            top: `${Math.random() * 60 + 20}%` 
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-text-primary">{selectedHotspot.category} Hotspot</h3>
            <button 
              onClick={closeTooltip}
              className="text-text-tertiary hover:text-text-secondary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Incidents:</span>
              <span className="font-medium text-text-primary">{selectedHotspot.count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Category:</span>
              <span className="font-medium text-text-primary">{selectedHotspot.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Coordinates:</span>
              <span className="font-medium text-text-primary">
                {selectedHotspot.lat.toFixed(3)}, {selectedHotspot.lng.toFixed(3)}
              </span>
            </div>
          </div>
          
          <button className="mt-3 text-xs text-primary hover:text-primary-dark font-medium flex items-center">
            <Icon name="ExternalLink" size={12} className="mr-1" />
            View detailed analysis
          </button>
        </div>
      )}
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="bg-white rounded-full p-2 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary">
          <Icon name="Plus" size={18} />
        </button>
        <button className="bg-white rounded-full p-2 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary">
          <Icon name="Minus" size={18} />
        </button>
      </div>
      
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md border border-border">
        <h4 className="text-xs font-medium text-text-primary mb-2">Incident Density</h4>
        <div className="space-y-1.5">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs text-text-secondary">High (150+)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-xs text-text-secondary">Medium (50-150)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-xs text-text-secondary">Low (&lt;50)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;