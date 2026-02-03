/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import API from "../api/api";

export default function AttendanceForm({ onClose, onSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "PRESENT",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/attendance/", form);
      onSuccess();
      onClose();
    } catch (err) {
      setError("Attendance already marked for this employee on this date");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <select
        name="employee"
        value={form.employee}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        required
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.full_name} ({e.employee_id})
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="PRESENT">Present</option>
        <option value="ABSENT">Absent</option>
      </select>

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
          {loading ? "Saving..." : "Mark Attendance"}
        </button>
      </div>
    </form>
  );
}
