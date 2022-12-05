import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAllColumnsQuery } from 'redux/api/columnApiSlice';
import { getAllColumns } from 'redux/selectors/columnSelectors';
import { getLoggedIn } from 'redux/selectors/userSelectors';
import { RootState } from 'redux/store';
import { ColumnData } from 'ts/interfaces';

import { useAppSelector } from './useRedux';

const useGetAllColumns = () => {
  const { id } = useParams();
  const [columnList, setColumnList] = useState<ColumnData[]>([]);
  const isLoggedIn = useAppSelector(getLoggedIn);
  const columns = useAppSelector((state: RootState) => getAllColumns(state, id ?? ''));
  const { isFetching: isLoadingColumnList, isSuccess: isSuccessGetColumnList } =
    useGetAllColumnsQuery(id ?? '', { skip: !isLoggedIn });

  useEffect(() => {
    if (columns) {
      setColumnList(columns);
    }
  }, [columns]);

  return {
    columns,
    columnList,
    isLoadingColumnList,
    isSuccessGetColumnList,
    setColumnList,
  };
};

export default useGetAllColumns;
