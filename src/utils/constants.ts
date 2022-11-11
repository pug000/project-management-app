import { UserFormValues } from 'ts/interfaces';

const baseUrl = 'https://project-management.up.railway.app/';

const nameValidation = /^(?=[a-zA-Z._]*$)(?!.*[_.]).*/gm;

const loginValidation = /^(?=[a-zA-Z0-9._]*$)(?!.*[_.])[^_.].*/gm;

const passwordValidation = /^[a-zA-Z0-9](?!.*[_.()\\ /|=+№;:?*,"'`^%-]).*/gm;

const defaultUserFormValues: UserFormValues = {
  name: '',
  login: '',
  password: '',
};

export {
  baseUrl,
  defaultUserFormValues,
  nameValidation,
  loginValidation,
  passwordValidation,
};
