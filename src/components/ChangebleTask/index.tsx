import { TextareaAutosize, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { boardSlice, ITask } from '../../store/reducers/board';
import EditIcon from '@mui/icons-material/Edit';

interface IRormData {
  name: string;
}

function EditableTask({ title, id, order }: ITask) {
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: title,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: IRormData) => {
    const res = data.name !== '' ? data.name : title;
    setIsEditing(false);
    setValue('name', res);
    dispatch(boardSlice.actions.editTask({ title: res, id, order }));
    //request
  };

  return (
    <>
      {isEditing ? (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
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
            onClick={() => setIsEditing(true)}
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
            sx={{
              p: '10px',
              backgroundColor: 'white',
              overflowWrap: 'break-word',
              position: 'relative',
            }}
          >
            {title}
            {show && (
              <EditIcon
                sx={{
                  position: 'absolute',
                  right: '8px',
                  top: '8px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </Typography>
        </>
      )}
    </>
  );
}

export default EditableTask;
