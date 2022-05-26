import { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../hooks/redux';
import { apiErrorParser } from '../../utils';
import { IRequestError } from '../../models';

function ErrorToast() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const error = useAppSelector((state) => state.globalErrorSlice.globalError);

  useEffect(() => {
    if (error) setOpen(true);
  }, [error]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity="error">
        {apiErrorParser(error as IRequestError, t)}
      </Alert>
    </Snackbar>
  );
}

export default ErrorToast;
