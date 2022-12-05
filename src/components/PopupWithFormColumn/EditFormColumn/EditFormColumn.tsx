import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import { defaultColumnFormValues } from 'utils/constants';

import { ColumnFormValues } from 'ts/interfaces';

import { Form } from 'styles/styles';

interface EditFormProps<T> {
  keyPrefix: string;
  onSubmit: SubmitHandler<ColumnFormValues>;
  selectedItem?: T | null;
}

function EditForm<T>({ keyPrefix, onSubmit, selectedItem }: EditFormProps<T>) {
  const { t } = useTranslation('translation');

  const {
    register,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm<ColumnFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: selectedItem ?? defaultColumnFormValues,
  });

  useEffect(() => {
    setFocus('title');
  }, []);

  return (
    <Form
      aria-label="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        name="title"
        register={register}
        clearErrors={clearErrors}
        errors={errors.title}
        placeholderText={t(`${keyPrefix}.title`)}
        minLength={{
          value: 3,
          message: t('editForm.titleMinLength'),
        }}
        maxLength={{
          value: 25,
          message: t('editForm.titleMaxLength'),
        }}
        required={t('editForm.required')}
      />
      <Button type="submit" disabled={!!errors.title?.message}>
        {t('editForm.button')}
      </Button>
    </Form>
  );
}

EditForm.defaultProps = {
  selectedItem: null,
};

export default memo(EditForm);
