import { Layout } from '@/layout';
import { Dashboard } from '@/pages/dashboard';
import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/**
 * AppRoutes Component
 *
 * This component manages the routing configuration for the application using `react-router-dom`. It defines
 * the main navigation paths and wraps the routes within a layout.
 *
 * @component AppRoutes
 * @returns {JSX.Element} A router component containing the application's route configuration.
 */
const AppRoutes: FunctionComponent = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
