import React, { useState, useEffect } from 'react';
import { checkUsernameAvailability } from '../api/api';

const Step1 = ({ formData, setFormData }) => {
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [preview, setPreview] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');

  // 🔍 Check username availability
 useEffect(() => {
  const checkAvailability = async () => {
    if (formData.username && formData.username.length >= 4) {
      try {
        const res = await checkUsernameAvailability(formData.username);
        console.log(res);
        if (res.data) {
          setUsernameStatus(<span className="text-success text-green-600">Available✓</span>);
        }else{
          setUsernameStatus('Taken');
        }
        
      } catch (err) {
        setUsernameStatus('Taken');
      }
    }
  };

  const delayDebounce = setTimeout(() => {
    checkAvailability();
  }, 1000);

  return () => clearTimeout(delayDebounce);
}, [formData.username]);

  console.log(usernameStatus)

  // 🔐 Password strength logic
  useEffect(() => {
    const password = formData.newPassword || '';
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    if (password.length >= 8 && hasSpecial && hasNumber) {
      setPasswordStrength('Strong');
    } else if (password.length >= 6) {
      setPasswordStrength('Weak');
    } else {
      setPasswordStrength('');
    }
  }, [formData.newPassword]);

  // 📷 Profile picture preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type) && file.size <= 2 * 1024 * 1024) {
      setFormData({ ...formData, profilePhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Only JPG/PNG allowed & must be <= 2MB');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-300">
     <div className='flex flex-col justify-center items-center  px-8 pb-8 pt-6 rounded-lg bg-gray-200'>
       <h1 className=" flex justify-center items-center text-2xl text-blue-500 font-bold ">Personal info</h1>
      <div className='w-[500px] h-[720px] bg-gray-50 border-1 border-gray-400 mt-2 rounded-sm'>
          <div className="flex flex-col items-center justify-center mb-4 mt-4">
            <label htmlFor="profilePhoto" className="cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover  "
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Upload
                </div>
              )}
            </label>
            <input
              type="file"
              id="profilePhoto"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="mb-4 mx-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700" required>
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder='Enter Username'
              required={true}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 w-full p-2 rounded-sm border-1 "
            />
            {usernameStatus && <p>{usernameStatus}</p>}
          </div>
          <div className="mb-4 mx-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700" required>
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder='Enter email'
              required={true}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full p-2 rounded-sm border-1 "
            />
          </div>
          <div className="mb-4 mx-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mt-1 w-full p-2 rounded-sm border border-gray-300"
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {formData.gender === 'Other' && (
              <input
                type="text"
                name="customGender"
                value={formData.customGender}
                onChange={(e) => setFormData({ ...formData, customGender: e.target.value })}
                placeholder="Please specify your gender"
                className="mt-2 w-full p-2 border border-gray-300 rounded-sm"
                required
              />
            )}

           
          </div>
           {/* DOB */}

          <div className="mb-4 mx-4">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              max={new Date().toISOString().split("T")[0]} // disables future dates
              className="mt-1 w-full p-2 rounded-sm border-1"
            />
          </div>


          <div className="mb-4 mx-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="mt-1 w-full p-2 rounded border border-gray-300 focus:ring focus:ring-blue-300"
              placeholder="Enter your current password"
            />
          </div>

          <div className="mb-4 mx-4" >
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="mt-1 w-full p-2 rounded-sm border-1 "
                placeholder="Enter your new password"
              />
              {formData.newPassword && (
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        className={`h-full rounded transition-all ${
                          passwordStrength === 1 ? 'bg-red-500 w-1/4' :
                          passwordStrength === 2 ? 'bg-orange-400 w-2/4' :
                          passwordStrength === 3 ? 'bg-yellow-400 w-3/4' :
                          passwordStrength === 4 ? 'bg-green-500 w-full' :
                          'w-0'
                        }`}
                      ></div>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">
                      Strength: {['Very Weak', 'Weak', 'Fair', 'Strong'][passwordStrength - 1] || 'Too short'}
                    </p>
                  </div>
                )}

              {passwordStrength && <p>{passwordStrength}</p>}
          </div>
          
        
      </div>
      
     </div>
      
    </div>
      
  );
};

export default Step1;
