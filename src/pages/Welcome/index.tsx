import React from 'react';
import { AppBar, Button, BottomNavigation, Box, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes, TEAM_INFO } from '../../constants';
import { useTranslation } from 'react-i18next';
import YoutubeIframe from '../../components/YoutubeIframe';
import Profile from '../../components/Profile';
import HomeIcon from '../../components/Header/home-icon.styled';
import LinkRss from '../../components/Footer/LinkRss.styled';
import { CustomizedBox, CustomizedImg, CustomizedTypography } from './WelcomeComponent.styled';

function Welcome() {
  const { t } = useTranslation();

  return (
    <>
      <AppBar color="primary" position="relative" sx={{ boxShadow: 'none' }}>
        <BottomNavigation component="nav" sx={{ padding: '16px', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon fontSize="large" />
            <Typography
              variant="h4"
              gutterBottom
              component="h1"
              sx={{ mb: 0, ml: 1, fontFamily: 'Ubuntu', fontSize: '2rem', fontWeight: 'bold' }}
            >
              Cream
            </Typography>
          </Box>
          <Box>
            <Button component={Link} to={AppRoutes.LOG_IN} color="secondary">
              {t('pages.welcomePage.logInButton')}
            </Button>
            <Button component={Link} to={AppRoutes.SIGN_IN} color="secondary" variant="contained">
              {t('pages.welcomePage.signInButton')}
            </Button>
          </Box>
        </BottomNavigation>
      </AppBar>
      <CustomizedBox color="secondary" component="section">
        <Container
          sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Box>
            <Typography
              component="h3"
              sx={{ fontFamily: 'Ubuntu', fontSize: '2.5rem', mt: '2rem' }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Typography sx={{ fontSize: '1.5rem' }}>
              Cum, voluptatibus accusantium delectus ipsum laboriosam maxime nam excepturi, dolorem
              saepe aliquam magni est ex ut quos temporibus reiciendis quia facilis molestiae.
            </Typography>
          </Box>
          <CustomizedImg
            sx={{
              minHeight: {
                xs: 'auto',
                sm: 'calc(70vh - 64px)',
                md: 'calc(80vh - 64px)',
              },
              width: {
                xs: 'calc(80vw - 10px)',
              },
            }}
            src="./pixlr-bg-result.png"
            alt=""
          />
        </Container>
      </CustomizedBox>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '3rem' }}
      >
        <CustomizedTypography>How to use app</CustomizedTypography>
        <YoutubeIframe />
      </Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="section"
      >
        <Grid item xs={12} sm={8} md={6}>
          <CustomizedTypography>Team</CustomizedTypography>
          {TEAM_INFO.map((el, index) => (
            <Profile
              name={el.name}
              avatar={el.avatar}
              description={el.description}
              key={el.name}
              index={index}
            />
          ))}
        </Grid>
        <LinkRss sx={{ fontSize: 200 }} />
        <Typography sx={{ fontFamily: 'Roboto', fontSize: '1rem', fontWeight: 'normal' }}>
          © 2022
        </Typography>
      </Container>
    </>
  );
}

export default Welcome;
