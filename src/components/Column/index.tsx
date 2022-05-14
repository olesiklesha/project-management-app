import { Paper, Box, Button, TextField } from '@mui/material';
import { EditableHeader, EditableTask } from '..';
import { theme } from '../../theme';

interface IColumnProps {
  children?: JSX.Element | JSX.Element[];
}

function Column({ children }: IColumnProps) {
  return (
    <Paper
      sx={{
        width: '272px',
        minWidth: '272px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: '0 8px 12px 8px' }}>
        <EditableHeader />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
          p: '0 8px 12px 8px',
          minHeight: 0,
          maxHeight: 'calc(100vh - 280px)',
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
        }}
      >
        <EditableTask />
        <EditableTask />
        <EditableTask />
      </Box>

      <Button
        variant="contained"
        sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 'none', m: '10px' }}
      >
        + Добавить карточку
      </Button>
    </Paper>
  );
}

export default Column;
