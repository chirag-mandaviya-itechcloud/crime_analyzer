import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import DashboardHome from "./pages/dashboard-home";
import SentimentAnalysisReport from "./pages/sentiment-analysis-report";
import UserAuthentication from "./pages/user-authentication";
import DataAnalysisView from "./pages/data-analysis-view";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/sentiment-analysis-report" element={<SentimentAnalysisReport />} />
          <Route path="/data-analysis-view" element={<DataAnalysisView />} />
          <Route path="/user-authentication" element={<UserAuthentication />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;