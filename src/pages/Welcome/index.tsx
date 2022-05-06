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
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { theme } from '../../theme';
import YoutubeIframe from '../../components/YoutubeIframe';

function Welcome() {
  const CustomizedBox = styled(Box)`
    background: linear-gradient(0deg, #fff, ${theme.palette.background.paper} 100%);
    min-height: 80vh;
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
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            {' '}
            <Typography component="h3" sx={{ fontFamily: 'Ubuntu', fontSize: '2.5rem' }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Typography sx={{ fontSize: '1.5rem' }}>
              Cum, voluptatibus accusantium delectus ipsum laboriosam maxime nam excepturi, dolorem
              saepe aliquam magni est ex ut quos temporibus reiciendis quia facilis molestiae.
            </Typography>
          </Box>
          <img src="./pixlr-bg-result.png" style={{ minHeight: 'calc(80vh - 64px)' }} />
        </Container>
      </CustomizedBox>

      <Container
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '3rem' }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="h2"
          sx={{ fontFamily: 'Ubuntu', fontSize: '2.5rem', textAlign: 'center', mb: '3rem' }}
        >
          How to use app
        </Typography>
        <YoutubeIframe />
      </Container>

      <Container sx={{ display: 'flex', justifyContent: 'center' }} component="section">
        <Grid item xs={12} sm={8} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            component="h2"
            sx={{ fontFamily: 'Ubuntu', fontSize: '2.5rem', textAlign: 'center', mb: '3rem' }}
          >
            Team
          </Typography>
          <Box sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src="./alex.jpg" alt="" sx={{ width: 100, height: 100 }} />
              <Box sx={{ ml: 2, width: '70%' }}>
                <Typography component="h3" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  Alex
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum eum
                  excepturi consectetur, molestias ut velit itaque autem aliquid minima laboriosam
                  voluptas voluptates, quas quia fugit obcaecati, culpa illo! Ab?
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ ml: 2, width: '70%' }}>
                <Typography component="h3" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  Artyom
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum eum
                  excepturi consectetur, molestias ut velit itaque autem aliquid minima laboriosam
                  voluptas voluptates, quas quia fugit obcaecati, culpa illo! Ab?
                </Typography>
              </Box>
              <Avatar src="./tyoma.jpg" alt="" sx={{ width: 100, height: 100 }} />
            </Box>
          </Box>

          <Box sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src="./roma.jpg" alt="" sx={{ width: 100, height: 100 }} />
              <Box sx={{ ml: 2, width: '70%' }}>
                <Typography component="h3" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  Roma
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum eum
                  excepturi consectetur, molestias ut velit itaque autem aliquid minima laboriosam
                  voluptas voluptates, quas quia fugit obcaecati, culpa illo! Ab?
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
    </>
  );
}

export default Welcome;
