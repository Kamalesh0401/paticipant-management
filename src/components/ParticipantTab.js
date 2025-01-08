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
        <div className="mt-4 p-5">
            {/* Add Participant Button */}
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

            {/* Tabs Section */}
            <div className="tabs-container d-flex flex-wrap">
                {participants.map((participant, index) => (
                    <div
                        key={participant.id}
                        className={`${index === 0 ? "ms-2" : ""} mt-1 mb-1 tab-item ${activeParticipantIndex === index ? "active-tab" : ""
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

            {/* Active Participant Content */}

            {participants.length > 0 && (
                <div className="active-tab-content mt-4">
                    <h3 className="mb-3">{participants[activeParticipantIndex].name}</h3>
                    <FileUploader />
                </div>
            )}


            {participants.length !== 0 &&
                <div className="mt-5">
                    <FooterNavigation />
                </div>}

            {/* Add Participant Modal */}
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