import { Card, CardContent, CardHeader, IconButton, Stack, Tooltip } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { FunctionComponent, useState } from 'react';
import { CharactersTable } from '@/components/charactersTable';
import { CharacterDetails } from '@/components/characterDetails';
import { FilmsParticipation } from '@/components/filmsParticipation';
import { useSelector } from 'react-redux';
import { getCharacters, isCharactersLoading } from '@/store/characters';

/**
 * Dashboard Component
 *
 * This component represents the main dashboard page of the application, showcasing a list of Disney characters,
 * their details, and film participation statistics. It provides users with the ability to toggle between the
 * characters list and film statistics.
 *
 * @component Dashboard
 * @returns {JSX.Element} The dashboard view containing character data and interaction options..
 */
const Dashboard: FunctionComponent = (): JSX.Element => {
  const [openStatistics, setOpenStatistics] = useState<boolean>(false);
  const toggleStatistics = () => setOpenStatistics(!openStatistics);
  const charactersLoading = useSelector(isCharactersLoading);
  const characters = useSelector(getCharacters);
  const disabled = charactersLoading || !characters.length;

  return (
    <Stack padding={2}>
      <Card variant="outlined">
        <CardHeader
          title="Disney Characters"
          action={
            <Tooltip title="Films participation per page">
              <span>
                <IconButton data-testid="pie-chart-films-participation" onClick={toggleStatistics} disabled={disabled}>
                  <BarChartIcon />
                </IconButton>
              </span>
            </Tooltip>
          }
        />
        <CardContent>
          <CharactersTable />
        </CardContent>
      </Card>
      <CharacterDetails />
      <FilmsParticipation open={openStatistics} onClose={toggleStatistics} />
    </Stack>
  );
};

export default Dashboard;
