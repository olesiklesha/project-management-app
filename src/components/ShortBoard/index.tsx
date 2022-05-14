import React from 'react';
import { IShortBoard } from '../../models';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteModalSlice } from '../../store/reducers/deleteModalSlice';
import { editModalSlice } from '../../store/reducers/editModalSlice';

function ShortBoard({ id, title }: IShortBoard) {
  const path = AppRoutes.MAIN + `/${id}`;
  const dispatch = useDispatch();

  const handleBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.currentTarget.getAttribute('data-edit-board')) {
      dispatch(editModalSlice.actions.open({ id, title }));
    } else {
      dispatch(deleteModalSlice.actions.open(id));
    }
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
        <IconButton size="medium" onClick={handleBtnClick} data-delete-board>
          <DeleteIcon color="warning" fontSize="small" />
        </IconButton>
        <IconButton size="medium" onClick={handleBtnClick} data-edit-board>
          <EditIcon color="success" fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
}

export default ShortBoard;
