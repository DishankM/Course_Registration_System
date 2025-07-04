import { useState } from 'react';
import axios from 'axios';

export default function RegistrationForm({ courseId, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'credit_card',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/courses/${courseId}/register`, formData);
      setResult(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong!";
      setResult({ success: false, message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result?.success) {
    return (
      <div className="bg-green-100 text-green-800 p-6 rounded-md shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-2">{result.message}</h3>
        <p>Registration ID: <strong>{result.registrationId}</strong></p>
        <p>Date: {new Date(result.registrationDate).toLocaleString()}</p>
        <p>Email confirmation sent to <strong>{formData.email}</strong></p>
        <button onClick={onCancel} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded">
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register for this course</h2>

      {result && !result.success && (
        <div className="text-red-600 mb-4">{result.message}</div>
      )}

      <div className="mb-4">
        <label className="block font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Payment Method</label>
        <select
          name="paymentMethod"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Submit"}
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
