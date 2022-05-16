import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal } from '..';
import { useAppDispatch } from '../../hooks/redux';
import { boardSlice } from '../../store/reducers/board';

interface IFormData {
  title: string;
}

interface ICreateColumn {
  isOpened: boolean;
  toggleIsOpened: () => void;
  id: string;
}

function TaskCreator({ isOpened, toggleIsOpened, id }: ICreateColumn) {
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

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = async (data: IFormData) => {
    const nweId = String(Date.now());
    dispatch(
      boardSlice.actions.addTask({
        title: '',
        id: id,
        order: 2,
        tasks: [{ title: data.title, id: nweId + 1, order: 1 }],
      })
    );
    toggleIsOpened();
    reset();
    //request
  };

  return (
    <>
      <Modal isOpened={isOpened} onCancel={toggleIsOpened}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <TextField
            {...register('title', { required: 'Поле должно быть заполнено' })}
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
            <Button onClick={handleSubmit(onSubmit)}>{t('pages.boardPage.submit')}</Button>
            <Button onClick={toggleIsOpened}>{t('pages.boardPage.cancel')}</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default TaskCreator;
