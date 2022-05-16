import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { BoardEditor, Modal } from '../index';
import { useDeleteBoardMutation } from '../../services';
import { IBoard } from '../../models/apiModels';

function ShortBoard({ id, title }: IBoard) {
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

  const onConfirm = async () => {
    await deleteBoard(id);
  };

  const handleBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isEdit = e.currentTarget.getAttribute('data-edit-board');
    if (isEdit) toggleEditOpened();
    else toggleDeleteOpened();
  };

  return (
    <>
      <Card
        component={NavLink}
        to={path}
        sx={{ display: 'block', p: '2.5rem 1rem', textDecoration: 'none', position: 'relative' }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: 'Ubuntu',
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          <Tooltip title={t('actions.delete')}>
            <IconButton size="medium" onClick={handleBtnClick} data-delete-board>
              <DeleteIcon color="warning" fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('actions.edit')}>
            <IconButton size="medium" onClick={handleBtnClick} data-edit-board>
              <EditIcon color="success" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Card>
      <Modal isOpened={isEditOpened} onCancel={toggleEditOpened}>
        <BoardEditor id={id} title={title} onCancel={toggleEditOpened} />
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
