import React from 'react';
import { IShortBoard } from '../../models';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteModalSlice } from '../../store/reducers/deleteModalSlice';

function ShortBoard({ id, title }: IShortBoard) {
  const path = AppRoutes.MAIN + `/${id}`;
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(deleteModalSlice.actions.open(id));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Card
      component={NavLink}
      to={path}
      sx={{ display: 'block', p: '2.5rem 1rem', textDecoration: 'none', position: 'relative' }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: 'Ubuntu',
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        <IconButton size="medium" onClick={handleDelete}>
          <DeleteIcon color="warning" fontSize="small" />
        </IconButton>
        <IconButton size="medium" onClick={handleEdit}>
          <EditIcon color="success" fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
}

export default ShortBoard;
