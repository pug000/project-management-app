import React, { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SearchBarValues } from 'ts/interfaces';
import { defaultSearchBarValues } from 'utils/constants';

import { IoMdClose, IoMdSearch } from 'react-icons/io';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import { Form } from 'styles/styles';
import SearchBarWrapper from './SearchBar.style';

interface SearchBarProps {
  onSubmit: SubmitHandler<SearchBarValues>;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const { t } = useTranslation('translation');
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<SearchBarValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultSearchBarValues,
  });

  return (
    <SearchBarWrapper>
      <Form
        aria-label="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="search"
          name="title"
          register={register}
          clearErrors={clearErrors}
          errors={errors.title}
          placeholderText={t('searchBar.placeholder')}
        />
        <Button type="submit" width="30px">
          <IoMdSearch />
        </Button>
        <Button type="button" width="30px">
          <IoMdClose />
        </Button>
      </Form>
    </SearchBarWrapper>
  );
}

export default memo(SearchBar);
