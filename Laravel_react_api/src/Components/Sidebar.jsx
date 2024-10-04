// src/Components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="w-1/4 bg-gray-100 p-4">
      <ul className="space-y-4">
        <li>
          <Link to="/modules/nutritional-requirement/list" className="text-blue-600">
            Nutritional Requirements
          </Link>
        </li>
        <li>
          <Link to="/modules/health-management/list" className="text-blue-600">
            Health Management
          </Link>
        </li>
        <li>
          <Link to="/modules/feeding-schedules/list" className="text-blue-600">
            Feeding Schedules
          </Link>
        </li>
        <li>
          <Link to="/modules/breeding-management/list" className="text-blue-600">
            Breeding Management
          </Link>
        </li>
      </ul>
    </nav>
  );
}
