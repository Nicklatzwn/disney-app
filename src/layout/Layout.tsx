import { FunctionComponent } from 'react';
import { Stack } from '@mui/material';
import { MainContent, TopBar } from './childComponents';
import { Outlet } from 'react-router-dom';

/**
 * Layout Component
 *
 * This component serves as the primary layout for the application, providing a consistent structure
 * that includes a top navigation bar and a main content area. It utilizes React Router's `Outlet`
 * to render nested routes within the layout.
 *
 * @component Layout
 * @returns {JSX.Element} The layout structure containing the top bar and main content area.
 */
const Layout: FunctionComponent = (): JSX.Element => {
  return (
    <Stack height="100vh">
      <TopBar />
      <MainContent children={<Outlet />} />
    </Stack>
  );
};

export default Layout;
