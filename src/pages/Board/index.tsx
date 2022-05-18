import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { AppBreadcrumbs, Column, ColumnCreator } from '../../components';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import BoardBox from './BoardBox.styled';
import { useParams } from 'react-router-dom';
import { useGetBoardQuery } from '../../services';

function Board() {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const { id } = useParams();

  const { data, isLoading } = useGetBoardQuery(String(id));

  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

  return isLoading ? (
    <Box
      sx={{
        height: { xs: 'calc(100vh - 173.5px)', sm: 'calc(100vh - 128px)' },
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>
  ) : (
    <Box>
      {data && <AppBreadcrumbs title={data.title} />}
      <BoardBox
        sx={{
          height: { xs: 'calc(100vh - 173.5px - 4.5rem)', sm: 'calc(100vh - 128px - 4.5rem)' },
        }}
      >
        {data && data.columns.map((el) => <Column columnInfo={el} key={el.id} />)}
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
      </BoardBox>
    </Box>
  );
}

export default Board;
