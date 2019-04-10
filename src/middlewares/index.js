import axios from 'axios';
import {
  EDIT_TASK_TEXT, GET_TASKS, CHANGE_STATUS, CREATE_TASK,
} from '../constants';
import { fixedEncodeURIComponent, md5 } from '../helpers';

const serverUrl = 'https://uxcandy.com/~shapoval/test-task-backend';
const developer = '?developer=AK';
const token = fixedEncodeURIComponent('beejee');

const encodeData = (status = null, text = null) => {
  let newStatus;
  let newText;
  let params;
  const data = new FormData();
  if (text) {
    newText = fixedEncodeURIComponent(text);
    data.append('text', newText);
    params = `text=${newText}&token=${token}`;
  } else {
    newStatus = status ? 0 : 10;
    data.append('status', newStatus);
    params = `status=${newStatus}&token=${token}`;
  }
  const signature = md5(params);
  data.append('token', token);
  data.append('signature', signature);
  return data;
};

const Data = store => next => async (action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      const { page, column, direction } = payload;

      const res = await axios({
        method: 'get',
        url: `${serverUrl}/${developer}&page=${page}&sort_field=${column}&sort_direction=${
          direction === 'ascenging' ? 'asc' : 'desc'
        }`,
      });
      if (res.status === 200) {
        next({
          type: GET_TASKS,
          payload: res.data.message,
        });
      }
      break;

    case CREATE_TASK:
      const { username, text, email } = payload;
      const formData = new FormData();
      formData.append('username', username);
      formData.append('text', text);
      formData.append('email', email);
      const response = await axios({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${serverUrl}/create/${developer}`,
        data: formData,
      });
      if (response.status === 200) {
        next({
          type: CREATE_TASK,
          payload: response,
        });
      }
      break;

    case CHANGE_STATUS:
      const { id, resolved } = payload;
      const data = encodeData(resolved);
      const resp = await axios({
        method: 'post',
        url: `${serverUrl}/edit/${id}/${developer}`,
        data,
      });
      next({
        type: CHANGE_STATUS,
        payload: resp,
      });
      break;

    case EDIT_TASK_TEXT:
      const { text: newText, id: taskId } = payload;
      const reqData = encodeData(null, newText);
      const serverRes = await axios({
        method: 'post',
        url: `${serverUrl}/edit/${taskId}/${developer}`,
        data: reqData,
      });
      next({
        type: EDIT_TASK_TEXT,
        payload: serverRes,
      });
      break;

    default:
      return next(action);
  }
};

export default Data;
