import { styled } from '@mui/material/styles';

const FooterWrapper = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  minHeight: '64px',
  display: 'flex',
  alignItems: 'center',
  boxShadow:
    '0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)',
}));

export default FooterWrapper;
