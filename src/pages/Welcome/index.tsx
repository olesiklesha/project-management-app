import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LinkRss from '../../components/Footer/LinkRss.styled';
import { CustomizedBox, CustomizedImg, CustomizedTypography } from './WelcomeComponent.styled';
import { LocaleSelector, WelcomeHeader, Profile, YoutubeIframe } from '../../components';
import { TEAM_INFO } from '../../constants';

function Welcome() {
  const { t } = useTranslation();

  return (
    <>
      <WelcomeHeader />
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
            <Typography sx={{ fontSize: '1.5rem' }} component="h4">
              Cum, voluptatibus accusantium delectus ipsum laboriosam maxime nam excepturi, dolorem
              saepe aliquam magni est exut &nbsp;
              <LocaleSelector />
              &nbsp; quos temporibus reiciendis quia facilis molestiae.
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
        <CustomizedTypography>{t('pages.welcomePage.howToUse')}</CustomizedTypography>
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
          <CustomizedTypography>{t('pages.welcomePage.team')}</CustomizedTypography>
          {TEAM_INFO.map((el, index) => (
            <Profile
              name={el.name}
              avatar={el.avatar}
              description={el.description}
              gh={el.gh}
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
