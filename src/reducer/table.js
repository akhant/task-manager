import { GET_TASKS } from '../constants';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return payload;

    default:
      return state;
  }
};
