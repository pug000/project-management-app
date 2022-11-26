import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useCreateColumn from 'hooks/useCreateColumn';

import { getLoggedIn } from 'redux/selectors/userSelectors';
// import { setCreationPopupOpen, setDeletePopupOpen } from 'redux/slices/popupSlice';
import { useGetAllColumnsQuery } from 'redux/api/columnApiSlice';

import Button from 'components/Button/Button';
import Task from 'components/Task/Task';

import { BiEdit } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import defaultTheme from 'styles/theme';

import {
  ColumnWrapper,
  ColumnsContainer,
  ColumnHeader,
  ColumnHeaderButtonWrapper,
  ColumnHeaderButton,
  ColumnTitle,
  ColumnTaskContainer,
  IconWrapper,
} from './ColumnContainer.style';

function ColumnContainer() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: columns, isFetching: isColumnListLoading } = useGetAllColumnsQuery(
    id ?? '',
    { skip: !id && !isLoggedIn }
  );

  return (
    <ColumnWrapper>
      {columns?.length &&
        columns.map((column) => (
          <ColumnsContainer key={column._id}>
            <ColumnHeader>
              <ColumnTitle>{column.title}</ColumnTitle>
              <ColumnHeaderButtonWrapper>
                <ColumnHeaderButton onClick={() => console.log('edit')}>
                  <IconWrapper>
                    <BiEdit color={defaultTheme.colors.grey} />
                  </IconWrapper>
                </ColumnHeaderButton>
                <ColumnHeaderButton onClick={(event) => console.log('del')}>
                  <IconWrapper>
                    <MdOutlineDelete color={defaultTheme.colors.pink} />
                  </IconWrapper>
                </ColumnHeaderButton>
              </ColumnHeaderButtonWrapper>
            </ColumnHeader>
            <Button type="button" callback={() => console.log('add task')}>
              Add task
            </Button>
            <ColumnTaskContainer>
              <Task title="hello" />
            </ColumnTaskContainer>
          </ColumnsContainer>
        ))}
    </ColumnWrapper>
  );
}

export default memo(ColumnContainer);
