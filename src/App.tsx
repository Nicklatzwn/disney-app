import { ThemeProvider } from '@/theme';
import { Provider } from 'react-redux';
import store from './store/store';
import { FunctionComponent } from 'react';
import { AppRoutes } from './routes';

/**
 * Root Application Component
 *
 * This component serves as the entry point of the application, encapsulating the global providers
 * necessary for the app's functionality, such as the Redux store provider and the custom theme provider.
 *
 * @component MainApp
 * @returns {JSX.Element} The root component wrapped with global providers.
 */

const MainApp: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default MainApp;
