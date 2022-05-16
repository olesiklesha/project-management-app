import { Box, Button } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { Column, ColumnCreator } from '../../components';
import { useAppSelector } from '../../hooks/redux';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

function Board() {
  const { t } = useTranslation();
  const { columns } = useAppSelector((state) => state.boardSlice);
  const [isOpened, setIsOpened] = useState(false);

  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

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
      {columns.map((el) => (
        <Column columnInfo={el} key={el.id} />
      ))}
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleIsOpened}
        sx={{ width: '272px', minWidth: '272px' }}
        startIcon={<AddIcon />}
      >
        {t('pages.boardPage.addColumn')}
      </Button>
      <ColumnCreator isOpened={isOpened} toggleIsOpened={toggleIsOpened} />
    </Box>
  );
}

export default Board;
