import { useEffect, useMemo, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [empRes, attRes] = await Promise.all([
          API.get("/employees/"),
          API.get("/attendance/"),
        ]);
        setEmployees(empRes.data);
        setAttendance(attRes.data);
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Today date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // Total present today
  const presentToday = useMemo(() => {
    return attendance.filter(
      (a) => a.date === today && a.status === "PRESENT"
    ).length;
  }, [attendance, today]);

  // Present days per employee
  const presentCountByEmployee = useMemo(() => {
    const map = {};

    attendance.forEach((a) => {
      if (a.status === "PRESENT") {
        map[a.employee] = (map[a.employee] || 0) + 1;
      }
    });

    return employees.map((e) => ({
      id: e.id,
      employee_id: e.employee_id,
      name: e.full_name,
      presentDays: map[e.id] || 0,
    }));
  }, [attendance, employees]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-500">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          HR overview and attendance summary
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border shadow p-5">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-2xl font-semibold mt-1">
            {employees.length}
          </p>
        </div>

        <div className="bg-white rounded-lg border shadow p-5">
          <p className="text-sm text-gray-500">Total Attendance Records</p>
          <p className="text-2xl font-semibold mt-1">
            {attendance.length}
          </p>
        </div>

        <div className="bg-white rounded-lg border shadow p-5">
          <p className="text-sm text-gray-500">Present Today</p>
          <p className="text-2xl font-semibold mt-1">
            {presentToday}
          </p>
        </div>
      </div>

      {/* Present Days Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">
            Total Present Days per Employee
          </h2>
        </div>

        {presentCountByEmployee.length === 0 ? (
          <div className="p-4 text-gray-500">
            No attendance data available.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b text-left text-gray-600">
              <tr>
                <th className="p-4">Employee ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Present Days</th>
              </tr>
            </thead>
            <tbody>
              {presentCountByEmployee.map((e) => (
                <tr
                  key={e.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-4 font-mono text-xs">
                    {e.employee_id}
                  </td>
                  <td className="p-4">{e.name}</td>
                  <td className="p-4 font-medium">
                    {e.presentDays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
