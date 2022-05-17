import { Alert, Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';

interface IErrorWrapperProps {
  children: JSX.Element | JSX.Element[];
}

function ErrorWrapper({ children }: IErrorWrapperProps) {
  const [open, setOpen] = useState(false);
  const error = useAppSelector((state) => state.globalErrorSlice.globalError);

  useEffect(() => {
    if (error) setOpen(true);
  }, [error]);

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert severity="error">This is an error message!</Alert>
      </Snackbar>
    </>
  );
}

export default ErrorWrapper;
