import { getCharactersParams, getCharactersTotalCount, getCharactersTotalPages } from '@/store/characters';
import { Box, IconButton } from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useSelector } from 'react-redux';
import { FunctionComponent } from 'react';
import { PAGE_INIT } from '@/assets/consts';

/**
 * CharactersTablePaginationActions Component
 *
 * A pagination control component that provides buttons for navigating through pages
 * of characters in a table. This component enhances user experience by allowing users
 * to easily switch between different pages of character data.
 *
 * @component CharactersTablePaginationActions
 * @param {TablePaginationActionsProps} props - The properties passed to the component,
 * which include handlers for page change events.
 * @param {function} props.onPageChange - A function to call when the page is changed,
 * accepting the event and the new page number as arguments.
 *
 * @returns {JSX.Element} A set of pagination buttons allowing navigation to the first,
 * previous, next, and last pages of character data.
 */
const CharactersTablePaginationActions: FunctionComponent<TablePaginationActionsProps> = (
  props: TablePaginationActionsProps
): JSX.Element => {
  const { onPageChange } = props;
  const charactersTotalPages = useSelector(getCharactersTotalPages);
  const charactersTotalCount = useSelector(getCharactersTotalCount);
  const { page } = useSelector(getCharactersParams);
  const isLastPage = charactersTotalCount !== -1;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, PAGE_INIT);
  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page + 1);
  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    charactersTotalPages && onPageChange(event, charactersTotalPages);

  return (
    <Box sx={{ flexShrink: 0 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 1} aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 1} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={isLastPage} aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={isLastPage} aria-label="last page">
        <LastPageIcon />
      </IconButton>
    </Box>
  );
};

export default CharactersTablePaginationActions;
