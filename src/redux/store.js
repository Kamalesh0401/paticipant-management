import { configureStore } from '@reduxjs/toolkit';
import participantsReducer from './participantsSlice';
import fileUploaderSlice from './fileUploaderSlice';

const store = configureStore({
    reducer: {
        participants: participantsReducer,
        fileUploader: fileUploaderSlice,
    },
});

export default store;