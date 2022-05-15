import React from 'react';
import Portal from '../Portal';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/redux';
import { boardsSlice } from '../../store/reducers/boardsSlice';

interface IModalProps {
  isOpened: boolean;
  onCancel: () => void;
  children?: JSX.Element | JSX.Element[];
  id?: string;
}

export default function Modal({ isOpened, onCancel, children, id }: IModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleDelete = () => {
    if (!id) return;

    dispatch(boardsSlice.actions.deleteBoard(id));
    onCancel();
  };

  return (
    <>
      {isOpened && (
        <Portal>
          <Box
            onClick={handleClick}
            sx={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '1110',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                backgroundColor: 'ghostwhite',
                borderRadius: '4px',
                pr: { xs: '1.5rem', md: '3rem' },
                pl: { xs: '1.5rem', md: '3rem' },
                pt: '3rem',
                pb: '3rem',
                m: 2,
                mr: 4,
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                }}
                onClick={onCancel}
              >
                <CloseRoundedIcon />
              </IconButton>
              {children || (
                <Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontFamily: 'Ubuntu' }}
                    align="center"
                  >
                    {t('components.confirmModal.text')}
                  </Typography>
                  <Stack
                    sx={{
                      justifyContent: 'center',
                      marginTop: '1.5rem',
                    }}
                    direction="row"
                    spacing={1}
                  >
                    <Button variant="text" color="inherit" onClick={handleClick}>
                      {t('answers.no')}
                    </Button>
                    <Button variant="contained" color="warning" onClick={handleDelete}>
                      {t('answers.yes')}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
        </Portal>
      )}
    </>
  );
}
