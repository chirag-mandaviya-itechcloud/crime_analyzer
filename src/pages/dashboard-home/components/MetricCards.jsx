import React from "react";
import Icon from "../../../components/AppIcon";

const MetricCards = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-white rounded-lg border border-border p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-text-secondary text-sm font-medium mb-1">{metric.title}</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-text-primary">{metric.value.toLocaleString()}</span>
                <span className="ml-2 text-sm font-medium flex items-center">
                  {metric.change > 0 ? (
                    <span className="text-danger flex items-center">
                      <Icon name="TrendingUp" size={16} className="mr-0.5" />
                      {Math.abs(metric.change)}%
                    </span>
                  ) : (
                    <span className="text-success flex items-center">
                      <Icon name="TrendingDown" size={16} className="mr-0.5" />
                      {Math.abs(metric.change)}%
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className={`p-2 rounded-full ${metric.change > 0 ? 'bg-red-50 text-danger' : 'bg-green-50 text-success'}`}>
              <Icon name={metric.icon} size={20} />
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <button className="text-xs text-primary hover:text-primary-dark font-medium flex items-center">
              <span>View detailed breakdown</span>
              <Icon name="ChevronRight" size={14} className="ml-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;