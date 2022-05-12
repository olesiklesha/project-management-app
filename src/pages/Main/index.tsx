import React, { useCallback, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { counterSlice } from '../../store/reducers/testSlice';
import { Modal } from '../../components';

function Main() {
  const { t } = useTranslation();
  const { count } = useAppSelector((state) => state.testSlice);
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const [isConfirmOpened, setIsConfirmOpened] = useState(false);

  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

  const toggleIsConfirmOpened = useCallback(() => {
    setIsConfirmOpened((prev) => !prev);
  }, []);

  const testAction = () => {
    console.log('toggle confirm');
  };

  const handleIncrement = () => {
    dispatch(counterSlice.actions.increment());
  };

  const handleDecrement = () => {
    dispatch(counterSlice.actions.decrement());
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ fontFamily: 'Ubuntu' }}>
          {t('pages.mainPage.title')}.
        </Typography>
        <h2>The quick brown fox jumps over the lazy dog.</h2>
        <div>{count}</div>
        <Button variant="contained" color="secondary" onClick={handleIncrement}>
          +
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDecrement}>
          -
        </Button>
        <Button variant="contained" color="secondary" onClick={toggleIsOpened}>
          Show modal
        </Button>
        <Button variant="contained" color="secondary" onClick={toggleIsConfirmOpened}>
          Show confirm modal
        </Button>
      </Container>
      <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
        <p>this is modal</p>
      </Modal>
      <Modal isOpened={isConfirmOpened} onCancel={toggleIsConfirmOpened} action={testAction} />
    </Box>
  );
}

export default Main;
