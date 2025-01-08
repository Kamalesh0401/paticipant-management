import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './AddParticipantModel.css';

const AddParticipantModal = ({ onSave, onCancel }) => {
    const [name, setName] = useState("");
    const inputRef = useRef();
    const handleSave = () => {
        if (name.trim()) {
            onSave(name);
        } else {
            alert("Participant name cannot be empty!");
            setFocus();
        }
    };

    const setFocus = () => {
        inputRef.current.focus()
    }
    return (
        <div className="participant-modal-overlay">
            <div className="participant-modal-content">
                <h3>Add Participant</h3>
                <button type="button" className="close-btn" onClick={onCancel}>
                    <FontAwesomeIcon icon={faTimes} className="me-0" />
                </button>
                <input
                    type="text"
                    placeholder="Enter participant name"
                    value={name}
                    id="participantName"
                    ref={inputRef}
                    onChange={(e) => setName(e.target.value)}
                    className="participant-modal-input"
                />
                <div className="participant-modal-buttons">
                    <button className="save-btn" onClick={handleSave}>
                        Save
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddParticipantModal;
