import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isWarningPopupOpen: boolean;
  isNotificationPopupOpen: boolean;
}

const initialState: PopupState = {
  isWarningPopupOpen: false,
  isNotificationPopupOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setIsWarningPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isWarningPopupOpen = payload;
    },

    setIsNotificationPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isNotificationPopupOpen = payload;
    },
  },
});

export const { setIsWarningPopupOpen, setIsNotificationPopupOpen } = popupSlice.actions;

export default popupSlice.reducer;
