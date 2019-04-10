import {
  LOGOUT, LOGIN, EDIT_TASK_TEXT, GET_TASKS, CREATE_TASK, CHANGE_STATUS,
} from '../constants';

export const logout = () => ({
  type: LOGOUT,
});

export const login = data => ({
  type: LOGIN,
  payload: data,
});

export const editTaskText = (text, id) => ({
  type: EDIT_TASK_TEXT,
  payload: { text, id },
});

export const getTasks = (page, column, direction) => ({
  type: GET_TASKS,
  payload: { page, column, direction },
});

export const createTask = data => ({
  type: CREATE_TASK,
  payload: data,
});

export const changeStatus = (id, checked) => ({
  type: CHANGE_STATUS,
  payload: { id, resolved: checked },
});
