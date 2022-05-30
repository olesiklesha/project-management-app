import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { BoardCreator, Modal } from '..';
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
        <Button
          color="inherit"
          startIcon={<NoteAddOutlinedIcon color="secondary" sx={{ mr: -0.5 }} />}
          sx={{ textTransform: 'none', fontWeight: 700 }}
          onClick={handleClick}
        >
          {t('pages.mainPage.createBtn')}
        </Button>
      </Tooltip>
      <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
        <BoardCreator onCancel={toggleIsOpened} />
      </Modal>
    </>
  );
}

export default CreateBoardButton;
