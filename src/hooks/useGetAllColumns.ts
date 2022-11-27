import { useParams } from 'react-router-dom';

import { useGetAllColumnsQuery } from 'redux/api/columnApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';

import { useAppSelector } from './useRedux';

const useGetAllColumns = () => {
  const { id } = useParams();
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: columns, isFetching: isLoadingColumnList } = useGetAllColumnsQuery(
    id ?? '',
    { skip: !isLoggedIn }
  );

  return {
    columns,
    isLoadingColumnList,
  };
};

export default useGetAllColumns;
