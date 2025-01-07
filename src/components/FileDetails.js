// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateFileInput, removeFileInput } from "../redux/fileUploaderSlice";

// const FileDetails = ({ activeParticipant }) => {
//     const dispatch = useDispatch();
//     const { fileInputs, selectedFileId } = useSelector((state) => state.fileUploader);

//     const handleFileChange = (id, e) => {
//         const file = e.target.files[0];
//         dispatch(updateFileInput({ id, changes: { file, uploading: false, progress: 0 } }));
//     };

//     const handleUploadFile = (id, file) => {
//         if (file && activeParticipant) {
//             // Simulate upload progress
//             let progress = 0;
//             const interval = setInterval(() => {
//                 if (progress < 100) {
//                     progress += 10;
//                     dispatch(updateFileInput({ id, changes: { uploading: true, progress } }));
//                 } else {
//                     clearInterval(interval);
//                     dispatch(updateFileInput({ id, changes: { uploading: false } }));
//                 }
//             }, 500);
//         }
//     };

//     return (
//         <div className="file-details">
//             {fileInputs.map((input) =>
//                 input.id === selectedFileId ? (
//                     <div key={input.id}>
//                         <input
//                             type="file"
//                             onChange={(e) => handleFileChange(input.id, e)}
//                             className="choose-btn"
//                             disabled={input.uploading || !input.name}
//                         />
//                         {input.name && (
//                             <div className="file-details-info">
//                                 {input.uploading ? (
//                                     <div className="progress-container">
//                                         <div
//                                             className="progress-bar"
//                                             style={{ width: `${input.progress}%` }}
//                                         ></div>
//                                     </div>
//                                 ) : (
//                                     <button
//                                         className="upload-btn"
//                                         onClick={() => handleUploadFile(input.id, input.file)}
//                                         disabled={input.uploading || !input.file}
//                                     >
//                                         Upload
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                         <button
//                             className="remove-input-btn"
//                             onClick={() => dispatch(removeFileInput(input.id))}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 ) : null
//             )}
//         </div>
//     );
// };

// export default FileDetails;



import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFileInput, removeFileInput } from "../redux/fileUploaderSlice";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faClose, faTimes, faCross } from '@fortawesome/free-solid-svg-icons';

const FileDetails = ({ activeParticipant }) => {
    const dispatch = useDispatch();
    const [fileInputs, setFileInputs] = useState(activeParticipant.documents || []);
    const { participants, activeParticipantIndex, activeDocumentId } = useSelector(
        (state) => state.participants
    );

    const handleFileChange = (id, e) => {
        const file = e.target.files[0];
        dispatch(addFile({ participantId: activeParticipant.id, documentId: activeDocumentId, file: file }));
    };

    const handleUploadFile = (id, file) => {
        if (file && activeParticipant) {
            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress += 10;
                    dispatch(updateFile({ id, changes: { uploading: true, progress } }));
                } else {
                    clearInterval(interval);
                    dispatch(updateFile({ id, changes: { uploading: false } }));
                }
            }, 500);
        }
    };

    return (
        <div className="file-details">
            {fileInputs.map((input) =>
                input.id === activeDocumentId ? (
                    <div key={input.id}>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(input.id, e)}
                            className="choose-btn"
                            disabled={input.uploading || !input.name}
                        />
                        {input.name && (
                            <div className="file-details-info">
                                {input.uploading ? (
                                    <div className="progress-container">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${input.progress}%` }}
                                        ></div>
                                    </div>
                                ) : (
                                    <button
                                        className="upload-btn"
                                        onClick={() => handleUploadFile(input.id, input.file)}
                                        disabled={input.uploading || !input.file}
                                    >
                                        Upload
                                    </button>
                                )}
                            </div>
                        )}
                        <button
                            className="remove-input-btn"
                            onClick={() => dispatch(removeFile(input.id))}
                        >
                            Cancel
                        </button>
                    </div>
                ) : null
            )}
        </div>
    );
};














































// const FileDetails = ({ activeParticipant, activeDocumentId }) => {
//     const dispatch = useDispatch();
//     //const { fileInputs, selectedFileId } = useSelector((state) => state.fileUploader);
//     const { participants, activeParticipantIndex } = useSelector(
//         (state) => state.participants
//     );

//     const [fileInputs, setFileInputs] = useState(activeParticipant.documents.files || []);

//     const handleFileChange = (id, e) => {
//         const file = e.target.files[0];
//         dispatch(updateFileInput({ id, changes: { file, uploading: false, progress: 0 } }));
//     };

//     const handleUploadFile = (id, file) => {
//         if (file && activeParticipant) {
//             let progress = 0;
//             const interval = setInterval(() => {
//                 if (progress < 100) {
//                     progress += 10;
//                     dispatch(updateFileInput({ id, changes: { uploading: true, progress } }));
//                 } else {
//                     clearInterval(interval);
//                     dispatch(updateFileInput({ id, changes: { uploading: false } }));
//                 }
//             }, 500);
//         }
//     };

//     return (
//         <div className="w-full max-w-md mx-auto p-4">
//             {fileInputs.map((input) =>
//                 input.id === selectedFileId ? (
//                     <div
//                         key={input.id}
//                         className="bg-white rounded-lg shadow-md p-4 space-y-4"
//                     >
//                         <div className="relative group">
//                             <input
//                                 type="file"
//                                 onChange={(e) => handleFileChange(input.id, e)}
//                                 className="hidden"
//                                 id={`file-input-${input.id}`}
//                                 disabled={input.uploading || !input.name}
//                             />
//                             <label
//                                 htmlFor={`file-input-${input.id}`}
//                                 className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer
//                   ${input.uploading || !input.name
//                                         ? 'border-gray-300 bg-gray-50'
//                                         : 'border-blue-300 hover:border-blue-400 bg-blue-50 hover:bg-blue-100'
//                                     } transition-all duration-200`}
//                             >
//                                 <div className="flex items-center space-x-2">
//                                     <FontAwesomeIcon icon={faUpload} className="ms-3" />
//                                     <span className="text-sm text-gray-600">
//                                         {input.file ? input.file.name : 'Choose a file'}
//                                     </span>
//                                 </div>
//                             </label>
//                         </div>

//                         {input.name && (
//                             <div className="space-y-4">
//                                 {input.uploading ? (
//                                     <div className="relative pt-1">
//                                         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                                             <div
//                                                 className="h-full bg-blue-500 rounded-full transition-all duration-200"
//                                                 style={{ width: `${input.progress}%` }}
//                                             />
//                                         </div>
//                                         <div className="flex justify-between mt-1">
//                                             <span className="text-xs text-gray-500">Uploading...</span>
//                                             <span className="text-xs text-gray-500">{input.progress}%</span>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <button
//                                         className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg
//                       ${input.file
//                                                 ? 'bg-blue-500 hover:bg-blue-600 text-white'
//                                                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                             } transition-colors duration-200`}
//                                         onClick={() => handleUploadFile(input.id, input.file)}
//                                         disabled={input.uploading || !input.file}
//                                     >
//                                         {/* <Upload className="w-4 h-4" /> */}
//                                         <FontAwesomeIcon icon={faUpload} className="ms-3" />
//                                         <span>Upload</span>
//                                     </button>
//                                 )}

//                                 <button
//                                     className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-500 hover:text-red-600 
//                     bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
//                                     onClick={() => dispatch(removeFileInput(input.id))}
//                                 >
//                                     <FontAwesomeIcon icon={faTimes} className="ms-3" />
//                                     <span>Cancel</span>
//                                 </button>
//                             </div>
//                         )}

//                         {input.progress === 100 && (
//                             <div className="flex items-center justify-center space-x-2 text-green-500 bg-green-50 rounded-lg p-2">
//                                 {/* <Check className="w-4 h-4" /> */}
//                                 <FontAwesomeIcon icon={faCross} className="ms-3" />
//                                 <span className="text-sm">Upload complete!</span>
//                             </div>
//                         )}
//                     </div>
//                 ) : null
//             )}
//         </div>
//     );
// };

export default FileDetails;