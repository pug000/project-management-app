import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import { ColumnFormValues } from 'ts/interfaces';

import defaultTheme from 'styles/theme';
import { StyledCloseIcon, StyledConfirmIcon } from 'styles/styles';
import { Form } from './EditText.styles';

interface EditTextFormProps {
  title?: string;
  onSubmit: SubmitHandler<ColumnFormValues>;
  disableEditingOnClick: () => void;
}

function EditTextForm({ title, disableEditingOnClick, onSubmit }: EditTextFormProps) {
  const { t, i18n } = useTranslation('translation');
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<{ title: string }>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { title },
  });

  useEffect(() => {
    if (errors) {
      trigger(['title']);
    }
  }, [i18n.language]);

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
        errors={errors.title}
        register={register}
        clearErrors={clearErrors}
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
      <Button
        type="submit"
        width="25px"
        backgroundColor={defaultTheme.colors.transparent}
      >
        <StyledConfirmIcon />
      </Button>
      <Button
        type="button"
        width="25px"
        backgroundColor={defaultTheme.colors.transparent}
        callback={disableEditingOnClick}
      >
        <StyledCloseIcon />
      </Button>
    </Form>
  );
}

EditTextForm.defaultProps = {
  title: '',
};

export default memo(EditTextForm);
