import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';

import { defaultFormItemValues } from 'utils/constants';

import { EditFormValues } from 'ts/interfaces';

import { Form } from 'styles/styles';

interface EditFormProps<T> {
  keyPrefix: string;
  onSubmit: SubmitHandler<EditFormValues>;
  selectedItem?: T | null;
}

function EditForm<T>({ keyPrefix, onSubmit, selectedItem }: EditFormProps<T>) {
  const { t, i18n } = useTranslation('translation');

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setFocus,
    formState: { errors, isSubmitted },
  } = useForm<EditFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: selectedItem ?? defaultFormItemValues,
  });
  const isFormValid = Object.values(errors).every((error) => !error?.message);

  useEffect(() => {
    if (isSubmitted) {
      trigger(['title', 'description']);
    }
  }, [i18n.language, isSubmitted]);

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
          value: 50,
          message: t('editForm.titleMaxLength'),
        }}
        required={t('editForm.required')}
      />
      <Textarea
        name="description"
        register={register}
        clearErrors={clearErrors}
        errors={errors.description}
        placeholderText={t(`${keyPrefix}.description`)}
        maxLength={{
          value: 80,
          message: t(`${keyPrefix}.descriptionMaxLength`),
        }}
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
