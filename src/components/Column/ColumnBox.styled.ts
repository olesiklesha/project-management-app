import { Box, styled } from '@mui/material';

const ColumnBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem',
  padding: '0 8px 12px 8px',
  minHeight: 0,
  maxHeight: 'calc(100vh - 270px)',
  overflowX: 'hidden',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4rem',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: `inset 0 0 6px ${theme.palette.primary.main}`,
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    borderRadius: '2rem',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2rem',
  },
}));

export default ColumnBox;
