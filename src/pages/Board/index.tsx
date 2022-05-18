import { Button } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { Column, ColumnCreator } from '../../components';
import { useAppSelector } from '../../hooks/redux';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import BoardBox from './BoardBox.styled';
import { useParams } from 'react-router-dom';
import { useGetBoardQuery } from '../../services';

function Board() {
  const { t } = useTranslation();
  const { columns } = useAppSelector((state) => state.boardSlice.data);
  const [isOpened, setIsOpened] = useState(false);
  const { id } = useParams();
  const { isLoading, isError, error } = useGetBoardQuery(String(id));

  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

  return (
    <BoardBox
      sx={{ height: { xs: 'calc(100vh - 173.5px - 2rem)', sm: 'calc(100vh - 128px - 2rem)' } }}
    >
      {columns.map((el) => (
        <Column columnInfo={el} key={el.id} />
      ))}
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleIsOpened}
        sx={{ width: '272px', minWidth: '272px', order: 1000 }}
        startIcon={<AddIcon />}
      >
        {t('pages.boardPage.addColumn')}
      </Button>
      <ColumnCreator isOpened={isOpened} toggleIsOpened={toggleIsOpened} />
    </BoardBox>
  );
}

export default Board;
