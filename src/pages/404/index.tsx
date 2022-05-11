import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WelcomeHeader from '../../components/WelcomeHeader';
import { CustomizedBox, CustomizedTypography } from '../Welcome/WelcomeComponent.styled';

interface Props {
  error?: Error | null;
  goBack?: () => void;
}
function ErrorPage({ error, goBack }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <WelcomeHeader goBack={goBack} />
      <CustomizedBox>
        <Container
          sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', pt: '4rem' }}
        >
          <CustomizedTypography>
            {error ? t('pages.page404.boundary') : t('pages.page404.message')}
          </CustomizedTypography>
          <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }} component="h4">
            {error ? error && error.toString() : t('pages.page404.text')}
          </Typography>
        </Container>
      </CustomizedBox>
    </>
  );
}

export default ErrorPage;
