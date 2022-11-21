import { RootState } from 'redux/store';

const getWarningPopupOpen = (state: RootState) => state.popup.isWarningPopupOpen;

const getDeletePopupOpen = (state: RootState) => state.popup.isDeletePopupOpen;

const getNotificationPopupOpen = (state: RootState) =>
  state.popup.isNotificationPopupOpen;

export { getWarningPopupOpen, getDeletePopupOpen, getNotificationPopupOpen };
