import { FunctionComponent, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import {
  getCharacters,
  getCharactersParams,
  getCharactersTotalCount,
  getError,
  isCharactersFirstRequest,
  isCharactersLoading,
} from '@/store/characters';
import { fetchCharacters } from '@/store/characters/charactersSlice';
import {
  IconButton,
  Stack,
  TableFooter,
  TablePagination,
  Tooltip,
  TableSortLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { clearError, setId } from '@/store/characters';
import { CharactersTableFilters, CharactersTableLoader, CharactersTablePaginationActions } from './childComponents';
import { TOrder } from '@/models/reusableTypes';
import { sortArray } from '@/utils';
import { StyledActionTableCell, StyledTableFooterRow, StyledTableBodyRow } from '@/assets/styles';
import { TRequestCharacters } from '@/models/requestInterfaces';
import { CharactersTableEmpty } from './childComponents';
import { PAGE_INIT, ROWS_PER_PAGE } from '@/assets/consts';

/**
 * CharactersTable Component
 *
 * This component displays a table of Disney characters along with their associated media, such as TV shows
 * and video games. It provides sorting, pagination, and filtering functionalities, allowing users to interact
 * with the data effectively. Additionally, it handles loading states and errors gracefully.
 *
 * @component CharactersTable
 * @returns {JSX.Element} A table displaying characters with their details, including sorting and pagination.
 */
const CharactersTable: FunctionComponent = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<TOrder>('asc');
  const characters = useSelector(getCharacters);
  const isLoading = useSelector(isCharactersLoading);
  const charactersTotalCount = useSelector(getCharactersTotalCount);
  const charactersError = useSelector(getError);
  const charactersFirstRequest = useSelector(isCharactersFirstRequest);
  const params = useSelector(getCharactersParams);
  const sortedCharacters = sortArray(characters, order, 'name');
  const { page, pageSize } = params;

  const handleSort = () => setOrder(order === 'asc' ? 'desc' : 'asc');
  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) =>
    onFetchCharacters({ ...params, page: newPage });
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onFetchCharacters({ ...params, page: PAGE_INIT, pageSize: parseInt(event.target.value, 10) });
  const onFetchCharacters = (params: TRequestCharacters) => dispatch(fetchCharacters({ ...params }));
  const onSetId = (id: number) => dispatch(setId(id));

  useEffect(() => {
    onFetchCharacters({ page, pageSize });
  }, []);

  return (
    <>
      <CharactersTableFilters
        shouldFieldsBeDisabled={!sortedCharacters?.length && charactersFirstRequest}
        pageSize={pageSize}
        onFetchCharacters={onFetchCharacters}
      />
      <Stack position="relative">
        <TableContainer
          variant="outlined"
          sx={{
            height: '70vh',
          }}
          component={Paper}
        >
          <CharactersTableLoader isLoading={isLoading} />
          <CharactersTableEmpty isEmpty={!sortedCharacters?.length && !charactersFirstRequest} />
          {sortedCharacters?.length > 0 && (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell width="35%" align="center">
                    <TableSortLabel sx={{ ml: 3 }} active direction={order} onClick={handleSort}>
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell width="10%" align="center">
                    TV Shows
                  </TableCell>
                  <TableCell width="10%" align="center">
                    Video Games
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Allies
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Enemies
                  </TableCell>
                  <StyledActionTableCell width="5%" align="center">
                    Details
                  </StyledActionTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCharacters.map((row) => (
                  <StyledTableBodyRow key={row._id}>
                    <TableCell width="35%" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell width="10%" align="center">
                      {row.tvShows.length}
                    </TableCell>
                    <TableCell width="10%" align="center">
                      {row.videoGames.length}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {row.allies.length ? row.allies.join(', ') : '-'}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {row.enemies.length ? row.enemies.join(', ') : '-'}
                    </TableCell>
                    <StyledActionTableCell width="5%" align="center">
                      <Tooltip title={`View details of character ${row.name}`}>
                        <IconButton children={<OpenInFullIcon />} onClick={() => onSetId(row._id)} />
                      </Tooltip>
                    </StyledActionTableCell>
                  </StyledTableBodyRow>
                ))}
              </TableBody>
              <TableFooter
                sx={{
                  position: 'sticky',
                  bottom: -1,
                  backgroundColor: theme.palette.background.default,
                  zIndex: 1,
                }}
              >
                <StyledTableFooterRow>
                  <TablePagination
                    rowsPerPageOptions={ROWS_PER_PAGE}
                    colSpan={6}
                    count={charactersTotalCount}
                    rowsPerPage={pageSize}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={CharactersTablePaginationActions}
                  />
                </StyledTableFooterRow>
              </TableFooter>
            </Table>
          )}
        </TableContainer>
      </Stack>
      <Snackbar open={!!charactersError} onClose={() => dispatch(clearError())}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {charactersError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CharactersTable;
