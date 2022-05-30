import { Box, styled, Typography } from '@mui/material';
import { theme } from '../../theme';

export const CustomizedBox = styled(Box)`
  background: linear-gradient(0deg, #fff, ${theme.palette.background.paper} 100%);
  min-height: 80vh;
`;

export const CustomizedTypography = styled(Typography)`
  font-family: Ubuntu;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: bold;
`;

export const CustomizedImg = styled('img')`
  min-height: calc(80vh - 64px);
`;
