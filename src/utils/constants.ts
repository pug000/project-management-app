import { UserFormValues } from 'ts/interfaces';

const baseUrl = 'https://project-management.up.railway.app/';

const defaultUserFormValues: UserFormValues = {
  name: '',
  login: '',
  password: '',
};

export { baseUrl, defaultUserFormValues };
