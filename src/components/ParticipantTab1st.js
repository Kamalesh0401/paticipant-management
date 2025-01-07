// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//     addParticipant,
//     deleteParticipant,
//     setActiveParticipant,
// } from '../redux/participantsSlice';

// const ParticipantTab = () => {
//     const dispatch = useDispatch();
//     const { participants, activeParticipantIndex } = useSelector(
//         (state) => state.participants
//     );

//     const handleAddParticipant = () => {
//         dispatch(addParticipant());
//     };

//     const handleDeleteParticipant = (id) => {
//         dispatch(deleteParticipant(id));
//     };

//     const handleSwitchTab = (index) => {
//         dispatch(setActiveParticipant(index));
//     };

//     return (
//         <div className="participant-tabs">
//             <div className="tabs">
//                 {participants.map((participant, index) => (
//                     <div
//                         key={participant.id}
//                         className={`tab ${activeParticipantIndex === index ? 'active-tab' : ''
//                             }`}
//                         onClick={() => handleSwitchTab(index)}
//                     >
//                         {participant.name}
//                         <button
//                             className="delete-btn"
//                             onClick={(e) => {
//                                 e.stopPropagation(); // Prevent switching tabs when deleting
//                                 handleDeleteParticipant(participant.id);
//                             }}
//                         >
//                             ✖
//                         </button>
//                     </div>
//                 ))}
//                 <button className="add-btn" onClick={handleAddParticipant}>
//                     + Add Participant
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ParticipantTab;



import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addParticipant,
    deleteParticipant,
    setActiveParticipant,
} from '../redux/participantsSlice';
import FileUploader from './FileUploader';
import AddParticipantModal from './AddParticipantModal';

const ParticipantTab = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { participants, activeParticipantIndex } = useSelector(
        (state) => state.participants
    );

    const handleAddParticipant = (name) => {
        dispatch(addParticipant(name));
        setIsModalOpen(false);
    };

    const handleDeleteParticipant = (id) => {
        dispatch(deleteParticipant(id));
    };

    const handleSwitchTab = (index) => {
        dispatch(setActiveParticipant(index));
    };

    return (
        <div className="participant-tabs-container">
            <div className="tabs">
                {participants.map((participant, index) => (
                    <div
                        key={participant.id}
                        className={`tab ${activeParticipantIndex === index ? 'active-tab' : ''
                            }`}
                        onClick={() => handleSwitchTab(index)}
                    >
                        {participant.name}
                        <button
                            className="delete-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent switching tabs when deleting
                                handleDeleteParticipant(participant.id);
                            }}
                        >
                            ✖
                        </button>
                    </div>
                ))}
                <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                    + Add Participant
                </button>
                {isModalOpen && (
                    <AddParticipantModal
                        onSave={handleAddParticipant}
                        onCancel={() => setIsModalOpen(false)}
                    />
                )}
            </div>

            <div className="active-participant-content">
                {participants.length > 0 ? (
                    <div>
                        <h3>{participants[activeParticipantIndex].name}</h3>
                        {/* Render the FileUploader component here */}
                        <FileUploader />
                    </div>
                ) : (
                    <p>No participants available. Add a participant to begin.</p>
                )}
            </div>
        </div>
    );
};

export default ParticipantTab;
