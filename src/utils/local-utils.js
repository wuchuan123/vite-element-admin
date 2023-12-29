/*
 * localStorage 相关操作
 * */

export const localSave = (key, value) => {
  localStorage.setItem(key, value);
};

export const localRead = (key) => localStorage.getItem(key) || '';

export const localClear = () => {
  localStorage.clear();
};
