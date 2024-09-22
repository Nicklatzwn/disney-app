import { useCallback } from 'react';
import { useThemeContext } from '@/theme';

/**
 * useEventSwitchDarkMode Hook
 *
 * This custom hook provides an event handler to toggle between dark and light modes in the application.
 * It uses the context provided by the theme to access the toggle functionality.
 *
 * @returns {() => void} A function that, when called, toggles the current theme between dark and light modes.
 */
export function useEventSwitchDarkMode(): () => void {
  const { toggleDarkMode } = useThemeContext();

  return useCallback(() => {
    toggleDarkMode();
  }, [toggleDarkMode]);
}
