import React from "react";
import Icon from "../../../components/AppIcon";

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "incident":
        return "AlertCircle";
      case "alert":
        return "Bell";
      case "report":
        return "FileText";
      default:
        return "Activity";
    }
  };
  
  const getActivityColor = (type) => {
    switch (type) {
      case "incident":
        return "text-danger bg-red-50";
      case "alert":
        return "text-warning bg-amber-50";
      case "report":
        return "text-info bg-blue-50";
      default:
        return "text-text-secondary bg-slate-50";
    }
  };

  return (
    <div className="divide-y divide-border">
      {activities.length === 0 ? (
        <div className="p-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-slate-50 rounded-full mb-3">
            <Icon name="Inbox" size={24} className="text-text-tertiary" />
          </div>
          <p className="text-text-secondary">No recent activity to display</p>
        </div>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-background transition-colors">
            <div className="flex">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)} mr-3`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-text-primary text-sm">{activity.title}</h4>
                
                {activity.location && (
                  <div className="flex items-center mt-1 text-xs text-text-secondary">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span>{activity.location}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-text-tertiary">{activity.time}</span>
                  
                  <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-text-secondary">
                    {activity.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      
      <div className="p-3 text-center">
        <button className="text-sm text-primary hover:text-primary-dark font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;