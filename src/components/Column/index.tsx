import { Paper, Box, Button, IconButton } from '@mui/material';
import { EditableHeader, EditableTask, Modal, TaskCreator } from '..';
import { IColumn } from '../../store/reducers/board';
import { theme } from '../../theme';
import { useCallback, useState } from 'react';
import { Add, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ColumnBox from './ColumnBox.styled';
import { useDeleteColumnMutation } from '../../services';
import { useParams } from 'react-router-dom';

interface IColumnProps {
  columnInfo: IColumn;
}

function Column({ columnInfo }: IColumnProps) {
  const { title, id, order, tasks } = columnInfo;
  const { id: idBoard } = useParams();
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState(false);
  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

  const [isOpenedConfirm, setIsOpenedConfirm] = useState(false);
  const toggleIsOpenedComfirm = useCallback(() => {
    setIsOpenedConfirm((isOpenedConfirm) => !isOpenedConfirm);
  }, []);

  const [deleteColumn, {}] = useDeleteColumnMutation();

  return (
    <>
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
          <IconButton color="secondary" onClick={toggleIsOpenedComfirm}>
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
      <Modal
        isOpened={isOpenedConfirm}
        onCancel={toggleIsOpenedComfirm}
        onConfirm={() => deleteColumn({ boardId: String(idBoard), columnId: id })}
      />
    </>
  );
}

export default Column;
