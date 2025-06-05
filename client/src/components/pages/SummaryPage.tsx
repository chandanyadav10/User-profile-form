import React, { useEffect, useState } from 'react';

const SummaryPage = ({ formData, setStep, onSubmit }) => {
  const {
    profilePhoto,
    username,
    email,
    currentPassword,
    newPassword,
    profession,
    companyName,
    addressLine1,
    country,
    state,
    city,
    subscriptionPlan,
    newsletter,
    gender,
    customGender,
  } = formData;

  console.log(formData);

  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (profilePhoto instanceof File) {
      const url = URL.createObjectURL(profilePhoto);
      setPhotoURL(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoURL(profilePhoto);
    }
  }, [profilePhoto]);

  const maskedPassword = newPassword ? '*'.repeat(newPassword.length) : 'Not updated';

  return (
    <div className="p-6 w-[700px] mx-auto bg-white shadow-lg rounded-xl space-y-6">
      <h2 className="text-2xl font-bold">Summary</h2>

      {/* Personal Info */}
      <section className="border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Personal Info</h3>
          <button onClick={() => setStep(1)} className="text-blue-600 underline">Edit</button>
        </div>
        <div className="mt-2 space-y-2">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full border"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              No Photo
            </div>
          )}
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> { email}</p>
          <p><strong>Gender:</strong> {gender === 'Other' ? customGender : gender}</p>
        </div>
      </section>

      {/* Professional Details */}
      <section className="border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Professional Details</h3>
          <button onClick={() => setStep(2)} className="text-blue-600 underline">Edit</button>
        </div>
        <div className="mt-2 space-y-2">
          <p><strong>Profession:</strong> {profession}</p>
          {profession === 'Entrepreneur' && (
            <p><strong>Company Name:</strong> {companyName}</p>
          )}
          <p><strong>Address Line 1:</strong> {addressLine1}</p>
        </div>
      </section>

      {/* Preferences 1 */}
      <section className="border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Preferences 1</h3>
          <button onClick={() => setStep(3)} className="text-blue-600 underline">Edit</button>
        </div>
        <div className="mt-2 space-y-2">
          <p><strong>Country:</strong> {country}</p>
          <p><strong>State:</strong> {state}</p>
          <p><strong>City:</strong> {city}</p>
        </div>
      </section>

      {/* Preferences 2 */}
      <section className="border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Preferences 2</h3>
          <button onClick={() => setStep(4)} className="text-blue-600 underline">Edit</button>
        </div>
        <div className="mt-2 space-y-2">
          <p><strong>Subscription Plan:</strong> {subscriptionPlan}</p>
          <p><strong>Newsletter Subscription:</strong> {newsletter ? 'Yes' : 'No'}</p>
        </div>
      </section>

      <div className="flex justify-end mt-6">
        <button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
