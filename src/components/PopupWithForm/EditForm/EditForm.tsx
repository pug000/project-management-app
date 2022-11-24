import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';

import { defaultFormItemValues } from 'utils/constants';

import { Project, EditFormValues } from 'ts/interfaces';

import { Form } from 'styles/styles';

interface EditFormProps {
  keyPrefix: string;
  onSubmit: SubmitHandler<EditFormValues>;
  selectedItem: Project | null;
}

function EditForm({ keyPrefix, onSubmit, selectedItem }: EditFormProps) {
  const { t, i18n } = useTranslation('translation');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitted },
    trigger,
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
          message: t('titleMaxLength.titleMaxLength'),
        }}
        required={t('required.required')}
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

export default memo(EditForm);
