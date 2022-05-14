import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { BoardCreator, BoardEditor, Modal, ShortBoard } from '../../components';
import { boardCreatorSlice } from '../../store/reducers/boardCreatorSlice';
import { deleteModalSlice } from '../../store/reducers/deleteModalSlice';
import { editModalSlice } from '../../store/reducers/editModalSlice';

function Main() {
  const { t } = useTranslation();
  const { boards } = useAppSelector((state) => state.boardsSlice);
  const { isOpen } = useAppSelector((state) => state.boardCreatorSlice);
  const { isDeleteModalOpened } = useAppSelector((state) => state.deleteModalSlice);
  const { isEditModalOpened } = useAppSelector((state) => state.editModalSlice);
  const dispatch = useAppDispatch();

  const toggleIsCreatorOpened = () => {
    dispatch(boardCreatorSlice.actions.toggle());
  };

  const closeDeleteModal = () => {
    dispatch(deleteModalSlice.actions.close());
  };

  const closeEditModal = () => {
    dispatch(editModalSlice.actions.close());
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontFamily: 'Ubuntu' }}>
          {t('pages.mainPage.title')}.
        </Typography>
        <h2>The quick brown fox jumps over the lazy dog.</h2>
        <Button variant="contained" onClick={toggleIsCreatorOpened}>
          {t('pages.mainPage.createBtn')}
        </Button>
        <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
          {boards.length > 0 &&
            boards.map((board) => (
              <Grid item xs={12} sm={6} md={3} key={board.id}>
                <ShortBoard id={board.id} title={board.title} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Modal isOpened={isOpen} onCancel={toggleIsCreatorOpened}>
        <BoardCreator onCancel={toggleIsCreatorOpened} />
      </Modal>
      <Modal isOpened={isEditModalOpened} onCancel={closeEditModal}>
        <BoardEditor onCancel={closeEditModal} />
      </Modal>
      <Modal isOpened={isDeleteModalOpened} onCancel={closeDeleteModal} />
    </Box>
  );
}

export default Main;
