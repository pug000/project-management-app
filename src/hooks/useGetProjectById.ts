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
    isError: isErrorSelectedProject,
    isUninitialized,
  } = useGetProjectByIdQuery(id ?? '', { skip: !isLoggedIn });

  const isNavigate =
    !selectedProject &&
    (isUninitialized || isErrorSelectedProject || isSuccessSelectedProject);

  return {
    selectedProject,
    isLoadingSelectedProject,
    isSuccessSelectedProject,
    isNavigate,
  };
};

export default useGetProjectById;
