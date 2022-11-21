import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isWarningPopupOpen: boolean;
  isDeletePopupOpen: boolean;
  isNotificationPopupOpen: boolean;
}

const initialState: PopupState = {
  isWarningPopupOpen: false,
  isDeletePopupOpen: false,
  isNotificationPopupOpen: false,
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
  },
});

export const { setWarningPopupOpen, setDeletePopupOpen, setNotificationPopupOpen } =
  popupSlice.actions;

export default popupSlice.reducer;
