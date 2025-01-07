import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFile, removeFile } from "../redux/participantsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faClose } from '@fortawesome/free-solid-svg-icons';
import "./FileUploader.css";

const FileUploader = () => {
    const dispatch = useDispatch();
    const { participants, activeParticipantIndex } = useSelector(
        (state) => state.participants
    );
    const activeParticipant =
        participants.length > 0 ? participants[activeParticipantIndex] : null;

    const [fileInputs, setFileInputs] = useState([{ id: Date.now(), file: null }]);

    const handleFileChange = (id, e) => {
        const updatedInputs = fileInputs.map((input) =>
            input.id === id ? { ...input, file: e.target.files[0] } : input
        );
        setFileInputs(updatedInputs);
    };

    const handleAddFileInput = () => {
        setFileInputs([...fileInputs, { id: Date.now(), file: null }]);
    };

    const handleUploadFile = (file) => {
        if (file && activeParticipant) {
            dispatch(
                addFile({ participantId: activeParticipant.id, file: file })
            );
        }
    };

    const handleRemoveFileInput = (id) => {
        setFileInputs(fileInputs.filter((input) => input.id !== id));
    };

    const handleRemoveUploadedFile = (fileName) => {
        dispatch(
            removeFile({ participantId: activeParticipant.id, fileName: fileName })
        );
    };

    return (
        <div className="file-uploader">
            {activeParticipant ? (
                <>
                    <div className="file-actions">
                        {fileInputs.map((input, index) => (
                            <div key={input.id} className="file-input-group">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(input.id, e)}
                                    className="choose-btn"
                                />
                                <button
                                    className="upload-btn"
                                    onClick={() => handleUploadFile(input.file)}
                                    disabled={!input.file}
                                >
                                    Upload <FontAwesomeIcon icon={faUpload} className="ms-3" />
                                </button>
                                <button
                                    className="remove-input-btn"
                                    onClick={() => handleRemoveFileInput(input.id)}
                                >
                                    Cancel <FontAwesomeIcon icon={faClose} className="ms-3" />
                                </button>
                            </div>
                        ))}
                        <button className="add-file-btn" onClick={handleAddFileInput}>
                            + Add File
                        </button>
                    </div>

                    {/* <div className="file-list">
                        <h4>Uploaded Files:</h4>
                        {activeParticipant.files.length > 0 ? (
                            <ul>
                                {activeParticipant.files.map((file, index) => (
                                    <li key={index} className="file-item">
                                        <span>{file.name}</span>
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemoveUploadedFile(file.name)}
                                        >
                                            ✖
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No files uploaded yet.</p>
                        )}
                    </div> */}
                </>
            ) : (
                <p>Please select or add a participant to manage files.</p>
            )}
        </div>
    );
};

export default FileUploader;
