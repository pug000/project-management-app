import React, { memo, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import ReactSelect from 'react-select';

import useGetAllUsers from 'hooks/useGetAllUsers';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';
import RadioInput from 'components/RadioInput/RadioInput';

import { defaultFormItemValues, radioInputList } from 'utils/constants';

import { EditFormValues, SelectOptions } from 'ts/interfaces';

import { Form, selectorStyles } from 'styles/styles';

interface EditFormProps<T> {
  keyPrefix: string;
  onSubmit: SubmitHandler<EditFormValues>;
  selectedItem?: T | null;
  maxDescriptionLength: number;
}

function EditForm<T>({
  keyPrefix,
  onSubmit,
  selectedItem,
  maxDescriptionLength,
}: EditFormProps<T>) {
  const { t, i18n } = useTranslation('translation');
  const { id } = useParams();
  const { pathname } = useLocation();
  const { usersList, isUsersListLoading } = useGetAllUsers();
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setFocus,
    getValues,
    formState: { errors, isSubmitted },
    control,
  } = useForm<EditFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: selectedItem ?? defaultFormItemValues,
  });
  const isFormValid = Object.values(errors).every((error) => !error?.message);

  const getValueFromOption = (value: string) =>
    value ? usersList.find((user) => user.value === value) : '';

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
          value: maxDescriptionLength,
          message: t(`${keyPrefix}.descriptionMaxLength`),
        }}
      />
      {pathname === `/projects/${id}` && (
        <>
          <RadioInput
            name="color"
            text={t('editForm.color')}
            radioInputs={radioInputList}
            register={register}
            defaultValue={getValues().color}
          />
          <Controller
            control={control}
            name="responsibleUser"
            render={({ field: { onChange, value } }) => (
              <ReactSelect
                isLoading={isUsersListLoading}
                options={usersList}
                placeholder={t('editForm.responsible')}
                value={getValueFromOption(value)}
                onChange={(newValue) => onChange((newValue as SelectOptions).value)}
                styles={selectorStyles}
              />
            )}
          />
        </>
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
