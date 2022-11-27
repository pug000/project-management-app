import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isWarningPopupOpen: boolean;
  isDeletePopupOpen: boolean;
  isDeleteProjectPopupOpen: boolean;
  isDeleteColumnPopupOpen: boolean;
  isSuccessPopupOpen: boolean;
  isErrorPopupOpen: boolean;
  isCreationPopupOpen: boolean;
  isEditPopupOpen: boolean;
}

const initialState: PopupState = {
  isWarningPopupOpen: false,
  isDeletePopupOpen: false,
  isDeleteProjectPopupOpen: false,
  isDeleteColumnPopupOpen: false,
  isSuccessPopupOpen: false,
  isErrorPopupOpen: false,
  isCreationPopupOpen: false,
  isEditPopupOpen: false,
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
    setDeleteProjectPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isDeleteProjectPopupOpen = payload;
    },

    setDeleteColumnPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isDeleteColumnPopupOpen = payload;
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

    setEditPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isEditPopupOpen = payload;
    },
  },
});

export const {
  setWarningPopupOpen,
  setDeletePopupOpen,
  setDeleteProjectPopupOpen,
  setDeleteColumnPopupOpen,
  setSuccessPopupOpen,
  setErrorPopupOpen,
  setCreationPopupOpen,
  setEditPopupOpen,
} = popupSlice.actions;

export default popupSlice.reducer;
