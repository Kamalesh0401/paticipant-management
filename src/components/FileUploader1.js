// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addFile, removeFile } from "../redux/participantsSlice";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload, faClose } from '@fortawesome/free-solid-svg-icons';
// import "./FileUploader.css";

// const FileUploader = () => {
//     const dispatch = useDispatch();
//     const { participants, activeParticipantIndex } = useSelector(
//         (state) => state.participants
//     );
//     const activeParticipant =
//         participants.length > 0 ? participants[activeParticipantIndex] : null;

//     const [fileInputs, setFileInputs] = useState([{ id: Date.now(), file: null }]);

//     const handleFileChange = (id, e) => {
//         const updatedInputs = fileInputs.map((input) =>
//             input.id === id ? { ...input, file: e.target.files[0] } : input
//         );
//         setFileInputs(updatedInputs);
//     };

//     const handleAddFileInput = () => {
//         setFileInputs([...fileInputs, { id: Date.now(), file: null }]);
//     };

//     const handleUploadFile = (file) => {
//         if (file && activeParticipant) {
//             dispatch(
//                 addFile({ participantId: activeParticipant.id, file: file })
//             );
//         }
//     };

//     const handleRemoveFileInput = (id) => {
//         setFileInputs(fileInputs.filter((input) => input.id !== id));
//     };

//     const handleRemoveUploadedFile = (fileName) => {
//         dispatch(
//             removeFile({ participantId: activeParticipant.id, fileName: fileName })
//         );
//     };

//     return (
//         <div className="file-uploader">
//             {activeParticipant ? (
//                 <>
//                     <div className="file-actions">
//                         {fileInputs.map((input, index) => (
//                             <div key={input.id} className="file-input-group">
//                                 <input
//                                     type="file"
//                                     onChange={(e) => handleFileChange(input.id, e)}
//                                     className="choose-btn"
//                                 />
//                                 <button
//                                     className="upload-btn"
//                                     onClick={() => handleUploadFile(input.file)}
//                                     disabled={!input.file}
//                                 >
//                                     Upload <FontAwesomeIcon icon={faUpload} className="ms-3" />
//                                 </button>
//                                 <button
//                                     className="remove-input-btn"
//                                     onClick={() => handleRemoveFileInput(input.id)}
//                                 >
//                                     Cancel <FontAwesomeIcon icon={faClose} className="ms-3" />
//                                 </button>
//                             </div>
//                         ))}
//                         <button className="add-file-btn" onClick={handleAddFileInput}>
//                             + Add File
//                         </button>
//                     </div>

//                     {/* <div className="file-list">
//                         <h4>Uploaded Files:</h4>
//                         {activeParticipant.files.length > 0 ? (
//                             <ul>
//                                 {activeParticipant.files.map((file, index) => (
//                                     <li key={index} className="file-item">
//                                         <span>{file.name}</span>
//                                         <button
//                                             className="remove-btn"
//                                             onClick={() => handleRemoveUploadedFile(file.name)}
//                                         >
//                                             ✖
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p>No files uploaded yet.</p>
//                         )}
//                     </div> */}
//                 </>
//             ) : (
//                 <p>Please select or add a participant to manage files.</p>
//             )}
//         </div>
//     );
// };

// export default FileUploader;























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
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
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


    useEffect(() => {
        console.log("fileInputs useEffect in Upload: ", fileInputs, activeDocumentId);
        if (activeParticipant) {
            setFileInputs(activeParticipant.documents);
        }
    }, [activeParticipant, activeDocumentId]);

    const handleAddFileInput = () => {
        setShowModal(true);
    };

    const setFocus = () => {
        inputRef.current.focus()
    }

    const handleSaveFileName = () => {
        if (fileName) {
            const newDocument = {
                id: Date.now(),
                file: null,
                name: fileName,
                uploading: false,
                progress: 0,
                files: [], // Added to support multiple files under the same name
            };
            setFileInputs([
                ...fileInputs,
                newDocument,
            ]);
            dispatch(addDocument({ participantId: activeParticipant.id, documentName: newDocument.name, id: newDocument.id }));
            dispatch(setActiveDocument({ participantId: activeParticipant.id, documentId: newDocument.id }));
            setFileName("");
            setShowModal(false);
        } else {
            alert("File name cannot be empty!");
            setFocus();
        }
    };

    const handleFileChange = (e) => {
        const rawFile = e.target.files[0];
        const file = {
            name: rawFile.name,
            size: rawFile.size,
            type: rawFile.type,
        }
        dispatch(addFile({ participantId: activeParticipant.id, documentId: activeDocumentId, file: file, id: Date.now() }));
    };

    return (
        <div className="file-uploader">
            {(activeParticipant) ? (
                <>
                    {/* Left Sidebar (Tabs) */}
                    <div className="file-tabs">
                        {fileInputs.map((input) => (
                            <div
                                key={input.id}
                                className={`file-tab ${activeDocumentId === input.id ? "selected" : ""}`}
                                onClick={() => dispatch(setActiveDocument({ participantId: activeParticipant.id, documentId: input.id }))}
                            >
                                {input.name || "Untitled"}
                            </div>
                        ))}
                        <button className="add-file-btn" onClick={handleAddFileInput}>
                            + Add File Name
                        </button>
                    </div>

                    {/* Right Side (File Details) */}
                    {fileInputs.length !== 0 && <div className="file-details">
                        <div className="row">
                            <div className="col-md-8 file-upload-wrapper">
                                <label className="file-upload-label" htmlFor="file-input">
                                    <div className="file-upload-content">
                                        <span className="plus-icon">+</span>
                                        <span className="choose-label">Choose File</span>
                                    </div>
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    onChange={(e) => handleFileChange(activeDocumentId, e)}
                                    className="file-input"
                                />
                            </div>
                            <div className="col-md-4">
                                <button
                                    className="remove-input-btn"
                                    onClick={() => dispatch(removeDocument({ participantId: activeParticipant.id, documentId: activeDocumentId }))}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <FileDetails activeParticipant={activeParticipant} activeDocumentId={activeDocumentId} />
                    </div>}


                    {/* Modal for entering file name */}
                    {showModal && (
                        <div className="file-modal-overlay">
                            <div className="file-modal-content">
                                <h3>Add File Name</h3>
                                <button type="button" className="close-btn" onClick={() => setShowModal(false)}>
                                    <FontAwesomeIcon icon={faTimes} className="me-0" />
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
                <p>Please select or add a participant to manage files.</p>
            )}
        </div>
    );
};

export default FileUploader;
