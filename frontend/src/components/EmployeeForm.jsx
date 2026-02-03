/* eslint-disable no-unused-vars */
import { useState } from "react";
import API from "../api/api";

export default function EmployeeForm({ onSuccess, onClose }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/employees/", form);
      onSuccess();
      onClose();
    } catch (err) {
      setError("Employee ID or Email already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        name="employee_id"
        placeholder="Employee ID"
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        required
      />
      <input
        name="full_name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        required
      />
      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        required
      />

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
