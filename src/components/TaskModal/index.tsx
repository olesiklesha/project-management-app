import { Avatar, Box, Button, CircularProgress, TextareaAutosize, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEditTaskMutation, useGetTaskQuery, useGetUserQuery } from '../../services';
import { AppIcon } from '..';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { BaseSyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ITaskModalProps {
  boardId: string;
  columnId: string;
  taskId: string;
}

interface IFormrState {
  description: string;
}

function TaskModal({ boardId, columnId, taskId }: ITaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: columnData, isSuccess } = useGetTaskQuery({
    boardId,
    columnId,
    taskId,
  });

  const { data } = useGetUserQuery(isSuccess ? columnData.userId : skipToken);

  const { register, handleSubmit, setValue } = useForm<IFormrState>();

  const [editTask, {}] = useEditTaskMutation();

  const onSubmit = ({ description }: IFormrState, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    if (isSuccess) {
      const res = description ?? ' ';
      setIsEditing(false);
      // editTask({
      //   boardId: boardId,
      //   columnId: columnId,
      //   taskId: taskId,
      //   body: {
      //     title: columnData.title,
      //     order: columnData.order,
      //     description: res,
      //     userId: columnData.userId,
      //     boardId: boardId,
      //     columnId: columnId,
      //   },
      // });
      setValue('description', res);
    }
  };

  return (
    <>
      {isSuccess ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '1rem',
              minWidth: '33vw',
              mb: '1.5rem',
            }}
          >
            <AppIcon fontSize="large" />
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', width: '100%' }}>
              {columnData.title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '1rem',
              minWidth: '33vw',
              mb: '1rem',
              ml: '3rem',
            }}
          >
            <Avatar>{data?.name[0].toUpperCase()}</Avatar>
            <Typography sx={{ fontSize: '1rem' }}>{data?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '1rem',
              minWidth: '30vw',
              mb: '1rem',
            }}
          >
            <DehazeIcon color="secondary" fontSize="large" />
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold', width: '100%' }}>
              Description:
            </Typography>
          </Box>

          {isEditing ? (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextareaAutosize
                {...register('description')}
                placeholder="Add a more detailed description"
                defaultValue={columnData.description}
                minRows={4}
                autoFocus
                style={{
                  width: '90%',
                  fontSize: '1rem',
                  fontFamily: 'Roboto',
                  lineHeight: '1.5',
                  padding: '10px',
                  resize: 'none',
                  marginLeft: '3rem',
                  marginBottom: '0.5rem',
                }}
              />
              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{ marginLeft: '3rem', marginRight: '0.5rem' }}
                type="submit"
              >
                Submit
              </Button>
              <Button size="small" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <>
              <Typography
                onClick={() => setIsEditing(true)}
                sx={{
                  p: '10px',
                  backgroundColor: 'white',
                  overflowWrap: 'break-word',
                  position: 'relative',
                  boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.3)',
                  marginLeft: '3rem',
                  minHeight: '118px',
                }}
              >
                {columnData.description.trim().length === 0
                  ? 'Add a more detailed description'
                  : columnData.description.trim()}
              </Typography>
            </>
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default TaskModal;
