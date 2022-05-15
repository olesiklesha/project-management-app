import { IconButton, Tooltip } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { boardCreatorSlice } from '../../store/reducers/boardCreatorSlice';

function CreateBoardButton() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(boardCreatorSlice.actions.open());
  };

  return (
    <Tooltip title={'create board'}>
      <IconButton aria-label="create new board" onClick={handleClick}>
        <NoteAddOutlinedIcon color="secondary" />
      </IconButton>
    </Tooltip>
  );
}

export default CreateBoardButton;
