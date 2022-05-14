import React from 'react';
import { IShortBoard } from '../../models';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Card } from '@mui/material';

function ShortBoard({ id, title }: IShortBoard) {
  const path = AppRoutes.MAIN + `/${id}`;
  return (
    <Card component={NavLink} to={path}>
      {title}
    </Card>
  );
}

export default ShortBoard;
