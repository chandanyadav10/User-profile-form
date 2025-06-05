

const Step2 = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset companyName if profession changes
    if (name === 'profession' && value !== 'Entrepreneur') {
      setFormData((prev) => ({ ...prev, profession: value, companyName: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear the error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="space-y-4 flex flex-col justify-center items-center w-screen h-screen  bg-gray-300    ">
      <div className='flex flex-col justify-center items-center  px-8 pb-8 pt-6 rounded-lg bg-gray-200'>
         <h1 className="flex justify-center items-center text-2xl text-blue-500 font-bold  ">Professional details</h1>

      <div className="w-[500px] h-[400px] bg-gray-50 border-1 border-gray-400  mt-2 rounded-sm">
       
      {/* Profession */}
      <div className="flex flex-col  mb-4 mt-6  mx-4">
        <label htmlFor="profession" className="block font-medium">Profession</label>
        <select
          name="profession"
          id="profession"
          value={formData.profession}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2 "
          required
        >
          <option value="">Select Profession</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
      </div>

      {/* Company Name (only if Entrepreneur) */}
      {formData.profession === 'Entrepreneur' && (<>
        <div className="flex flex-col  mb-4 mt-10  mx-4">
          <label htmlFor="companyName" className="block font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            placeholder="Enter your company name"
            required
          />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
        </div>
        <div className="flex flex-col  mb-4 mt-10  mx-4">
          <label htmlFor="addressLine1" className="block font-medium">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            id="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            placeholder="Enter your address"
            required
            />
        </div>
      </>)}

      </div>
      </div>
    </div>
  );
};

export default Step2;
