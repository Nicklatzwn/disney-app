import { FunctionComponent } from 'react';
import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface IProps {
  isEmpty: boolean;
}

/**
 * CharactersTableEmpty Component
 *
 * This component displays a message indicating that no results were found in the characters table. It is
 * designed to inform users when their search criteria yield no matching characters, providing guidance on
 * possible next steps to refine their search.
 *
 * @component CharactersTableEmpty
 * @param {IProps} props - The properties passed to the component.
 * @param {boolean} props.isEmpty - A flag indicating whether the table is empty (true) or not (false).
 *
 * @returns {JSX.Element} A message indicating no results found, or a fragment if the table is not empty.
 */
const CharactersTableEmpty: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const { isEmpty } = props;

  return (
    <>
      {isEmpty && (
        <Box position="absolute" display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
          <Box textAlign="center">
            <SearchOffIcon sx={{ width: 50, height: 50 }} />
            <Typography variant="h6" color="textSecondary">
              No results found
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Try adjusting your search filter criteria.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CharactersTableEmpty;
