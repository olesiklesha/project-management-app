import React, { useCallback, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { Modal } from '../../components';
import Board from '../Board';
import ShortBoard from '../../components/ShortBoard';

function Main() {
  const { t } = useTranslation();
  const { boards } = useAppSelector((state) => state.boardsSlice);
  const dispatch = useAppDispatch();
  // const [isOpened, setIsOpened] = useState(false);
  // const [isConfirmOpened, setIsConfirmOpened] = useState(false);
  //
  // const toggleIsOpened = useCallback(() => {
  //   setIsOpened((isOpened) => !isOpened);
  // }, []);
  //
  // const toggleIsConfirmOpened = useCallback(() => {
  //   setIsConfirmOpened((prev) => !prev);
  // }, []);
  //
  // const testAction = () => {
  //   console.log('toggle confirm');
  // };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontFamily: 'Ubuntu' }}>
          {t('pages.mainPage.title')}.
        </Typography>
        <h2>The quick brown fox jumps over the lazy dog.</h2>
        {boards.length > 0 &&
          boards.map((board) => <ShortBoard id={board.id} title={board.title} key={board.id} />)}
      </Container>
    </Box>
  );
}

// <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
//   <p>this is modal</p>
// </Modal>
// <Modal isOpened={isConfirmOpened} onCancel={toggleIsConfirmOpened} action={testAction} />

export default Main;
