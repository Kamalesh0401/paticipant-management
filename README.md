# Participant Management Application

This application allows you to manage multiple participants, their details, and file uploads. Each participant is represented by a tab where you can add, view, and delete participant details. You can also upload files for each participant and manage them accordingly.

## Deployment

The application is hosted on Netlify.
- **Live Application**: https://participantpro.netlify.app/
  
## Features

### 1. Participant Management
- **Add Participant**: Click the "Add Participant" button to create a new participant. Each participant is added as a new tab.
- **Delete Participant**: Each tab includes a cross icon that removes the participant and their data.
- **Navigation**: Use the "Back" and "Next" buttons to navigate between participants. The UI updates to show the details of the selected participant.

### 2. File Management for Each Participant
- **Add Multiple Files**: Participants can add multiple files by clicking the "Add File Name" button and providing a name for the file they are uploading.
- **File Management Buttons**:
  - **Choose**: Opens a file picker to select a file from the local system or allows drag-and-drop functionality to upload a file.
  - **Upload**: Uploads the selected file for the participant.
  - **Remove**: Removes the selected file from the participant's file list.
- **Display Files**: All files for each participant are displayed within the respective tab.

### 3. Hosting and Submission
- **Git Repository**: The source code is hosted on GitHub.
- **Hosted Application**: The application is deployed on Netlify.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/participant-management.git

2. Navigate to the project directory:
 
   ```bash
   cd participant-management

3. Install the dependencies to the project directory:
 
   ```bash
   npm install

4. Start the development server:
 
   ```bash
   npm start
   

Open http://localhost:3000 to view the application in the browser.
