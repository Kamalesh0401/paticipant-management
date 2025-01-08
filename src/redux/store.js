import { configureStore } from '@reduxjs/toolkit';
import participantsReducer from './participantsSlice';

const store = configureStore({
    reducer: {
        participants: participantsReducer,
    },
});

export default store;