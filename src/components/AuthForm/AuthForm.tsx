import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import { defaultUserFormValues } from 'utils/constants';

import { UserFormValues } from 'ts/interfaces';

import Form from 'styles/styles';

interface AuthFormProps {
  keyPrefix: string;
}

function AuthForm({ keyPrefix }: AuthFormProps) {
  const location = useLocation();
  const { t } = useTranslation('translation', { keyPrefix });
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<UserFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultUserFormValues,
  });

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(() => {}, []);

  return (
    <Form
      aria-label="form"
      noValidate
      autoComplete="off"
      onSubmit={() => handleSubmit(onSubmit)}
    >
      {location.pathname === '/signup' && (
        <Input<UserFormValues>
          type="text"
          name="name"
          register={register}
          clearErrors={clearErrors}
          errors={errors.name}
          placeholderText={t('name')}
        />
      )}
      <Input<UserFormValues>
        type="text"
        name="login"
        register={register}
        clearErrors={clearErrors}
        errors={errors.login}
        placeholderText={t('login')}
      />
      <Input<UserFormValues>
        type="password"
        name="password"
        register={register}
        clearErrors={clearErrors}
        errors={errors.password}
        placeholderText={t('password')}
      />
      <Button type="submit" disabled={!isDirty} text={t('text')} />
    </Form>
  );
}

export default AuthForm;
