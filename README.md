# 🚀 Getting Started
- Prerequisites
  - Node.js (v14 or higher)
  - NPM or Yarn
  - An AWS Account (for S3)
  - A Firebase Project (for Authentication)
  - A Resend Account (for sending emails)

- Installation & Setup
  - Clone the repository: git clone https://github.com/DevJangam48/DocVerify.git
  - cd DocVerify

- Backend Setup:
  - cd backend
  - npm install
  - Create a .env file in the /backend directory.
  - Add your serviceAccountKey.json to the /backend/config/ folder. You can generate this from your Firebase project: Go to Project Settings > Service accounts > Generate new private key.

- Copy the example below into your new backend/.env file and add your secret keys:

  - PORT=5000
    
  - AWS S3: Get these from your AWS IAM console
  - AWS_REGION=your_s3_bucket_region
  - AWS_ACCESS_KEY_ID=your_aws_access_key
  - AWS_SECRET_ACCESS_KEY=your_aws_secret_key
  - S3_BUCKET_NAME=your_s3_bucket_name

  - FIREBASE_PROJECT_ID=your_firebase_project_id
  - RESEND_API_KEY=your_resend_api_key


- Frontend Setup:
  - cd ../frontend
  - npm install
  - Create a .env file in the /frontend directory.
  - Copy your Firebase web app configuration into it. All keys must start with VITE_. Go to Project Settings > General > Your apps > Web app > SDK setup and config.

- frontend/.env.example
  Code snippet:
  - VITE_FIREBASE_API_KEY=your_firebase_api_key
  - VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  - VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
  - VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
  - VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  - VITE_FIREBASE_APP_ID=your_firebase_app_id

- Finally, update your src/assets/firebaseConfig.js to securely use these variables: src/assets/firebaseConfig.js

**`src/assets/firebaseConfig.js`**

    ```
    import { initializeApp } from "firebase/app";

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    export default app;
    ```
    
# Running the Application

- From the /backend directory
  - npm run dev

- From the /frontend directory (in a new terminal)
  - npm run dev

-The application will be available at http://localhost:5173.

- Other Small Enhancements
API Endpoints: For developers, it's very helpful to see a summary of the API. You could add a new section:

## 🔌 API Endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/students/` | Register a new student. |
| `GET` | `/api/students/:userID` | Get a student's profile. |
| `GET` | `/api/admins/students` | Get all students for an admin's college. |
| `GET` | `/api/admins/student/:studentId` | Get a specific student's details. |
| `POST` | `/api/documents/upload` | Upload a new document (student). |
| `GET` | `/api/documents/user` | Get all documents for the logged-in student. |
| `DELETE` | `/api/documents/:documentId` | Delete a document (student). |
| `PUT` | `/api/admins/documents/:documentId/status` | Approve or reject a document (admin). |
| `POST` | `/api/admins/student/:studentId/send-status-email` | Send a status email to a student. |
