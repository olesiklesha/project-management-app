import { Button } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
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
    <BoardBox>
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
    </BoardBox>
  );
}

export default Board;
