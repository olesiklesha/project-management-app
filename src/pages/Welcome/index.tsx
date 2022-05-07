import React from 'react';
import {
  AppBar,
  Button,
  BottomNavigation,
  Box,
  Typography,
  Container,
  styled,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes, TEAM_INFO } from '../../constants';
import { theme } from '../../theme';
import YoutubeIframe from '../../components/YoutubeIframe';
import Profile from '../../components/Profile';

function Welcome() {
  const CustomizedBox = styled(Box)`
    background: linear-gradient(0deg, #fff, ${theme.palette.background.paper} 100%);
    min-height: 80vh;
  `;

  const CustomizedTypography = styled(Typography)`
    font-family: Ubuntu;
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: bold;
  `;

  const CustomizedImg = styled('img')`
    min-height: calc(80vh - 64px);
  `;

  return (
    <>
      <AppBar color="primary" position="relative" sx={{ boxShadow: 'none' }}>
        <BottomNavigation component="nav" sx={{ padding: '16px', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: 40 }}>
              <path
                d="M0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM64 416H224V160H64V416zM448 160H288V416H448V160z"
                fill="#ffd803"
              />
            </svg>
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
              Log in
            </Button>
            <Button component={Link} to={AppRoutes.SIGN_IN} color="secondary" variant="contained">
              Sign in
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
      <Container sx={{ display: 'flex', justifyContent: 'center' }} component="section">
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
      </Container>
    </>
  );
}

export default Welcome;
