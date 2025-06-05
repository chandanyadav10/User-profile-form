const Step4 = ({ formData, setFormData, errors, setErrors }) => {

    console.log(formData, "step 4");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="space-y-4 flex flex-col justify-center items-center w-screen h-screen bg-gray-300">
      <div className='flex flex-col justify-center items-center px-8 pb-8 pt-6 rounded-lg bg-gray-200'>
        <h1 className="text-2xl text-blue-500 font-bold">Preferences</h1>

        <div className="w-[500px] bg-gray-50 border border-gray-400 mt-2 rounded-sm p-6 space-y-6">
          
          {/* Subscription Plan - Radio Buttons */}
          <div className="flex flex-col">
            <label className="block font-medium mb-2">Subscription Plan</label>
            {["Basic", "Pro", "Enterprise"].map((option) => (
              <label key={option} className="inline-flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  name="subscriptionPlan"
                  value={option}
                  checked={formData.subscriptionPlan === option}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
            {errors.subscriptionPlan && <p className="text-red-500 text-sm">{errors.subscriptionPlan}</p>}
          </div>

          {/* Newsletter - Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter ?? true}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="newsletter" className="text-sm font-medium">
              Subscribe to newsletter
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
