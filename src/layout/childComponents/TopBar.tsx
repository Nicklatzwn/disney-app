import { FunctionComponent } from 'react';
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material';
import { useEventSwitchDarkMode } from '@/hooks';
import { useThemeContext } from '@/theme';
import { PowerFactorsIcon } from '@/assets/icons';
import NightIcon from '@mui/icons-material/Brightness3';
import DayIcon from '@mui/icons-material/Brightness5';

/**
 * TopBar Component
 *
 * This component represents the top navigation bar of the application. It includes a logo or icon
 * and a toggle button to switch between light and dark modes, enhancing the user experience through
 * customizable theming.
 *
 * @component TopBar
 * @returns {JSX.Element} The top navigation bar containing the logo and theme toggle button.
 */
const TopBar: FunctionComponent = (): JSX.Element => {
  const { darkMode } = useThemeContext();
  const onSwitchDarkMode = useEventSwitchDarkMode();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <PowerFactorsIcon color={darkMode ? 'white' : 'dark'} />
        <Tooltip title={darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}>
          <IconButton children={darkMode ? <DayIcon /> : <NightIcon />} onClick={onSwitchDarkMode} />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
