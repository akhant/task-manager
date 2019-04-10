import jwt from 'jsonwebtoken';
import { LOGIN, LOGOUT } from '../constants';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
    // check admin credentials
      if (payload.username === 'admin' && payload.password === '123') {
        payload.isAdmin = true;
        const token = jwt.sign(payload, 'secret');
        localStorage.setItem('AdminJWT', token);
      }
      return { ...state, ...payload };

    case LOGOUT:
      localStorage.removeItem('AdminJWT');
      return {};

    default:
      return state;
  }
};
