import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableBodyRow = styled(TableRow)(({ theme }) => ({
  '> td:last-child': {
    backgroundColor: theme.palette.background.default,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    '> td:last-child': {
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    },
  },
}));

export const StyledTableFooterRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StyledActionTableCell = styled(TableCell)(({ theme }) => ({
  position: 'sticky',
  right: 0,
  borderLeft: `1px dashed ${theme.palette.grey.A700}`,
}));
