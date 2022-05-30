import React, { useState } from 'react';
import { TextareaAutosize, Box, Typography, ClickAwayListener } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ITask } from '../../models';
import { useEditTaskMutation } from '../../services';
import TransitionsPopper from '../Popper';
import { Draggable } from 'react-beautiful-dnd';
import { TaskModal, Modal } from '..';
import { handleFocus } from '../../utils';

interface IFormData {
  name: string;
}

type IDraggableTask = ITask & { index: number };

function EditableTask({
  title,
  id,
  order,
  userId,
  boardId,
  columnId,
  index,
  description,
}: IDraggableTask) {
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);
  const clickAwayHandler = () => {
    if (isEditing) {
      handleSubmit(onSubmit)();
    }
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: title,
    },
  });

  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const toggleIsEditorOpened = () => {
    setIsEditorOpened((prev) => !prev);
    if (isEditorOpened) setIsEditing(false);
  };

  const [editTask] = useEditTaskMutation();

  const onSubmit = async (data: IFormData) => {
    const res = data.name ?? title;
    setIsEditing(false);
    setShow(false);
    setValue('name', res);

    if (title === res) return;

    editTask({
      boardId,
      columnId,
      taskId: id,
      body: {
        title: res,
        order,
        description,
        userId,
        boardId,
        columnId,
      },
    });
  };

  const onMouseover = () => setShow(true);
  const onMouseOut = () => {
    if (!isEditing) setShow(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Box
          sx={{ position: 'relative', mb: '1rem', minHeight: '48px' }}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <ClickAwayListener onClickAway={clickAwayHandler}>
            <Box onMouseOver={onMouseover} onMouseOut={onMouseOut}>
              {(show || isEditing) && (
                <>
                  <TransitionsPopper
                    boardId={boardId}
                    columnId={columnId}
                    taskId={id}
                    isPopperOpened={isEditing}
                    title={title}
                    description={description}
                    setIsPopperOpened={setIsEditing}
                    isEditorOpened={isEditorOpened}
                    setIsEditorOpened={setIsEditorOpened}
                  />
                  <Modal isOpened={isEditorOpened} onCancel={toggleIsEditorOpened}>
                    <TaskModal
                      boardId={boardId}
                      columnId={columnId}
                      taskId={id}
                      description={description}
                      title={title}
                      toggleIsEditorOpened={toggleIsEditorOpened}
                    />
                  </Modal>
                </>
              )}
              {isEditing ? (
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ position: 'relative' }}
                >
                  <TextareaAutosize
                    {...register('name')}
                    defaultValue={title}
                    autoFocus
                    onFocus={handleFocus}
                    style={{
                      width: '256px',
                      fontSize: '1rem',
                      fontFamily: 'Roboto',
                      lineHeight: '1.4',
                      padding: '10px',
                      resize: 'vertical',
                    }}
                  />
                </Box>
              ) : (
                <Typography
                  sx={{
                    p: '10px',
                    backgroundColor: 'white',
                    overflowWrap: 'break-word',
                    position: 'relative',
                    order: order,
                    boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>
          </ClickAwayListener>
        </Box>
      )}
    </Draggable>
  );
}

export default EditableTask;
