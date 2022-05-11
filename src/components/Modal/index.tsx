import React from 'react';
import Portal from '../Portal';
import { Box, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface IModalProps {
  isOpened: boolean;
  onCancel: () => void;
  children: JSX.Element | JSX.Element[];
}

export default function Modal({ isOpened, onCancel, children }: IModalProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
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
                onClick={handleClick}
              >
                <CloseRoundedIcon onClick={handleClick} />
              </IconButton>
              {children}
            </Box>
          </Box>
        </Portal>
      )}
    </>
  );
}
