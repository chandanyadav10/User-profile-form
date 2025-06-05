import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG are allowed'), false);
  }
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// import express from 'express';
// import { upload } from './path-to-your-multer-config-file.js';

// const app = express();

// app.post('/api/v1/create-user', upload.single('profilePhoto'), (req, res) => {
//   try {
//     console.log('Form fields:', req.body);    // Your text fields here
//     console.log('Uploaded file info:', req.file); // Your file info here

//     // Access your form data like this:
//     const {
//       username,
//       profession,
//       subscriptionPlan,
//       country,
//       // ... other fields
//     } = req.body;

//     // You can access the saved file path via req.file.path

//     // Your user creation logic here...

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
