import React, { useState } from 'react';
import { Paper, Box, Button, IconButton } from '@mui/material';
import { EditableHeader, EditableTask, Modal, TaskCreator } from '..';
import { theme } from '../../theme';
import { Add, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ColumnBox from './ColumnBox.styled';
import { useDeleteColumnMutation } from '../../services';
import { useParams } from 'react-router-dom';
import { IColumnData } from '../../models';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IColumnProps {
  columnInfo: IColumnData;
  index: number;
}

function Column({ columnInfo, index }: IColumnProps) {
  const { title, id, order, tasks } = columnInfo;
  const { id: idBoard } = useParams();
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const toggleIsOpened = () => {
    setIsOpened((isOpened) => !isOpened);
  };

  const [isOpenedConfirm, setIsOpenedConfirm] = useState(false);
  const toggleIsOpenedConfirm = () => {
    setIsOpenedConfirm((isOpenedConfirm) => !isOpenedConfirm);
  };

  const [deleteColumn] = useDeleteColumnMutation();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          sx={{
            width: '272px',
            minWidth: '272px',
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            mr: '1rem',
          }}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Box sx={{ p: '0 8px 12px 8px', display: 'flex', justifyContent: 'space-between' }}>
            <EditableHeader title={title} id={id} order={order} tasks={tasks} />
            <IconButton color="secondary" onClick={toggleIsOpenedConfirm}>
              <Delete />
            </IconButton>
          </Box>
          <Droppable droppableId={id}>
            {(provided) => (
              <ColumnBox ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, i) => (
                  <EditableTask
                    title={task.title}
                    id={task.id}
                    order={task.order}
                    key={task.id}
                    description={task.description}
                    userId={task.userId}
                    boardId={String(idBoard)}
                    columnId={id}
                    index={i}
                  />
                ))}
                {provided.placeholder}
              </ColumnBox>
            )}
          </Droppable>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: 'none',
              m: '10px',
              order: 1000,
            }}
            onClick={toggleIsOpened}
            startIcon={<Add />}
          >
            {t('pages.boardPage.addTask')}
          </Button>
          <TaskCreator isOpened={isOpened} toggleIsOpened={toggleIsOpened} id={id} />
          <Modal
            isOpened={isOpenedConfirm}
            onCancel={toggleIsOpenedConfirm}
            onConfirm={() => deleteColumn({ boardId: String(idBoard), columnId: id })}
          />
        </Paper>
      )}
    </Draggable>
  );
}

export default Column;
