import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';

import { defaultColumnFormValues } from 'utils/constants';

import { ColumnFormValue } from 'ts/interfaces';

import { Form } from 'styles/styles';

interface EditFormProps<T> {
  keyPrefix: string;
  onSubmit: SubmitHandler<ColumnFormValue>;
  selectedItem?: T | null;
}

function EditForm<T>({ keyPrefix, onSubmit }: EditFormProps<T>) {
  const { t, i18n } = useTranslation('translation');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ColumnFormValue>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultColumnFormValues,
  });
  const isFormValid = Object.values(errors).every((error) => !error?.message);

  return (
    <Form
      aria-label="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        name="body.title"
        register={register}
        clearErrors={clearErrors}
        errors={errors.body?.title}
        placeholderText={t(`${keyPrefix}.title`)}
        minLength={{
          value: 3,
          message: t('editForm.titleMinLength'),
        }}
        maxLength={{
          value: 50,
          message: t('editForm.titleMaxLength'),
        }}
        required={t('editForm.required')}
      />
      <Button type="submit" disabled={!isFormValid}>
        {t('editForm.button')}
      </Button>
    </Form>
  );
}

EditForm.defaultProps = {
  selectedItem: null,
};

export default memo(EditForm);
