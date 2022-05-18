import React, { useState, useCallback } from 'react';
import { Paper, Button, Popper, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteTaskMutation } from '../../services';
import { Modal } from '..';

interface IPopperProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  columnId: string;
  taskId: string;
}

export default function TransitionsPopper({
  open,
  setOpen,
  boardId,
  columnId,
  taskId,
}: IPopperProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isOpened, setIsOpened] = useState(false);
  const toggleIsOpened = useCallback(() => {
    setIsOpened((isOpened) => !isOpened);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) {
      setAnchorEl(e.currentTarget);
      setOpen((previousOpen) => !previousOpen);
    }
  };

  const canBeOpen = open && Boolean(anchorEl);
  const idPopper = canBeOpen ? 'transition-popper' : undefined;

  const [deleteTask, {}] = useDeleteTaskMutation();

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 100 }}>
      <Button
        aria-describedby={idPopper}
        type="button"
        onClick={handleClick}
        startIcon={<EditIcon />}
        sx={{ borderRadius: '100%', p: '0.5rem', width: '20px', minWidth: '35px' }}
      />
      <Popper id={idPopper} open={open} anchorEl={anchorEl} transition placement="right-start">
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                p: '1rem 1.5rem',
                margin: '0 0.25rem',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0.5rem',
                boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Button
                color="secondary"
                size="small"
                sx={{ width: '100%', mb: '0.5rem' }}
                variant="outlined"
              >
                Open task
              </Button>
              <Button
                color="secondary"
                size="small"
                sx={{ width: '100%' }}
                variant="outlined"
                onClick={toggleIsOpened}
              >
                Delete task
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Modal
        isOpened={isOpened}
        onCancel={toggleIsOpened}
        onConfirm={() => {
          deleteTask({
            boardId: boardId,
            columnId: columnId,
            taskId: taskId,
          });
        }}
      />
    </div>
  );
}
