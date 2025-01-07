import { createSlice } from '@reduxjs/toolkit';

const fileUploaderSlice = createSlice({
    name: 'fileUploader',
    initialState: {
        fileInputs: [],
        selectedFileId: null,
        showModal: false,
    },
    reducers: {
        addFileInput(state, action) {
            state.fileInputs.push(action.payload);
        },
        removeFileInput(state, action) {
            state.fileInputs = state.fileInputs.filter((input) => input.id !== action.payload);
            if (state.selectedFileId === action.payload) {
                state.selectedFileId = null; // Deselect file if it's removed
            }
        },
        updateFileInput(state, action) {
            const { id, changes } = action.payload;
            const index = state.fileInputs.findIndex((input) => input.id === id);
            if (index >= 0) {
                state.fileInputs[index] = { ...state.fileInputs[index], ...changes };
            }
        },
        setSelectedFileId(state, action) {
            state.selectedFileId = action.payload;
        },
        toggleModal(state, action) {
            state.showModal = action.payload;
        },
    },
});

export const {
    addFileInput,
    removeFileInput,
    updateFileInput,
    setSelectedFileId,
    toggleModal,
} = fileUploaderSlice.actions;

export default fileUploaderSlice.reducer;
