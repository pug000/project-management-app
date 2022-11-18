import React, { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';

import { getLoggedIn } from 'redux/selectors/userSelectors';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import { defaultUserFormValues, formTextFields, nameValidation } from 'utils/constants';

import { UserFormValues } from 'ts/interfaces';

import { Form } from 'styles/styles';

interface AuthFormProps {
  keyPrefix: string;
  onSubmit: SubmitHandler<UserFormValues>;
  isLoadingAuth: boolean;
}

function AuthForm({ keyPrefix, isLoadingAuth, onSubmit }: AuthFormProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const isLoggedIn = useAppSelector(getLoggedIn);
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
      navigate('/projects');

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
      {formTextFields.slice(1).map((textfield) => (
        <Input<UserFormValues>
          key={textfield.id}
          type={textfield.type}
          name={textfield.name}
          placeholderText={t(textfield.placeholderText)}
          required={t(textfield.required, {
            value: t(textfield.placeholderText),
          })}
          pattern={{
            ...textfield.pattern,
            message: t(textfield.pattern.message),
          }}
          minLength={{
            ...textfield.minLength,
            message: t(textfield.minLength.message, {
              count: textfield.minLength.value,
              value: t(textfield.placeholderText),
            }),
          }}
          disabled={isLoadingAuth}
          errors={errors[textfield.name]}
          register={register}
          clearErrors={clearErrors}
        />
      ))}
      <Button type="submit" disabled={!isDirty || isLoadingAuth || !isFormValid}>
        {t(`${keyPrefix}.text`)}
      </Button>
    </Form>
  );
}

export default memo(AuthForm);
