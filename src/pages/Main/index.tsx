import React, { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BoardCreator, Modal, ShortBoard } from '../../components';
import { useGetAllBoardsQuery } from '../../services';
import { apiErrorParser } from '../../utils';
import { IRequestError } from '../../models';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function Main() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useGetAllBoardsQuery(undefined, {
    pollingInterval: 30000,
  });

  const [isOpened, setOpened] = useState(false);
  const boards = data || [];

  const toggleIsOpened = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontFamily: 'Ubuntu', mb: 1 }}>
          {t('pages.mainPage.title')}
        </Typography>
        <Button
          variant="contained"
          onClick={toggleIsOpened}
          startIcon={<AddCircleRoundedIcon color="secondary" />}
        >
          {t('pages.mainPage.createBtn')}
        </Button>
        {isLoading && (
          <CircularProgress
            size={40}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
        {isError && <Alert severity="error">{apiErrorParser(error as IRequestError, t)}</Alert>}
        {!isLoading && (
          <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
            {boards.length > 0 &&
              boards.map((board) => (
                <Grid item xs={12} sm={6} md={3} key={board.id}>
                  <ShortBoard id={board.id} title={board.title} description={board.description} />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
      <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
        <BoardCreator onCancel={toggleIsOpened} />
      </Modal>
    </Box>
  );
}

export default Main;
