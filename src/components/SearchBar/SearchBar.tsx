import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Project, SearchBarValues } from 'ts/interfaces';
import { defaultSearchBarValues } from 'utils/constants';

import { IoMdClose, IoMdSearch } from 'react-icons/io';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import { Form } from 'styles/styles';
import SearchBarWrapper from './SearchBar.style';

interface SearchBarProps {
  onSubmit: SubmitHandler<SearchBarValues>;
  defaultProjects: Project[] | undefined;
}

function SearchBar({ onSubmit, defaultProjects }: SearchBarProps) {
  const { t } = useTranslation('translation');
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<SearchBarValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultSearchBarValues,
  });

  useEffect(() => {
    reset();
  }, [defaultProjects]);

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
        <Button
          type="submit"
          width="30px"
          callback={() => {
            reset();
            handleSubmit(onSubmit);
          }}
        >
          <IoMdClose />
        </Button>
      </Form>
    </SearchBarWrapper>
  );
}

export default memo(SearchBar);
