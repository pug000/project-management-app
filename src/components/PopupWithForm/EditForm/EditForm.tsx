import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';
import RadioInput from 'components/RadioInput/RadioInput';

import { defaultFormItemValues, radioInputList } from 'utils/constants';

import { EditFormValues } from 'ts/interfaces';

import { Form } from 'styles/styles';

interface EditFormProps<T> {
  keyPrefix: string;
  onSubmit: SubmitHandler<EditFormValues>;
  selectedItem?: T | null;
}

function EditForm<T>({ keyPrefix, onSubmit, selectedItem }: EditFormProps<T>) {
  const { t, i18n } = useTranslation('translation');
  const { id } = useParams();
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setFocus,
    getValues,
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
          value: 25,
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
      {pathname === `/projects/${id}` && (
        <RadioInput
          name="color"
          text={t('projects.color')}
          radioInputs={radioInputList}
          register={register}
          defaultValue={getValues().color}
        />
      )}
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
