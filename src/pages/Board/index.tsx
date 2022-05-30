import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { AppBreadcrumbs, Column, ColumnCreator, Modal } from '../../components';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import BoardBox from './BoardBox.styled';
import { useParams } from 'react-router-dom';
import { useEditColumnMutation, useEditTaskMutation, useGetBoardQuery } from '../../services';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

function Board() {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const { id } = useParams();
  const [editColumn] = useEditColumnMutation();
  const [editTask] = useEditTaskMutation();

  const { data, isLoading } = useGetBoardQuery(String(id), {
    refetchOnFocus: true,
  });

  const toggleIsOpened = () => {
    setIsOpened((isOpened) => !isOpened);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || !data) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const [column] = data.columns.filter((el) => el.id === draggableId);
      editColumn({
        boardId: data.id,
        columnId: draggableId,
        body: {
          title: column.title,
          order: destination.index + 1,
        },
      });
    } else {
      const [column] = data.columns.filter((el) => el.id === source.droppableId);
      if (!column) return;
      const [task] = column.tasks.filter((el) => el.id === draggableId);
      const { title, description, userId } = task;

      editTask({
        boardId: data.id,
        columnId: source.droppableId,
        taskId: draggableId,
        body: {
          title,
          order: destination.index + 1,
          description,
          userId,
          boardId: data.id,
          columnId: destination.droppableId,
        },
      });
    }
  };

  return isLoading ? (
    <Box
      sx={{
        height: { xs: 'calc(100vh - 173.5px)', sm: 'calc(100vh - 128px)' },
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>
  ) : (
    <Box
      sx={{
        background: (t) => `radial-gradient(${t.palette.primary.light} 1.55px, #ffffff 1.55px)`,
        backgroundSize: '31px 31px',
      }}
    >
      {data && <AppBreadcrumbs title={data.title} />}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="column" direction="horizontal">
          {(provided) => (
            <BoardBox
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                height: {
                  xs: 'calc(100vh - 173.5px - 4.5rem)',
                  sm: 'calc(100vh - 128px - 4.5rem)',
                },
              }}
            >
              {data &&
                data.columns.map((el, i) => <Column columnInfo={el} key={el.id} index={i} />)}
              <Button
                variant="contained"
                color="secondary"
                onClick={toggleIsOpened}
                sx={{ width: '272px', minWidth: '272px', order: 1000 }}
                startIcon={<AddIcon />}
              >
                {t('pages.boardPage.addColumn')}
              </Button>
              {provided.placeholder}
              <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
                <ColumnCreator toggleIsOpened={toggleIsOpened} />
              </Modal>
            </BoardBox>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export default Board;
