import * as types from '../constants/types';

export const openDialog = dialogId => ({
  type: types.OPEN_DIALOG,
  payload: dialogId,
});

export const closeDialog = () => ({
  type: types.CLOSE_DIALOG,
  payload: null,
});
