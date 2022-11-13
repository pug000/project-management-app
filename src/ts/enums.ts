enum Endpoints {
  signIn = 'auth/signin',
  signUp = 'auth/signup',
  users = 'users/',
  boards = 'boards/',
  boardsSet = 'boardsSet/',
  columns = 'columns/',
  columnsSet = 'columnsSet/',
  tasks = 'tasks/',
  tasksSet = 'tasksSet/',
  file = 'file/',
  points = 'points/',
}

enum Methods {
  get = 'GET',
  post = 'POST',
  patch = 'PATCH',
  put = 'PUT',
  delete = 'DELETE',
}

export { Endpoints, Methods };
