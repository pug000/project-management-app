import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';

import { getUser } from 'redux/selectors/userSelectors';

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
  const { t, i18n } = useTranslation('translation');
  const user = useAppSelector(getUser);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    trigger,
  } = useForm<UserFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: user ?? defaultUserFormValues,
  });
  const isFormValid = Object.values(errors).every((error) => !error?.message);

  useEffect(() => {
    if (errors) {
      trigger([...(Object.keys(errors) as (keyof UserFormValues)[])]);
    }
  }, [i18n.language, errors]);

  return (
    <Form
      aria-label="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {location.pathname !== '/signin' && (
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
      <Button type="submit" disabled={isLoadingAuth || !isFormValid}>
        {t(`${keyPrefix}.text`)}
      </Button>
    </Form>
  );
}

export default memo(AuthForm);
