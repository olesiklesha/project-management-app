import { Box, Button, TextField } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal, Column } from '../../components';

function Board() {
  // const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState(false);

  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    //request
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 128px)',
        maxWidth: 'calc(100vw - 28px)',
        m: '1rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        columnGap: '1rem',
        overflowX: 'auto',
      }}
    >
      {/* <Typography variant="h2" sx={{ fontFamily: 'Ubuntu' }}>
          {t('pages.boardPage.title')}.
        </Typography> */}
      <Column />
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleIsOpened}
        sx={{ width: '272px', minWidth: '272px' }}
      >
        + Добавить колонку
      </Button>
      <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <TextField
            {...register('name')}
            type="text"
            placeholder="Введите название колонки"
            fullWidth
            inputProps={{
              style: {
                fontSize: '1.5rem',
                fontWeight: 'bold',
              },
            }}
            autoFocus
          />
          <Button>Создать</Button>
          <Button onClick={toggleIsOpened}>Отмена</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Board;
