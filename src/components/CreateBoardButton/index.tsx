import { IconButton, Tooltip } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import React, { useState } from 'react';
import { BoardCreator, Modal } from '../index';

function CreateBoardButton() {
  const [isOpened, setOpened] = useState(false);

  const toggleIsOpened = () => {
    setOpened((prev) => !prev);
  };

  const handleClick = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <Tooltip title={'create board'}>
        <IconButton aria-label="create new board" onClick={handleClick}>
          <NoteAddOutlinedIcon color="secondary" />
        </IconButton>
      </Tooltip>
      <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
        <BoardCreator onCancel={toggleIsOpened} />
      </Modal>
    </>
  );
}

export default CreateBoardButton;
