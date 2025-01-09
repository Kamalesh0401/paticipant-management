import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import "./ParticipantTab.css";
import FileUploader from "./FileUploader";
import AddParticipantModal from "./AddParticipantModal";
import FooterNavigation from "./FooterNavigation";
import {
    addParticipant,
    deleteParticipant,
    setActiveParticipant,
} from '../redux/participantsSlice';
const ParticipantTab = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { participants, activeParticipantIndex } = useSelector(
        (state) => state.participants
    );

    const handleAddParticipant = (name) => {
        if (name.trim() !== "") {
            dispatch(addParticipant(name));
            setIsModalOpen(false);
        };
    }

    const handleDeleteParticipant = (id) => {
        dispatch(deleteParticipant(id));
    };

    const handleSwitchTab = (index) => {
        dispatch(setActiveParticipant(index));
    };

    return (
        <div className="participant mt-3 p-3">
            <div className="participant-container">
                <div className="d-flex justify-content-between mb-3">
                    <h2>Participant management</h2>
                    <button
                        className="add-participant-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faUserPlus} className="me-2 add-icon" />
                        Add Participant
                    </button>
                </div>
                <div className={`${participants.length === 0 ? 'no-tabs-container' : 'tabs-container'} d-flex flex-wrap`}>
                    {participants.map((participant, index) => (
                        <div
                            key={participant.id}
                            className={`mt-1 mb-1 tab-item ${activeParticipantIndex === index ? "active-tab" : ""
                                }`}
                            onClick={() => handleSwitchTab(index)}
                        >
                            {participant.name}
                            <button
                                className={`${activeParticipantIndex === index ? "delete-white-btn" : "delete-red-btn"}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteParticipant(participant.id);
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    ))}
                    {participants.length === 0 && <p className="ms-2">No participants available. Add one to get started!</p>}
                </div>
                {participants.length > 0 && (
                    <div className="active-tab-content mt-4">
                        <h3 className="mb-3">{participants[activeParticipantIndex].name}</h3>
                        <FileUploader />
                    </div>
                )}
            </div>
            {participants.length !== 0 &&
                <div className="mt-5">
                    <FooterNavigation />
                </div>}
            {isModalOpen && (
                <AddParticipantModal
                    onSave={(name) => handleAddParticipant(name)}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ParticipantTab;