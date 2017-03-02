import { browserHistory } from 'react-router';

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('activeUserId'));
};

export const clearLocalStorage = () => {
  localStorage.clear();
  browserHistory.push('/login');
};

export const localStorageEmpty = () => {
  return localStorage.length === 0;
};
