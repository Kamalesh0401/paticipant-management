import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const participantsSlice = createSlice({
    name: 'participants',
    initialState: {
        participants: [],
        activeParticipantIndex: 0,
    },
    reducers: {
        // addParticipant: (state, action) => {
        //     state.participants.push({
        //         id: uuid(),
        //         name: action.payload,
        //         files: [],
        //     });
        // },
        addParticipant: (state, action) => {
            const newParticipant = {
                id: Date.now(),
                name: action.payload,
                files: [],
            };
            state.participants.push(newParticipant);
            state.activeParticipantIndex = state.participants.length - 1;
        },
        deleteParticipant: (state, action) => {
            state.participants = state.participants.filter(
                (p) => p.id !== action.payload
            );
            if (state.activeParticipantIndex >= state.participants.length) {
                state.activeParticipantIndex = Math.max(0, state.participants.length - 1);
            }
        },
        setActiveParticipant: (state, action) => {
            state.activeParticipantIndex = action.payload;
        },
        addFile: (state, action) => {
            const { participantId, file } = action.payload;
            const participant = state.participants.find((p) => p.id === participantId);
            if (participant) participant.files.push(file);
        },
        removeFile: (state, action) => {
            const { participantId, fileName } = action.payload;
            const participant = state.participants.find((p) => p.id === participantId);
            if (participant) {
                participant.files = participant.files.filter((file) => file.name !== fileName);
            }
        },
    },
});

export const {
    addParticipant,
    deleteParticipant,
    setActiveParticipant,
    addFile,
    removeFile,
} = participantsSlice.actions;

export default participantsSlice.reducer;
