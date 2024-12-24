// src/Components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="w-1/4 bg-gray-100 p-4">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="text-blue-600">Livestock List</Link>
        </li>
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
          <Link to="/modules/feeding-management/feed-schedule-list" className="text-blue-600">
            Feeding Schedules Management
          </Link>
        </li>
        <li>
          <Link to="/modules/feed-types/feed-type-form-list" className="text-blue-600">
            Feed Types
          </Link>
        </li>
        <li>
          <Link to="/modules/feeding-management/feed-distribution-list" className="text-blue-600">
            Feed Distribution
          </Link>
        </li>

        <li>
          <Link to="/breeding" className="text-blue-600">
            Breeding Management
          </Link>        
        </li>

        <li>
          <Link to="/livestockgrouplist" className="text-blue-600">
            Livestock Group
          </Link>
        </li>
        <li>
          <Link to="/environment" className="text-blue-600">
            Environment Monitoring & Management
          </Link>
        </li>

        <li>
          <Link to="/modules/feedingmanagement/feedingmanagementlist" className="text-blue-600">
           Feeding Management
          </Link>
        </li>
        <li>
          <Link to="/modules/locationbehaviour/locationbehaviourlist" className="text-blue-600">
           Location & Behaviour Management
          </Link>
        </li>
        <li>
          <Link to="/modules/housing/housingmanagementlist" className="text-blue-600">
           Housing Management
          </Link>
        </li>
        <li>
          <Link to="/modules/productionmanagement/productionyieldlist" className="text-blue-600">
           Production Yield Management
          </Link>
        </li>
      </ul>
    </nav>
  );
}