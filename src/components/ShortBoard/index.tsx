import React from 'react';
import { IShortBoard } from '../../models';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Card, Typography } from '@mui/material';

function ShortBoard({ id, title }: IShortBoard) {
  const path = AppRoutes.MAIN + `/${id}`;
  return (
    <Card component={NavLink} to={path} sx={{ display: 'block', p: 3, textDecoration: 'none' }}>
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
    </Card>
  );
}

export default ShortBoard;
