import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const MapVisualization = ({ center, hotspots }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const getIntensityColor = (count) => {
    if (count > 150) return "bg-red-500";
    if (count > 100) return "bg-red-400";
    if (count > 50) return "bg-orange-500";
    if (count > 25) return "bg-orange-400";
    return "bg-yellow-500";
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={14}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {hotspots.map((hotspot) => (
          <Marker
            key={hotspot.id}
            position={[hotspot.lat, hotspot.lng]}
            eventHandlers={{
              click: () => setSelectedHotspot(hotspot),
            }}
            icon={L.divIcon({
              className: "",
              html: `
                <div class='relative w-5 h-5 ${getIntensityColor(
                  hotspot.count
                )} rounded-full flex items-center justify-center'>
                  <div class='absolute w-10 h-10 ${getIntensityColor(
                    hotspot.count
                  )} rounded-full animate-ping opacity-30'></div>
                </div>
              `,
              iconSize: [20, 20],
              iconAnchor: [10, 10], // Center of 20x20 div
            })}
          />
        ))}
      </MapContainer>

      {/* Tooltip */}
      {selectedHotspot && (
        <div
          className="absolute bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64 animate-fade-in"
          style={{ left: "50%", top: "20%", transform: "translate(-50%, 0)" }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">
              {selectedHotspot.category} Hotspot
            </h3>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Incidents:</span>
              <span className="font-medium text-gray-800">
                {selectedHotspot.count}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Category:</span>
              <span className="font-medium text-gray-800">
                {selectedHotspot.category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Coordinates:</span>
              <span className="font-medium text-gray-800">
                {selectedHotspot.lat.toFixed(3)},{" "}
                {selectedHotspot.lng.toFixed(3)}
              </span>
            </div>
          </div>
          <button className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium">
            🔗 View detailed analysis
          </button>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md border border-gray-200 animate-slide-up">
        <h4 className="text-xs font-medium text-gray-900 mb-2">
          Incident Density
        </h4>
        <div className="space-y-1.5">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs text-gray-600">High (150+)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-xs text-gray-600">Medium (50-150)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-xs text-gray-600">Low (&lt;50)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;
