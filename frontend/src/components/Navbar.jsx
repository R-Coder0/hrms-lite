import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition 
     ${
       isActive
         ? "bg-white text-gray-900"
         : "text-gray-300 hover:bg-gray-800 hover:text-white"
     }`;

  return (
    <header className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          
          {/* Left: Logo / Title */}
          <div className="flex items-center gap-8">
            <span className="text-white font-semibold text-lg">
              HRMS Lite
            </span>

            {/* Nav Links */}
            <nav className="flex gap-2">
                            <NavLink to="/" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/employees" className={linkClass}>
                Employees
              </NavLink>

              <NavLink to="/attendance" className={linkClass}>
                Attendance
              </NavLink>


            </nav>
          </div>

          {/* Right: Admin label (future-proof) */}
          <div className="text-sm text-gray-400">
            Admin
          </div>
        </div>
      </div>
    </header>
  );
}
