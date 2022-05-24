import { IconButton, Tooltip } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import React, { useState } from 'react';
import { BoardCreator } from '..';
import { useTranslation } from 'react-i18next';

function CreateBoardButton() {
  const { t } = useTranslation();
  const [isOpened, setOpened] = useState(false);

  const toggleIsOpened = () => {
    setOpened((prev) => !prev);
  };

  const handleClick = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <Tooltip title={t('pages.mainPage.createBtn')} sx={{ fontSize: '14px' }}>
        <IconButton aria-label="create new board" onClick={handleClick}>
          <NoteAddOutlinedIcon color="secondary" />
        </IconButton>
      </Tooltip>
      <BoardCreator isOpened={isOpened} onCancel={toggleIsOpened} />
    </>
  );
}

export default CreateBoardButton;
