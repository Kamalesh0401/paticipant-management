import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addDocument,
    removeDocument,
    addFile,
    setActiveDocument
} from '../redux/participantsSlice';
import FileDetails from "./FileDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./FileUploader.css";

const FileUploader = () => {
    const dispatch = useDispatch();
    const { participants, activeParticipantIndex, activeDocumentId } = useSelector(
        (state) => state.participants
    );
    const activeParticipant =
        participants.length > 0 ? participants[activeParticipantIndex] : null;

    const [fileInputs, setFileInputs] = useState([]);
    const [fileName, setFileName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef();
    const [dragOver, setDragOver] = useState(false);


    useEffect(() => {
        if (activeParticipant) {
            setFileInputs(activeParticipant.documents);
        }
    }, [activeParticipant, activeDocumentId]);

    const handleAddFileInput = () => {
        setShowModal(true);
    };
    useEffect(() => {
        if (inputRef && inputRef.current)
            setFocus();
    }, [showModal]);

    const setFocus = () => {
        if (inputRef && inputRef.current)
            inputRef.current.focus()
    }

    const handleSaveFileName = () => {
        if (fileName) {
            const documentExists = activeParticipant.documents.some(
                doc => doc.name.toLowerCase() === fileName.toLowerCase()
            );
            if (!documentExists) {
                const newDocument = {
                    id: Date.now(),
                    file: null,
                    name: fileName,
                    uploading: false,
                    progress: 0,
                    files: [],
                };
                setFileInputs([
                    ...fileInputs,
                    newDocument,
                ]);
                dispatch(addDocument({ participantId: activeParticipant.id, documentName: newDocument.name, id: newDocument.id }));
                dispatch(setActiveDocument({ participantId: activeParticipant.id, documentId: newDocument.id }));
                setFileName("");
                setShowModal(false);
            }
            else {
                alert("File name already exists!");
                setFocus();
            }
        } else {
            alert("File name cannot be empty!");
            setFocus();
        }
    };

    const handleFileChange = (rawFile) => {
        if (rawFile) {
            const file = {
                name: rawFile.name,
                size: rawFile.size,
                type: rawFile.type,
            }
            dispatch(addFile({ participantId: activeParticipant.id, documentId: activeDocumentId, file: file, id: Date.now() }));
        }
    };

    return (
        <div className="file-uploader">
            {(activeParticipant) ? (
                <>
                    <div className="file-tabs">
                        {fileInputs.map((input) => (
                            <div
                                key={input.id}
                                className={`file-tab ${activeDocumentId === input.id ? "selected" : ""}`}
                                onClick={() =>
                                    dispatch(
                                        setActiveDocument({
                                            participantId: activeParticipant.id,
                                            documentId: input.id,
                                        })
                                    )
                                }
                            >
                                <span className="file-name">{input.name || "Untitled"}</span>
                                <button
                                    className={`delete-btn ${activeDocumentId === input.id ? "delete-white-btn" : "delete-red-btn"
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(
                                            removeDocument({
                                                participantId: activeParticipant.id,
                                                documentId: input.id,
                                            })
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        ))}
                        <button className="add-file-btn" onClick={handleAddFileInput}>
                            <FontAwesomeIcon icon={faPlus} /> Add File Name
                        </button>
                    </div>
                    {(fileInputs.length !== 0) ?
                        <div className="row file-details">
                            <div className="align-items-center "
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    handleFileChange(e.dataTransfer.files[0]);
                                }}
                            >
                                <div className="file-upload-container">
                                    <label
                                        className="file-upload-label"
                                        htmlFor="file-input"
                                        onDragEnter={() => setDragOver(true)}
                                        onDragLeave={() => setDragOver(false)}
                                    >
                                        <div className={`file-upload-content ${dragOver ? "drag-over" : ""}`}>
                                            <FontAwesomeIcon icon={faDownload} className="plus-icon" />
                                            <span className="choose-label">
                                                Select a file or drag it here
                                            </span>
                                        </div>
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        onChange={(e) => handleFileChange(e.target.files[0])}
                                        className="file-input"
                                    />
                                </div>
                            </div>
                            <FileDetails activeParticipant={activeParticipant} activeDocumentId={activeDocumentId} />
                        </div> :
                        <div className="row file-details">
                            <p>No documents available</p>
                        </div>
                    }
                    {showModal && (
                        <div className="file-modal-overlay">
                            <div className="file-modal-content">
                                <h3>Add File Name</h3>
                                <button type="button" className="close-btn" onClick={() => setShowModal(false)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="Enter file name"
                                    className="file-modal-input"
                                    ref={inputRef}
                                />
                                <div className="file-modal-buttons">
                                    <button onClick={handleSaveFileName} className="save-btn">
                                        Save
                                    </button>
                                    <button onClick={() => setShowModal(false)} className="cancel-btn">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="file-tabs">
                    <p>Please select or add a participant to manage files.</p>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
