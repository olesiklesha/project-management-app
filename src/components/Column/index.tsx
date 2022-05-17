import { Paper, Box, Button, IconButton } from '@mui/material';
import { EditableHeader, EditableTask, TaskCreator } from '..';
import { boardSlice, IColumn } from '../../store/reducers/board';
import { theme } from '../../theme';
import { useAppDispatch } from '../../hooks/redux';
import { useCallback, useState } from 'react';
import { Add, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ColumnBox from './ColumnBox.styled';

interface IColumnProps {
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
          <Delete />
        </IconButton>
      </Box>
      <ColumnBox>
        {columnInfo.tasks.map((task) => (
          <EditableTask title={task.title} id={task.id} order={task.order} key={task.id} />
        ))}
      </ColumnBox>
      <Button
        variant="contained"
        sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 'none', m: '10px' }}
        onClick={toggleIsOpened}
        startIcon={<Add />}
      >
        {t('pages.boardPage.addTask')}
      </Button>
      <TaskCreator isOpened={isOpened} toggleIsOpened={toggleIsOpened} id={id} />
    </Paper>
  );
}

export default Column;
