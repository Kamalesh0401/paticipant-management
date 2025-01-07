// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addFile, removeFile } from "../redux/participantsSlice";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload, faClose, faTimes } from '@fortawesome/free-solid-svg-icons';
// import "./FileUploader.css";

// const FileUploader = () => {
//     const dispatch = useDispatch();
//     const { participants, activeParticipantIndex } = useSelector(
//         (state) => state.participants
//     );
//     const activeParticipant =
//         participants.length > 0 ? participants[activeParticipantIndex] : null;

//     const [fileInputs, setFileInputs] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [fileName, setFileName] = useState("");
//     const [selectedFileId, setSelectedFileId] = useState(null);

//     const handleFileChange = (id, e) => {
//         const updatedInputs = fileInputs.map((input) =>
//             input.id === id ? { ...input, file: e.target.files[0], uploading: false, progress: 0 } : input
//         );
//         setFileInputs(updatedInputs);
//     };

//     const handleAddFileInput = () => {
//         setShowModal(true);
//     };

//     const handleSaveFileName = () => {
//         if (fileName) {
//             let newFile = { id: Date.now(), file: null, name: fileName, uploading: false, progress: 0 };
//             setFileInputs([
//                 ...fileInputs,
//                 newFile,
//             ]);
//             setSelectedFileId(newFile.id)
//             setFileName("");
//             setShowModal(false);
//         }
//     };

//     const handleUploadFile = (id, file) => {
//         if (file && activeParticipant) {
//             dispatch(
//                 addFile({ participantId: activeParticipant.id, file: JSON.stringify(file) })
//             );

//             // Simulating upload progress
//             const updatedInputs = fileInputs.map((input) =>
//                 input.id === id ? { ...input, uploading: true, progress: 0 } : input
//             );
//             setFileInputs(updatedInputs);

//             let progress = 0;
//             const interval = setInterval(() => {
//                 console.log("Progress Interval call :",)
//                 if (progress < 100) {
//                     progress += 10;
//                     setFileInputs(prevState =>
//                         prevState.map(input =>
//                             input.id === id ? { ...input, progress } : input
//                         )
//                     );
//                 } else {
//                     clearInterval(interval);
//                     setFileInputs(prevState =>
//                         prevState.map(input =>
//                             input.id === id ? { ...input, uploading: false } : input
//                         )
//                     );
//                 }
//             }, 500);
//         }
//     };

//     const handleRemoveFileInput = (id) => {
//         setFileInputs(fileInputs.filter((input) => input.id !== id));
//         if (selectedFileId === id) {
//             setSelectedFileId(null); // Deselect file if it's removed
//         }
//     };

//     return (
//         <div className="file-uploader">
//             {activeParticipant ? (
//                 <>
//                     {/* Left Sidebar (Tabs) */}
//                     <div className="file-tabs">
//                         {fileInputs.map((input) => (
//                             <div
//                                 key={input.id}
//                                 className={`file-tab ${selectedFileId === input.id ? "selected" : ""}`}
//                                 onClick={() => setSelectedFileId(input.id)}
//                             >
//                                 {input.name || "Untitled"}
//                             </div>
//                         ))}
//                         <button className="add-file-btn" onClick={handleAddFileInput}>
//                             + Add File
//                         </button>
//                     </div>

//                     {/* Right Side (File Details) */}
//                     {selectedFileId && (
//                         <div className="file-details">
//                             {fileInputs.map((input) =>
//                                 input.id === selectedFileId ? (
//                                     <div key={input.id}>
//                                         <input
//                                             type="file"
//                                             onChange={(e) => handleFileChange(input.id, e)}
//                                             className="choose-btn"
//                                             disabled={input.uploading || !input.name}
//                                         />
//                                         {input.name && (
//                                             <div className="file-details-info">
//                                                 {input.uploading ? (
//                                                     <div className="progress-container">
//                                                         <div
//                                                             className="progress-bar"
//                                                             style={{ width: `${input.progress}%` }}
//                                                         ></div>
//                                                     </div>
//                                                 ) : (
//                                                     <button
//                                                         className="upload-btn"
//                                                         onClick={() => handleUploadFile(input.id, input.file)}
//                                                         disabled={input.uploading || !input.file}
//                                                     >
//                                                         Upload <FontAwesomeIcon icon={faUpload} className="ms-3" />
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         )}
//                                         <button
//                                             className="remove-input-btn"
//                                             onClick={() => handleRemoveFileInput(input.id)}
//                                         >
//                                             Cancel <FontAwesomeIcon icon={faClose} className="ms-3" />
//                                         </button>
//                                     </div>
//                                 ) : null
//                             )}
//                         </div>
//                     )}

//                     {/* Modal for entering file name */}
//                     {showModal && (<>
//                         <div className="file-modal-overlay">
//                             <div className="file-modal-content">
//                                 <h3>Add File Name</h3>
//                                 <button type="button" className="close-btn" onClick={() => setShowModal(false)}>
//                                     <FontAwesomeIcon icon={faTimes} className="me-0" />
//                                 </button>
//                                 <input
//                                     type="text"
//                                     value={fileName}
//                                     onChange={(e) => setFileName(e.target.value)}
//                                     placeholder="Enter file name"
//                                     className="file-modal-input"
//                                 />
//                                 <div className="file-modal-buttons">
//                                     <button onClick={handleSaveFileName} className="save-btn">
//                                         Save
//                                     </button>
//                                     <button onClick={() => setShowModal(false)} className="cancel-btn">
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                     )}
//                 </>
//             ) : (
//                 <p>Please select or add a participant to manage files.</p>
//             )}
//         </div>
//     );
// };

// export default FileUploader;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addParticipant,
    deleteParticipant,
    setActiveParticipant,
    addDocument,
    removeDocument,
    addFile,
    updateFile,
    removeFile,
    setActiveDocument
} from '../redux/participantsSlice';
import FileDetails from "./FileDetails";
import "./FileUploader.css";

const FileUploader = () => {
    const dispatch = useDispatch();
    const { participants, activeParticipantIndex, activeDocumentId } = useSelector(
        (state) => state.participants
    );
    const activeParticipant =
        participants.length > 0 ? participants[activeParticipantIndex] : null;

    const [fileInputs, setFileInputs] = useState(activeParticipant.documents || []);
    const [fileName, setFileName] = useState("");
    const [showModal, setShowModal] = useState(false);


    const handleAddFileInput = () => {
        setShowModal(true);
    };

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
            dispatch(addDocument(newDocument));
            dispatch(setActiveDocument({ participantId: activeParticipant.id, documentId: newDocument.id }));
            setFileName("");
            setShowModal(false);
        }
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
                                onClick={() => dispatch(setActiveDocument(input.id))}
                            >
                                {input.name || "Untitled"}
                            </div>
                        ))}
                        <button className="add-file-btn" onClick={handleAddFileInput}>
                            + Add File Name
                        </button>
                    </div>

                    {/* Right Side (File Details) */}
                    <FileDetails activeParticipant={activeParticipant} activeDocumentId={activeDocumentId} />

                    {/* Modal for entering file name */}
                    {showModal && (
                        <div className="file-modal-overlay">
                            <div className="file-modal-content">
                                <h3>Add File Name</h3>
                                <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    X
                                </button>
                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="Enter file name"
                                    className="file-modal-input"
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
