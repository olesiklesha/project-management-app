import React from 'react';
import Portal from '../Portal';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteModalSlice } from '../../store/reducers/deleteModalSlice';
import { boardsSlice } from '../../store/reducers/boardsSlice';

interface IModalProps {
  isOpened: boolean;
  onCancel: () => void;
  children?: JSX.Element | JSX.Element[];
}

export default function Modal({ isOpened, onCancel, children }: IModalProps) {
  const { t } = useTranslation();
  const { targetId } = useAppSelector((state) => state.deleteModalSlice);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  //
  // const handleAction = () => {
  //   if (action) {
  //     action();
  //     onCancel();
  //   }
  // };

  const handleDelete = () => {
    dispatch(boardsSlice.actions.deleteBoard(targetId));
    dispatch(deleteModalSlice.actions.close());
  };

  return (
    <>
      {isOpened && (
        <Portal>
          <Box
            onClick={handleClick}
            sx={{
              position: 'fixed',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '1110',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'ghostwhite',
                borderRadius: '4px',
                padding: '3rem',
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
                  <Typography variant="h5" component="h3" sx={{ fontFamily: 'Ubuntu' }}>
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
                    <Button variant="outlined" color="error" onClick={handleDelete}>
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
