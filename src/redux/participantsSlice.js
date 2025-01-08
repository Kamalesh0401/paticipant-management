import { createSlice } from '@reduxjs/toolkit';

const participantsSlice = createSlice({
  name: 'participants',
  initialState: {
    participants: [],
    activeParticipantIndex: 0,
    activeDocumentId: null, // Track globally active document
  },
  reducers: {
    addParticipant: (state, action) => {
      const newParticipant = {
        id: Date.now(),
        name: action.payload,
        documents: [],
        activeDocumentId: null // Track active document for each participant
      };
      state.participants.push(newParticipant);
      state.activeParticipantIndex = state.participants.length - 1;
    },
    deleteParticipant: (state, action) => {
      const deletedParticipant = state.participants.find(p => p.id === action.payload);
      if (deletedParticipant && deletedParticipant.activeDocumentId === state.activeDocumentId) {
        state.activeDocumentId = null;
      }
      state.participants = state.participants.filter(
        (p) => p.id !== action.payload
      );
      if (state.activeParticipantIndex >= state.participants.length) {
        state.activeParticipantIndex = Math.max(0, state.participants.length - 1);
      }
    },
    setActiveParticipant: (state, action) => {
      state.activeParticipantIndex = action.payload;
      // Update global active document to match active participant's active document
      const activeParticipant = state.participants[action.payload];
      if (activeParticipant) {
        state.activeDocumentId = activeParticipant.activeDocumentId;
      }
    },
    addDocument: (state, action) => {
      const { participantId, documentName, id } = action.payload;
      const participant = state.participants.find(p => p.id === participantId);
      if (participant) {
        const documentExists = participant.documents.some(
          doc => doc.name.toLowerCase() === documentName.toLowerCase()
        );

        if (!documentExists) {
          const newDocument = {
            id: id,
            name: documentName,
            files: []
          };
          participant.documents.push(newDocument);

          // Set as active document if it's the first one
          if (participant.documents.length === 1) {
            participant.activeDocumentId = newDocument.id;
            if (state.participants[state.activeParticipantIndex].id === participantId) {
              state.activeDocumentId = newDocument.id;
            }
          }
        }
      }
    },
    setActiveDocument: (state, action) => {
      const { participantId, documentId } = action.payload;
      const participant = state.participants.find(p => p.id === participantId);
      if (participant && participant.documents.some(doc => doc.id === documentId)) {
        participant.activeDocumentId = documentId;
        if (state.participants[state.activeParticipantIndex].id === participantId) {
          state.activeDocumentId = documentId;
        }
      }
    },
    removeDocument: (state, action) => {
      const { participantId, documentId } = action.payload;
      const participant = state.participants.find(p => p.id === participantId);
      if (participant) {
        // If removing active document, set another one as active
        if (participant.activeDocumentId === documentId) {
          const remainingDocs = participant.documents.filter(
            doc => doc.id !== documentId
          );
          participant.activeDocumentId = remainingDocs.length > 0 ? remainingDocs[0].id : null;

          if (state.participants[state.activeParticipantIndex].id === participantId) {
            state.activeDocumentId = participant.activeDocumentId;
          }
        }
        participant.documents = participant.documents.filter(
          doc => doc.id !== documentId
        );
      }
    },
    addFile: (state, action) => {
      const { participantId, documentId, file, id } = action.payload;
      const participant = state.participants.find(p => p.id === participantId);
      if (participant) {
        const document = participant.documents.find(doc => doc.id === documentId);
        if (document) {
          document.files.push({
            id: id,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            status: 'pending',
            progress: 0,
            url: null
          });
        }
      }
    },
    updateFile: (state, action) => {
      const { participantId, documentId, fileId, changes } = action.payload;
      const participant = state.participants.find(p => p.id === participantId);
      if (participant) {
        const document = participant.documents.find(doc => doc.id === documentId);
        if (document) {
          const fileIndex = document.files.findIndex(f => f.id === fileId);
          if (fileIndex !== -1) {
            document.files[fileIndex] = {
              ...document.files[fileIndex],
              ...changes
            };
          }
        }
      }
    },
    removeFile: (state, action) => {
      const { participantId, documentId, fileId } = action.payload;
      const participant = state.participants.find(p => p.id === participantId);
      if (participant) {
        const document = participant.documents.find(doc => doc.id === documentId);
        if (document) {
          document.files = document.files.filter(file => file.id !== fileId);
        }
      }
    },
  },
});

export const {
  addParticipant,
  deleteParticipant,
  setActiveParticipant,
  addDocument,
  removeDocument,
  setActiveDocument,
  addFile,
  updateFile,
  removeFile,
} = participantsSlice.actions;

export default participantsSlice.reducer;