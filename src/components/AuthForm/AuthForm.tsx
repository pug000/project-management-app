import React, { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  isLoadingAuth: boolean;
}

function AuthForm({ keyPrefix, isLoadingAuth, onSubmit }: AuthFormProps) {
  const location = useLocation();
  const navigate = useNavigate();
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
  const isFormValid = Object.values(errors).every((error) => !error?.message);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/board');

      if (isDirty) {
        reset();
      }
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
          disabled={isLoadingAuth}
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
        disabled={isLoadingAuth}
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
        disabled={isLoadingAuth}
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
      <Button
        type="submit"
        disabled={!isDirty || isLoadingAuth || !isFormValid}
        text={t(`${keyPrefix}.text`)}
      />
    </Form>
  );
}

export default memo(AuthForm);
