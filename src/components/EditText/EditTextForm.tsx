import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import defaultTheme from 'styles/theme';

import { StyledCloseIcon, StyledConfirmIcon } from 'styles/styles';

import { Form } from './EditText.styles';

interface EditTextFormProps {
  text?: string;
  toggleEditingText: () => void;
  onSubmit: SubmitHandler<{ title: string }>;
}

function EditTextForm({ text, toggleEditingText, onSubmit }: EditTextFormProps) {
  const { t, i18n } = useTranslation('translation');
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<{ title: string }>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { title: text },
  });

  useEffect(() => {
    if (errors) {
      trigger(['title']);
    }
  }, [i18n.language]);

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
        callback={toggleEditingText}
      >
        <StyledCloseIcon />
      </Button>
    </Form>
  );
}

EditTextForm.defaultProps = {
  text: '',
};

export default EditTextForm;
