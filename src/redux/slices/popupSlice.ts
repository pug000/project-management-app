import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isWarningPopupOpen: boolean;
  isDeletePopupOpen: boolean;
  isSuccessPopupOpen: boolean;
  isErrorPopupOpen: boolean;
  isCreationPopupOpen: boolean;
}

const initialState: PopupState = {
  isWarningPopupOpen: false,
  isDeletePopupOpen: false,
  isSuccessPopupOpen: false,
  isErrorPopupOpen: false,
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

    setSuccessPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isSuccessPopupOpen = payload;
    },

    setErrorPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isErrorPopupOpen = payload;
    },

    setCreationPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isCreationPopupOpen = payload;
    },
  },
});

export const {
  setWarningPopupOpen,
  setDeletePopupOpen,
  setSuccessPopupOpen,
  setErrorPopupOpen,
  setCreationPopupOpen,
} = popupSlice.actions;

export default popupSlice.reducer;
