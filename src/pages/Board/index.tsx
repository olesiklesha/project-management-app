import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { AppBreadcrumbs, Column, ColumnCreator } from '../../components';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import BoardBox from './BoardBox.styled';
import { useParams } from 'react-router-dom';
import { useEditColumnMutation, useGetBoardQuery } from '../../services';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { sortByOrder } from '../../utils';
import { IColumnData } from '../../models';

function Board() {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const { id } = useParams();
  // const [sortedColumns, setSortedColumns] = useState<IColumnData[]>([]);
  const [editColumn] = useEditColumnMutation();

  const { data, isLoading } = useGetBoardQuery(String(id));

  // useEffect(() => {
  //   // setSortedColumns()
  //   if (!data) return;
  //   const val = sortByOrder(data.columns);
  //   setSortedColumns(val as IColumnData[]);
  // }, [data]);

  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || !data) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const [column] = data.columns.filter((el) => el.id === draggableId);
      console.log('destination', destination);
      console.log('source', source);
      editColumn({
        boardId: data.id,
        columnId: draggableId,
        body: {
          title: column.title,
          order: destination.index + 1,
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
    <Box>
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
                sortByOrder(data.columns).map((el, i) => (
                  <Column columnInfo={el} key={el.id} index={i} />
                ))}
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
              <ColumnCreator isOpened={isOpened} toggleIsOpened={toggleIsOpened} />
            </BoardBox>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export default Board;
