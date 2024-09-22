import { Box, CircularProgress } from '@mui/material';
import { FunctionComponent } from 'react';

interface IProps {
  isLoading: boolean;
}

/**
 * CharactersTableLoader Component
 *
 * A simple loading indicator that displays a circular progress spinner when data
 * is being fetched for the characters table. This component enhances the user experience
 * by providing visual feedback during loading states.
 *
 * @component CharactersTableLoader
 * @param {IProps} props - The properties passed to the component.
 * @param {boolean} props.isLoading - A flag indicating whether the loading spinner should be displayed.
 *
 * @returns {JSX.Element} A loading spinner centered within its container when `isLoading` is true,
 * or fragment when `isLoading` is false.
 */
const CharactersTableLoader: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const { isLoading } = props;

  return (
    <>
      {isLoading && (
        <Box position="absolute" display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default CharactersTableLoader;
