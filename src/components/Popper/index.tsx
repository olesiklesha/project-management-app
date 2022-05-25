import React, { useState } from 'react';
import { Paper, Button, Popper, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteTaskMutation } from '../../services';
import Modal from '../Modal';

interface IPopperProps {
  boardId: string;
  columnId: string;
  taskId: string;
  description: string;
  title: string;
  isPopperOpened: boolean;
  isEditorOpened: boolean;
  setIsPopperOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditorOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransitionsPopper({
  boardId,
  columnId,
  taskId,
  isPopperOpened,
  setIsPopperOpened,
  setIsEditorOpened,
  isEditorOpened,
}: IPopperProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isConfirmOpened, setIsConfirmOpened] = useState(false);

  const toggleIsPopperOpened = () => {
    setIsPopperOpened(true);
  };

  const toggleIsConfirm = () => {
    setIsConfirmOpened((prev) => !prev);
    if (isEditorOpened) setIsPopperOpened(false);
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    toggleIsPopperOpened();
  };

  const handleDelete = () => {
    toggleIsConfirm();
    if (isEditorOpened) setIsPopperOpened(false);
  };

  const handleEdit = () => {
    setIsEditorOpened((prev) => !prev);
    if (isEditorOpened) setIsPopperOpened(false);
  };

  const deleteAction = async () => {
    await deleteTask({
      boardId,
      columnId,
      taskId,
    });
  };

  const canBeOpen = isPopperOpened && Boolean(anchorEl);
  const idPopper = canBeOpen ? 'transition-popper' : undefined;

  const [deleteTask, {}] = useDeleteTaskMutation();

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 100 }}>
      <Button
        aria-describedby={idPopper}
        type="button"
        onClick={handleBtnClick}
        startIcon={<EditIcon />}
        sx={{
          borderRadius: '100%',
          p: '0.5rem 0.5rem 0.5rem 1.25rem',
          mr: '3px',
          width: '20px',
          minWidth: '35px',
        }}
      />
      <Popper
        id={idPopper}
        open={isPopperOpened}
        anchorEl={anchorEl}
        transition
        placement="right-start"
      >
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
                color="inherit"
                size="small"
                sx={{ width: '100%', mb: '0.5rem' }}
                variant="contained"
                onClick={handleEdit}
              >
                Open card
              </Button>
              <Button
                color="inherit"
                size="small"
                sx={{ width: '100%' }}
                variant="contained"
                onClick={handleDelete}
              >
                Delete card
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Modal isOpened={isConfirmOpened} onCancel={toggleIsConfirm} onConfirm={deleteAction} />
    </div>
  );
}
