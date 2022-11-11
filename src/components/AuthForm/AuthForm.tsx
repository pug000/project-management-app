import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import {
  defaultUserFormValues,
  loginValidation,
  nameValidation,
  passwordValidation,
} from 'utils/constants';

import { UserFormValues } from 'ts/interfaces';

import Form from 'styles/styles';

interface AuthFormProps {
  keyPrefix: string;
  onSubmit: SubmitHandler<UserFormValues>;
}

function AuthForm({ keyPrefix, onSubmit }: AuthFormProps) {
  const location = useLocation();
  const { t } = useTranslation('translation');
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty },
    reset,
  } = useForm<UserFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultUserFormValues,
  });

  useEffect(() => {
    if (isLoggedIn) {
      reset();
    }
  }, [isLoggedIn]);

  return (
    <Form
      aria-label="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {location.pathname === '/signup' && (
        <Input<UserFormValues>
          type="text"
          name="name"
          register={register}
          clearErrors={clearErrors}
          errors={errors.name}
          placeholderText={t('authorization.name')}
          pattern={{
            value: nameValidation,
            message: t('authorization.namePattern'),
          }}
          minLength={{
            value: 3,
            message: t('authorization.nameMinLength', { count: 3 }),
          }}
          required={t('authorization.required', { value: t('authorization.name') })}
        />
      )}
      <Input<UserFormValues>
        type="text"
        name="login"
        register={register}
        clearErrors={clearErrors}
        errors={errors.login}
        placeholderText={t('authorization.login')}
        pattern={{
          value: loginValidation,
          message: t('authorization.loginPattern'),
        }}
        minLength={{
          value: 4,
          message: t('authorization.authMinLength', {
            value: t('authorization.login'),
            count: 4,
          }),
        }}
        required={t('authorization.required', { value: t('authorization.login') })}
      />
      <Input<UserFormValues>
        type="password"
        name="password"
        register={register}
        clearErrors={clearErrors}
        errors={errors.password}
        placeholderText={t('authorization.password')}
        pattern={{
          value: passwordValidation,
          message: t('authorization.passwordPattern'),
        }}
        minLength={{
          value: 8,
          message: t('authorization.authMinLength', {
            value: t('authorization.password'),
            count: 8,
          }),
        }}
        required={t('authorization.required', { value: t('authorization.password') })}
      />
      <Button type="submit" disabled={!isDirty} text={t(`${keyPrefix}.text`)} />
    </Form>
  );
}

export default memo(AuthForm);
