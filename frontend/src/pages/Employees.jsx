import { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Fetch employees failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    await API.delete(`/employees/${id}/`);
    fetchEmployees();
  };

  // Search filter (name, employee id, email)
  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const q = search.toLowerCase();
      return (
        e.full_name.toLowerCase().includes(q) ||
        e.employee_id.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    });
  }, [employees, search]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Employees</h1>
          <p className="text-sm text-gray-500">
            Manage your organization employees
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-md w-fit"
        >
          + Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, employee ID or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full md:w-96"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {loading && (
          <div className="p-6 text-gray-500">Loading employees…</div>
        )}

        {!loading && filteredEmployees.length === 0 && (
          <div className="p-6 text-gray-500">
            No employees found.
          </div>
        )}

        {!loading && filteredEmployees.length > 0 && (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-600">
                <th className="p-4">Employee ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Department</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((e) => (
                <tr
                  key={e.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-4 font-mono text-xs text-gray-700">
                    {e.employee_id}
                  </td>
                  <td className="p-4 font-medium">{e.full_name}</td>
                  <td className="p-4 text-gray-700">{e.email}</td>
                  <td className="p-4">{e.department}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteEmployee(e.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <Modal title="Add Employee" onClose={() => setShowModal(false)}>
          <EmployeeForm
            onSuccess={fetchEmployees}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
