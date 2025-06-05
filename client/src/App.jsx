import React, { useState } from 'react';
import Step1 from './components/Step1.jsx';
import Step2 from './components/Step2.jsx';
import Step3 from './components/Step3.jsx';
import SummaryPage from './components/pages/SummaryPage.js';
import { createUser } from './api/api.js';
import Step4 from './components/Step4.jsx';

const App = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    profilePhoto: null,
    username: "",
    email: '',
    currentPassword: '',
    newPassword: '',
    profession: '',
    companyName: '',
    addressLine1: '',
    country: '',
    state: '',
    city: '',
    subscriptionPlan: '',
    newsletter: true,
    dateOfBirth: '',
    gender: '',
    customGender: ''
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);


// const fileToBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//   });


// const handleFinalSubmit = async () => {
//   setIsSubmitting(true);
//   try {
//     const base64Photo = formData.profilePhoto
//       ? await fileToBase64(formData.profilePhoto)
//       : null;

//     const jsonPayload = {
//       ...formData,
//       password: formData.newPassword,
//       profilePhoto: base64Photo,
//     };

//     delete jsonPayload.newPassword;
//     delete jsonPayload.currentPassword;

//     const response = await createUser(jsonPayload); // sends JSON

//     if (response.status === 201) {
//       alert('User created successfully');
//     } else {
//       alert('Error: ' + response.data.message);
//     }
//   } catch (error) {
//     console.error('Submission error:', error);
//     alert('Something went wrong.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

const handleFinalSubmit = async () => {
  setIsSubmitting(true);

  try {
    const formPayload = new FormData();

    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        // Append profilePhoto as File, rest as strings
        if (key === 'profilePhoto' && formData[key] instanceof File) {
          formPayload.append(key, formData[key]);
        } else {
          formPayload.append(key, formData[key]);
        }
      }
    }

    // If you renamed newPassword to password on server:
    if (formData.newPassword) {
      formPayload.append('password', formData.newPassword);
    }

    const response = await createUser(formPayload); // This should now handle multipart/form-data

    if (response.status === 201) {
      alert('User created successfully');
    } else {
      alert('Error: ' + response.data.message);
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Something went wrong.');
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-300 p-4 shadow rounded">
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {step === 4 && (
        <Step4
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {step === 5 && (
        <SummaryPage
          formData={formData}
          setStep={setStep}
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Step Navigation */}
      <div className="flex justify-between mt-6 space-x-4">
        {step > 1 && step <= 4 && (
          <button onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">
            Previous
          </button>
        )}
        {step < 4 && (
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
        {step === 4 && (
          <button
            onClick={() => setStep(5)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Review
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
