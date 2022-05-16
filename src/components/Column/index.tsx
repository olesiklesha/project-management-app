import { Paper, Box, Button, IconButton } from '@mui/material';
import { EditableHeader, EditableTask, TaskCreator } from '..';
import { boardSlice, IColumn } from '../../store/reducers/board';
import { theme } from '../../theme';
import { useAppDispatch } from '../../hooks/redux';
import { useCallback, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

interface IColumnProps {
  children?: JSX.Element | JSX.Element[];
  columnInfo: IColumn;
}

function Column({ columnInfo }: IColumnProps) {
  const { title, id, order, tasks } = columnInfo;
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const deleteColumn = () => {
    dispatch(boardSlice.actions.deleteColumn(id));
  };

  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

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
      <Box sx={{ p: '0 8px 12px 8px', display: 'flex', justifyContent: 'space-between' }}>
        <EditableHeader title={title} id={id} order={order} tasks={tasks} />
        <IconButton color="secondary" onClick={deleteColumn}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
          p: '0 8px 12px 8px',
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
        }}
      >
        {columnInfo.tasks.map((task) => (
          <EditableTask title={task.title} id={task.id} order={task.order} key={task.id} />
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 'none', m: '10px' }}
        onClick={toggleIsOpened}
        startIcon={<AddIcon />}
      >
        {t('pages.boardPage.addTask')}
      </Button>
      <TaskCreator isOpened={isOpened} toggleIsOpened={toggleIsOpened} id={id} />
    </Paper>
  );
}

export default Column;
