import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import { useParams } from 'react-router-dom';
import { getCurrentUser, getNextOrder } from '../../utils';
import { useCreateTaskMutation, useGetAllUsersQuery } from '../../services';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

interface IFormData {
  title: string;
}

interface ICreateTask {
  isOpened: boolean;
  toggleIsOpened: () => void;
  id: string;
}

function TaskCreator({ isOpened, toggleIsOpened, id }: ICreateTask) {
  const { id: boardId } = useParams();
  const { columns } = useAppSelector((state) => state.boardSlice.data);
  const [userId, setUserId] = useState('');
  const { data, isLoading: isGetUsersLoading } = useGetAllUsersQuery();
  const [createTask] = useCreateTaskMutation();

  useEffect(() => {
    if (data) {
      const { id } = getCurrentUser(data);
      setUserId(id);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      title: '',
    },
    reValidateMode: 'onChange',
  });

  const { t } = useTranslation();

  const onSubmit = async (data: IFormData) => {
    const order = getNextOrder(columns, id);
    console.log(order);
    createTask({
      boardId: String(boardId),
      columnId: id,
      body: {
        title: data.title,
        description: data.title,
        userId,
      },
    });
    toggleIsOpened();
    reset();
  };

  return (
    <>
      <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {isGetUsersLoading ? (
            <CircularProgress />
          ) : (
            <>
              <TextField
                {...register('title', { required: t('form.errors.noTitle') })}
                type="text"
                placeholder={t('pages.boardPage.taskCreatorPlaceholder')}
                fullWidth
                inputProps={{
                  style: {
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                  },
                }}
                error={!!errors.title}
                helperText={errors.title?.message}
                autoFocus
              />
              <Box>
                <Button onClick={handleSubmit(onSubmit)}>{t('actions.create')}</Button>
                <Button onClick={toggleIsOpened}>{t('actions.cancel')}</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default TaskCreator;
