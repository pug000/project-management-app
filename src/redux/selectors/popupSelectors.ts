import { RootState } from 'redux/store';

const getWarningPopupOpen = (state: RootState) => state.popup.isWarningPopupOpen;

const getNotificationPopupOpen = (state: RootState) =>
  state.popup.isNotificationPopupOpen;

export { getWarningPopupOpen, getNotificationPopupOpen };
