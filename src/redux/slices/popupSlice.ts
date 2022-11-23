import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isWarningPopupOpen: boolean;
  isDeletePopupOpen: boolean;
  isNotificationPopupOpen: boolean;
  isCreationPopupOpen: boolean;
}

const initialState: PopupState = {
  isWarningPopupOpen: false,
  isDeletePopupOpen: false,
  isNotificationPopupOpen: false,
  isCreationPopupOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setWarningPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isWarningPopupOpen = payload;
    },

    setDeletePopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isDeletePopupOpen = payload;
    },

    setNotificationPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isNotificationPopupOpen = payload;
    },

    setCreationPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isCreationPopupOpen = payload;
    },
  },
});

export const {
  setWarningPopupOpen,
  setDeletePopupOpen,
  setNotificationPopupOpen,
  setCreationPopupOpen,
} = popupSlice.actions;

export default popupSlice.reducer;
