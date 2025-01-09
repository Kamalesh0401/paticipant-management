import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateFile,
    removeFile,
} from '../redux/participantsSlice';
import './FileDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const FileDetails = () => {
    const dispatch = useDispatch();
    const [fileInputs, setFileInputs] = useState([]);
    const { participants, activeParticipantIndex, activeDocumentId } = useSelector(
        (state) => state.participants
    );
    const activeParticipant = participants[activeParticipantIndex];

    useEffect(() => {
        if (activeParticipant) {
            const Files = activeParticipant?.documents.find((doc) => doc.id === activeDocumentId)?.files;
            setFileInputs(Files);
        }
    }, [activeParticipant, activeDocumentId]);


    const handleUploadFile = (id, file) => {
        if (file && activeParticipant) {
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress += 3;
                    dispatch(updateFile({ participantId: activeParticipant.id, documentId: activeDocumentId, fileId: id, changes: { uploading: true, status: 'uploading', progress } }));
                } else {
                    clearInterval(interval);
                    dispatch(updateFile({ participantId: activeParticipant.id, documentId: activeDocumentId, fileId: id, changes: { uploading: false, status: 'completed' } }));
                }
            }, 100);
        }
    }

    return (
        <>
            <div className="file-list">
                {fileInputs && fileInputs.length > 0 ? (
                    fileInputs.map((file) => (
                        <div className="file-item" key={file.id}>
                            <div className="file-icon">
                                <FontAwesomeIcon icon={faFileAlt} />
                            </div>
                            <div className="file-details">
                                {file.status !== "completed" && <div className="file-progress-container">
                                    <div className="file-progress-bar">
                                        <div
                                            className="file-progress"
                                            style={{ width: `${file.progress || 0}%` }}
                                        >
                                        </div>
                                    </div>
                                    {(file.progress >= 10 && file.progress <= 100) && (
                                        <span className="file-progress-end">{file.progress}%</span>
                                    )}
                                </div>}

                                <div className="file-name">{file.name || "Untitled File"}</div>
                                <div className="file-info">
                                    <span>{(file.size / 1024).toFixed(2)} KB</span> | <span>{file.type}</span> | {" "}
                                    <strong>
                                        <span className={`status-text ${file.status}`}>
                                            {file.status === "uploading" ? `  uploading${file.status === "uploading" ? "..." : ""}` : file.status}
                                        </span>
                                    </strong>
                                </div>
                            </div>
                            <div className="file-actions">
                                <button
                                    className={`upload-btn ${file.status === "completed" ? "disabled" : ""}`}
                                    onClick={(e) => handleUploadFile(file.id, e)}
                                    disabled={(file.status === "completed") || (file.status === "uploading")}
                                >
                                    Upload <FontAwesomeIcon icon={faUpload} />
                                </button>
                                <button
                                    className={`remove-file-btn ${file.status === "uploading" ? "disabled" : ""}`}
                                    disabled={file.status === "uploading"}
                                    onClick={() =>
                                        dispatch(
                                            removeFile({
                                                participantId: activeParticipant.id,
                                                documentId: activeDocumentId,
                                                fileId: file.id,
                                            })
                                        )
                                    }
                                >
                                    Remove <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-files">No files uploaded yet.</div>
                )}
            </div >

        </>

    );
};

export default FileDetails;