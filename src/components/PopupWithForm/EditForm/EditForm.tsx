import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';

import getSelectedProject from 'redux/selectors/projectSelectors';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';

import { defaultProjectFormValues } from 'utils/constants';

import { ProjectFormValues } from 'ts/interfaces';

import { Form } from 'styles/styles';

interface EditFormProps {
  keyPrefix: string;
  onSubmit: () => void;
}

function EditForm({ keyPrefix, onSubmit }: EditFormProps) {
  const { t, i18n } = useTranslation('translation', { keyPrefix });
  const project = useAppSelector(getSelectedProject);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitted },
    trigger,
  } = useForm<ProjectFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: project ?? defaultProjectFormValues,
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
      <Input<ProjectFormValues>
        type="text"
        name="title"
        register={register}
        clearErrors={clearErrors}
        errors={errors.title}
        placeholderText={t('title')}
        minLength={{
          value: 3,
          message: t('titleMinLength'),
        }}
        maxLength={{
          value: 20,
          message: t('titleMaxLength'),
        }}
        required={t('required')}
      />
      <Textarea<ProjectFormValues>
        name="description"
        register={register}
        clearErrors={clearErrors}
        errors={errors.description}
        placeholderText={t('description')}
        maxLength={{
          value: 80,
          message: t('descriptionMaxLength'),
        }}
      />
      <Button type="submit" disabled={!isFormValid}>
        {t('button')}
      </Button>
    </Form>
  );
}

export default memo(EditForm);
