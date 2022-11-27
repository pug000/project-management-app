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

const getDeleteProjectPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isDeleteProjectPopupOpen
);
const getDeleteColumnPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isDeleteColumnPopupOpen
);

const getErrorPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isErrorPopupOpen
);

const getSuccessPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isSuccessPopupOpen
);

const getCreationPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isCreationPopupOpen
);

const getEditPopupOpen = createSelector(
  getBasePopupState,
  (state) => state.isEditPopupOpen
);

export {
  getWarningPopupOpen,
  getDeletePopupOpen,
  getDeleteProjectPopupOpen,
  getDeleteColumnPopupOpen,
  getErrorPopupOpen,
  getSuccessPopupOpen,
  getCreationPopupOpen,
  getEditPopupOpen,
};
