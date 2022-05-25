import React, { useState } from 'react';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BoardCreator, ShortBoard } from '../../components';
import { useGetAllBoardsQuery } from '../../services';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function Main() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllBoardsQuery(undefined, {
    pollingInterval: 30000,
  });

  const [isOpened, setOpened] = useState(false);

  const toggleIsOpened = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 128px)',
        background: (t) => `radial-gradient(${t.palette.primary.light} 1.55px, #ffffff 1.55px)`,
        backgroundSize: '31px 31px',
      }}
    >
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
        {!isLoading && (
          <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
            {data &&
              data.length > 0 &&
              data.map((board) => (
                <Grid item xs={12} sm={6} md={3} key={board.id}>
                  <ShortBoard id={board.id} title={board.title} description={board.description} />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
      <BoardCreator isOpened={isOpened} onCancel={toggleIsOpened} />
    </Box>
  );
}

export default Main;
