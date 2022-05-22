import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Modal } from '..';
import { useCreateColumnMutation, useGetBoardQuery } from '../../services';

interface IFormData {
  title: string;
}

interface ICreateColumn {
  isOpened: boolean;
  toggleIsOpened: () => void;
}

function ColumnCreator({ isOpened, toggleIsOpened }: ICreateColumn) {
  const { id: idBoard } = useParams();
  const { data } = useGetBoardQuery(String(idBoard));
  const columns = data?.columns || [];

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

  const [createColumn, {}] = useCreateColumnMutation();

  const { t } = useTranslation();

  const onSubmit = async (data: IFormData) => {
    toggleIsOpened();
    reset();
    createColumn({
      id: String(idBoard),
      body: { title: data.title },
    });
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
            {...register('title', { required: t('form.errors.noTitle') })}
            type="text"
            placeholder={t('pages.boardPage.columnCreatorPlaceholder')}
            fullWidth
            inputProps={{
              style: {
                fontSize: '1.25rem',
                fontWeight: 'bold',
                width: 'calc(100%)',
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
        </Box>
      </Modal>
    </>
  );
}

export default ColumnCreator;
