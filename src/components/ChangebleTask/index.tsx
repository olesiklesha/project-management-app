import { TextareaAutosize, Box, Typography, ClickAwayListener } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ITask } from '../../models/apiModels';
import { useEditTaskMutation } from '../../services';
import TransitionsPopper from '../Popper';

interface IFormData {
  name: string;
}

function EditableTask({ title, id, order, description, userId, boardId, columnId }: ITask) {
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setIsEditing(false);
    handleSubmit(onSubmit);
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: title,
    },
  });

  const [editTask, {}] = useEditTaskMutation();

  const onSubmit = async (data: IFormData) => {
    const res = data.name || title;
    setIsEditing(false);
    setShow(false);
    setValue('name', res);
    editTask({
      boardId: boardId,
      columnId: columnId,
      taskId: id,
      body: {
        title: res,
        order: order,
        description: res,
        userId: userId,
        boardId: boardId,
        columnId: columnId,
      },
    });
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <ClickAwayListener onClickAway={handleClose}>
        <Box onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
          {(show || isEditing) && (
            <TransitionsPopper
              open={isEditing}
              setOpen={setIsEditing}
              boardId={boardId}
              columnId={columnId}
              taskId={id}
            />
          )}
          {isEditing ? (
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              onBlur={handleSubmit(onSubmit)}
              sx={{ order: order, position: 'relative' }}
            >
              <TextareaAutosize
                {...register('name')}
                defaultValue={title}
                autoFocus
                style={{
                  width: '256px',
                  fontSize: '1rem',
                  fontFamily: 'Roboto',
                  lineHeight: '1.5',
                  padding: '10px',
                  resize: 'vertical',
                }}
              />
            </Box>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
}

export default EditableTask;
