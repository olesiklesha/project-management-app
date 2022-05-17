import { Box, styled } from '@mui/material';

const BoardBox = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 128px)',
  maxWidth: 'calc(100vw - 28px)',
  margin: '1rem',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'flex-start',
  columnGap: '1rem',
  overflowX: 'auto',
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

export default BoardBox;
