import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBasePopupState = (state: RootState) => state.popup;

const getWarningPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isWarningPopupOpen
);

const getDeletePopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isDeletePopupOpen
);

const getNotificationPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isNotificationPopupOpen
);

const getCreationPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isCreationPopupOpen
);

export {
  getWarningPopupOpen,
  getDeletePopupOpen,
  getNotificationPopupOpen,
  getCreationPopupOpen,
};
