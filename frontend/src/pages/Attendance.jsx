import { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import Modal from "../components/Modal";
import AttendanceForm from "../components/AttendanceForm";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Fetch attendance records
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/attendance/");
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch attendance failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAttendance();
    API.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  // Filter logic (employee + date)
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchEmployee =
        !filterEmployee || String(r.employee) === String(filterEmployee);

      const matchDate =
        !filterDate || r.date === filterDate;

      return matchEmployee && matchDate;
    });
  }, [records, filterEmployee, filterDate]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-sm text-gray-500">
            Track daily employee attendance
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Mark Attendance
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Employee Filter */}
        <select
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        >
          <option value="">All Employees</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded px-3 py-2"
        />

        {/* Clear Filters */}
        {(filterEmployee || filterDate) && (
          <button
            onClick={() => {
              setFilterEmployee("");
              setFilterDate("");
            }}
            className="text-sm text-gray-600 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {loading && (
          <div className="p-6 text-gray-500">
            Loading attendance records…
          </div>
        )}

        {!loading && filteredRecords.length === 0 && (
          <div className="p-6 text-gray-500">
            No attendance records found.
          </div>
        )}

        {!loading && filteredRecords.length > 0 && (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-600">
                <th className="p-4">Employee</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((r) => (
                <tr
                  key={r.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {r.employee_name}
                  </td>
                  <td className="p-4">{r.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        r.status === "PRESENT"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title="Mark Attendance"
          onClose={() => setShowModal(false)}
        >
          <AttendanceForm
            onSuccess={fetchAttendance}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
