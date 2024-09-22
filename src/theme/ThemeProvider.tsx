import { FunctionComponent, createContext, useMemo, PropsWithChildren, useState, useContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { localStorageGet } from '@/utils';

interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/**
 * Create a ThemeContext to handle the dark mode state
 */
const ThemeContext = createContext<IThemeContext | undefined>(undefined);

/**
 * MUI theme options for "Dark Mode"
 *
 * This constant defines the Material-UI theme options when dark mode is active.
 *
 * @constant
 * @type {ThemeOptions}
 */
const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
};

/**
 * MUI theme options for "Light Mode"
 *
 * This constant defines the Material-UI theme options when light mode is active.
 *
 * @constant
 * @type {ThemeOptions}
 */
const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
  },
};

function getThemeByDarkMode(darkMode: boolean) {
  return darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME);
}

/**
 * ThemeProvider Component
 *
 * This component provides a global theme for the application using Material-UI's theming system,
 * and allows toggling between light and dark mode. It also persists the user's theme preference
 * using local storage.
 *
 * @component ThemeProvider
 * @param {PropsWithChildren} props - The children components to be wrapped by the ThemeProvider.
 * @returns {JSX.Element} A component that provides theming and dark mode toggle functionality.
 */
const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }: PropsWithChildren): JSX.Element => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const previousDarkMode = Boolean(localStorageGet('darkMode'));
  const [darkMode, setDarkMode] = useState<boolean>(previousDarkMode || prefersDarkMode);

  // Method to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  // Create the theme based on darkMode
  const currentTheme = useMemo(() => getThemeByDarkMode(darkMode), [darkMode]);
  const value = { darkMode, toggleDarkMode };

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * Hook: useThemeContext
 *
 * This hook provides access to the current theme context, allowing components to access
 * and modify the theme (e.g., toggle between dark and light modes).
 *
 * @throws {Error} If the hook is used outside of the `ThemeProvider` component.
 * @returns {IThemeContext} The current theme context, including the dark mode state and toggle function.
 */
const useThemeContext = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useThemeContext };
