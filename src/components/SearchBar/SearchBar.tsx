import React, { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/useRedux';
import { setSearchedProjects } from 'redux/slices/projectSlice';

import { Project, SearchBarValues } from 'ts/interfaces';
import { defaultSearchBarValues } from 'utils/constants';

import { IoMdClose, IoMdSearch } from 'react-icons/io';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import { Form } from 'styles/styles';
import SearchBarWrapper from './SearchBar.style';

interface SearchBarProps {
  defaultProjects: Project[] | undefined;
  isDefaultProjectsLoading: boolean;
}

function SearchBar({ defaultProjects, isDefaultProjectsLoading }: SearchBarProps) {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const { register, handleSubmit, clearErrors, reset, setValue } =
    useForm<SearchBarValues>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: defaultSearchBarValues,
    });

  const onSearchSubmit: SubmitHandler<SearchBarValues> = (formValues) => {
    if (defaultProjects) {
      const newProjectsList = defaultProjects?.filter((project) =>
        project.title.toLowerCase().includes(formValues.title.toLowerCase())
      );
      dispatch(setSearchedProjects(newProjectsList));
      localStorage.setItem('searchedProjectsData', formValues.title);
    }
  };

  const resetOnClick = () => {
    localStorage.removeItem('searchedProjectsData');
    reset();
  };

  useEffect(() => {
    if (!isDefaultProjectsLoading && defaultProjects) {
      dispatch(setSearchedProjects(defaultProjects));
    }

    const dataFromLocalStorage = localStorage.getItem('searchedProjectsData');
    if (dataFromLocalStorage) {
      setValue('title', dataFromLocalStorage);
      onSearchSubmit({ title: dataFromLocalStorage });
    } else {
      reset();
    }
  }, [defaultProjects]);

  return (
    <SearchBarWrapper>
      <Form
        aria-label="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSearchSubmit)}
      >
        <Input
          type="search"
          name="title"
          register={register}
          clearErrors={clearErrors}
          placeholderText={t('searchBar.placeholder')}
        />
        <Button type="submit" width="30px">
          <IoMdSearch />
        </Button>
        <Button type="submit" width="30px" callback={resetOnClick}>
          <IoMdClose />
        </Button>
      </Form>
    </SearchBarWrapper>
  );
}

export default memo(SearchBar);
