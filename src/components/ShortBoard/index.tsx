import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { BoardEditor, Modal } from '..';
import { useDeleteBoardMutation } from '../../services';
import { IBoard } from '../../models';

function ShortBoard({ id, title, description }: IBoard) {
  const { t } = useTranslation();
  const path = AppRoutes.MAIN + `/${id}`;
  const [deleteBoard, { isLoading }] = useDeleteBoardMutation();
  const [isDeleteOpened, setDeleteOpened] = useState(false);
  const [isEditOpened, setEditOpened] = useState(false);

  const toggleDeleteOpened = () => {
    setDeleteOpened((prev) => !prev);
  };

  const toggleEditOpened = () => {
    setEditOpened((prev) => !prev);
  };

  const onConfirm = () => {
    deleteBoard(id);
  };

  const handleBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isEdit = e.currentTarget.getAttribute('data-edit-board');
    if (isEdit) {
      toggleEditOpened();
    } else {
      toggleDeleteOpened();
    }
  };

  return (
    <>
      <Card
        component={NavLink}
        to={path}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: '2.5rem 1rem',
          textDecoration: 'none',
          position: 'relative',
          height: '100%',
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: 'Ubuntu',
            fontWeight: 500,
            fontSize: '1.4rem',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" align="center">
          {description}
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          <Tooltip title={t('actions.delete')} sx={{ fontSize: '14px' }}>
            <IconButton size="medium" onClick={handleBtnClick} data-delete-board>
              <Delete color="warning" fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('actions.edit')} sx={{ fontSize: '14px' }}>
            <IconButton size="medium" onClick={handleBtnClick} data-edit-board>
              <Edit color="success" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Card>
      <Modal isOpened={isEditOpened} onCancel={toggleEditOpened}>
        <BoardEditor id={id} title={title} description={description} onCancel={toggleEditOpened} />
      </Modal>
      <Modal
        isOpened={isDeleteOpened}
        onCancel={toggleDeleteOpened}
        onConfirm={onConfirm}
        isLoading={isLoading}
      />
    </>
  );
}

export default ShortBoard;
