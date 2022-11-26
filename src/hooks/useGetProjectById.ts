import { useParams } from 'react-router-dom';

import { useGetProjectByIdQuery } from 'redux/api/projectsApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';

import { useAppSelector } from './useRedux';

const useGetProjectById = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { id } = useParams();

  const {
    data: selectedProject,
    isFetching: isLoadingSelectedProject,
    isSuccess: isSuccessSelectedProject,
  } = useGetProjectByIdQuery(id ?? '', { skip: !isLoggedIn && !id });

  return {
    selectedProject,
    isLoadingSelectedProject,
    isSuccessSelectedProject,
  };
};

export default useGetProjectById;
