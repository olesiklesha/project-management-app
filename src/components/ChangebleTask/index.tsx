import { TextareaAutosize, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IRormData {
  name: string;
}

function EditableTask() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, settitle] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consequuntur fugiat repellendus distinctio vitae deserunt voluptas illum odit. Optio suscipit provident aspernatur deleniti laboriosam mollitia! Fuga architecto totam tempore obcaecati.tle'
  );

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: title,
    },
  });

  const onSubmit = async (data: IRormData) => {
    const res = data.name !== '' ? data.name : title;
    setIsEditing(false);
    settitle(res);
    setValue('name', res);
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
        <Typography onClick={() => setIsEditing(true)} sx={{ p: '10px', backgroundColor: 'white' }}>
          {title}
        </Typography>
      )}
    </>
  );
}

export default EditableTask;
