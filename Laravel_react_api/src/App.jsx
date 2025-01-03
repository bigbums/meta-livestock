import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

// Page and Component Imports
import Layout from "./pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/show";
import Update from "./Pages/Posts/Update";
import CreateLivestock from "./pages/Livestock/CreateLivestock";
import ShowLivestock from "./Pages/Livestock/ShowLivestock";
import UpdateLivestock from "./Pages/Livestock/UpdateLivestock";
import LivestockGroupForm from "./Pages/Livestock/group/LiveStockGroupForm";
import LivestockGroupList from "./Pages/Livestock/group/LivestockGroupList";
import GroupCriteriaForm from "./Pages/Livestock/group/GroupCriteriaForm";
import GroupCriteriaList from "./Pages/Livestock/group/GroupCriteriaList";
import GroupCriteriaDetails from "./Pages/Livestock/group/GroupCriteriaDetails";
import CriteriaUpdate from "./Pages/Livestock/group/CriteriaUpdate";
import LivestockGroupDetails from "./Pages/Livestock/group/LivestockGroupDetails";
import LivestockGroupUpdate from "./Pages/Livestock/group/LivestockGroupUpdate";
import AddLivestockToGroup from "./Pages/Livestock/group/AddToLiveStock";

// NutritionalRequirement Module Imports
import NutritionalRequirementSpeciesForm from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementSpeciesForm";
import NutritionalRequirementSpeciesList from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementSpeciesList";
import NutritionalRequirementDetails from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementDetails";
import NutritionalRequirementSpecieUpdate from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementSpecieUpdate";

// Feeding Management Module Imports
import FeedsForm from "./Pages/Modules/FeedingManagement/FeedsForm";
import FeedTypeForm from "./Pages/Modules/FeedTypes/FeedTypeForm";
import FeedTypeFormList from "./Pages/Modules/FeedTypes/FeedTypeFormList";
import FeedTypeFormDetails from "./Pages/Modules/FeedTypes/FeedTypeFormDetails";
import FeedTypeFormUpdate from "./Pages/Modules/FeedTypes/FeedTypeFormUpdate";
import FeedScheduleForm from "./Pages/Modules/FeedingManagement/FeedScheduleForm";
import FeedScheduleList from "./Pages/Modules/FeedingManagement/FeedScheduleList";
import FeedScheduleDetails from "./Pages/Modules/FeedingManagement/FeedScheduleDetails";
import FeedScheduleUpdate from "./Pages/Modules/FeedingManagement/FeedScheduleUpdate";
import FeedDistributionForm from "./Pages/Modules/FeedingManagement/FeedDistribution";
import FeedDistributionList from "./Pages/Modules/FeedingManagement/FeedDistributionList";
import FeedDistributionDetails from "./Pages/Modules/FeedingManagement/FeedDistributionDetails";
import FeedDistributionUpdate from "./Pages/Modules/FeedingManagement/FeedDistributionUpdate";

// Breeding Management Module Imports
// import BreedingProgramForm from './components/BreedingManagement/BreedingProgramForm';
// import BreedingProgramList from './components/BreedingManagement/BreedingProgramList';

// import BreedingProgramWithAPI from './components/BreedingManagement/BreedingProgramWithAPI';

import CreateBreedingProgram from "./Components/BreedingManagement/CreateBreedingProgram";
import BreedingProgramList from "./Components/BreedingManagement/BreedingProgramList";
import EditBreedingProgram from "./Components/BreedingManagement/EditBreedingProgram";
import BreedingProgramForm from "./Components/BreedingManagement/BreedingProgramForm";
import BreedingProgramDetails from "./Components/BreedingManagement/BreedingProgramDetails";
import BreedingGroupForm from "./Components/BreedingManagement/BreedingGroupForm";
import Breeding from "./Components/BreedingManagement/Breeding";
import BreedingGroupManager from "./Components/BreedingManagement/BreedingGroupManager";
import BreedingGroupManagerList from "./Components/BreedingManagement/BreedingGroupManagerList";
import EditBreedingGroup from "./Components/BreedingManagement/EditBreedingGroup";
import BreedingGroupDetails from "./Components/BreedingManagement/BreedingGroupDetails";

// Estrus Cycle Imports
import CreateEstrusCycle from "./Components/BreedingManagement/EstrusCycle/CreateEstrusCycle";
import EstrusCycleList from "./Components/BreedingManagement/EstrusCycle/EstrusCycleList";
import EstrusCycleForm from "./Components/BreedingManagement/EstrusCycle/EstrusCycleForm";
import EstrusCycleDetails from "./Components/BreedingManagement/EstrusCycle/EstrusCycleDetails";
import EditEstrusCycle from "./Components/BreedingManagement/EstrusCycle/EditEstrusCycle";
// Pregnancy Record Imports
import CreatePregnancy from "./Components/BreedingManagement/PregnancyManagement/CreatePregnancy";
import PregnancyList from "./Components/BreedingManagement/PregnancyManagement/PregnancyList";
import PregnancyForm from "./Components/BreedingManagement/PregnancyManagement/PregnancyForm";
import PregnancyDetails from "./Components/BreedingManagement/PregnancyManagement/PregnancyDetails";
import EditPregnancy from "./Components/BreedingManagement/PregnancyManagement/EditPregnancy";


// Environment Management Module Imports
//import CreateEnvironmentMonitoring from "./Components/EnvironmentManagement/CreateEnvironmentMonitoring";



export default function App() {
  const { user } = useContext(AppContext);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/create" element={user ? <Create /> : <Login />} />
          
          {/* Livestock Routes */}
          <Route path="/createlivestock" element={user ? <CreateLivestock /> : <Login />} />
          <Route path="/showlivestock" element={user ? <ShowLivestock /> : <Login />} />
          <Route path="/updatelivestock" element={user ? <UpdateLivestock /> : <Login />} />
          
          {/* Livestock Group Routes */}
          <Route path="/livestockgroupform" element={user ? <LivestockGroupForm /> : <Login />} />    
          <Route path="/livestockgrouplist" element={user ? <LivestockGroupList /> : <Login />} />
          <Route path="/livestockgroupedit/:id/edit" element={user ? <LivestockGroupUpdate /> : <Login />} />
          <Route path="/livestockgroupdetails/:id" element={user ? <LivestockGroupDetails /> : <Login />} />
          <Route path="/addtolivestock" element={user ? <AddLivestockToGroup /> : <Login />} />
          
          {/* Group Criteria Routes */}
          <Route path="/criteriaform" element={user ? <GroupCriteriaForm /> : <Login />} />
          <Route path="/criterialist" element={user ? <GroupCriteriaList /> : <Login />} />
          <Route path="/criteriadetails/:id" element={user ? <GroupCriteriaDetails /> : <Login />} />
          <Route path="/criteriaedit/:id/edit" element={user ? <CriteriaUpdate /> : <Login />} />

          {/* Nutritional Requirement Routes */}
          <Route path="/modules/nutritional-requirement/form" element={user ? <NutritionalRequirementSpeciesForm /> : <Login />} />
          <Route path="/modules/nutritional-requirement/list" element={user ? <NutritionalRequirementSpeciesList /> : <Login />} />
          <Route path="/modules/nutritional-requirement/details/:id" element={user ? <NutritionalRequirementDetails /> : <Login />} />
          <Route path="/nutritional-requirement/:id/edit" element={<NutritionalRequirementSpecieUpdate />} />

          {/* Feeding Management Routes */}
          <Route path="/modules/feeding-management/feeds-form" element={user ? <FeedsForm /> : <Login />} />
          <Route path="/modules/feeding-management/feed-schedule-form" element={user ? <FeedScheduleForm /> : <Login />} />
          <Route path="/modules/feeding-management/feed-schedule-list" element={user ? <FeedScheduleList /> : <Login />} />
          <Route path="/modules/feeding-management/feed-schedule-details/:id" element={user ? <FeedScheduleDetails /> : <Login />} />
          <Route path="/modules/feeding-management/feed-schedule-update/:id/edit" element={user ? <FeedScheduleUpdate /> : <Login />} />
          <Route path="/modules/feeding-management/feed-distribution-form" element={user ? <FeedDistributionForm /> : <Login />} />
          <Route path="/modules/feeding-management/feed-distribution-list" element={user ? <FeedDistributionList /> : <Login />} />
          <Route path="/feedDistributionDetails/:id" element={user ? <FeedDistributionDetails /> : <Login />} />
          <Route path="/feedDistribution/:id/edit" element={user ? <FeedDistributionUpdate /> : <Login />} />

          {/* Feed Type Routes */}
          <Route path="/feedTypeForm" element={user ? <FeedTypeForm /> : <Login />} />
          <Route path="/modules/feed-types/feed-type-form-list" element={user ? <FeedTypeFormList /> : <Login />} />
          <Route path="/modules/feed-types/feed-type-form-details/:id" element={user ? <FeedTypeFormDetails /> : <Login />} />
          <Route path="/modules/feed-types/:id/edit" element={user ? <FeedTypeFormUpdate /> : <Login />} />

          {/* Breeding Program Routes */}
          {/* <Route path="/breeding-program-list" element={user ? <BreedingProgramList /> : <Login />} />
          <Route path="/breeding-program-form" element={user ? <BreedingProgramForm /> : <Login />} /> */}
          {/* <Route path="/breeding-programs" element={user ? <BreedingProgramWithAPI /> : <Login />} /> */}


          <Route path="/breeding-group-manager" element={user ? <BreedingGroupManager /> : <Login />} />
          <Route path="/breeding" element={user ? <Breeding /> : <Login />} />
          <Route path="/breeding-programs" element={user ? <CreateBreedingProgram /> : <Login />} />
          <Route path="/breeding-programs-list" element={user ? <BreedingProgramList /> : <Login />} />
          <Route path="/breeding-programs/:id/edit" element={user ? <EditBreedingProgram /> : <Login />} />
          <Route path="/breeding-programs-form" element={user ? <BreedingProgramForm /> : <Login />} />
          <Route path="/breeding-details/:id" element={user ? <BreedingProgramDetails /> : <Login />} />
          <Route path="/breeding-group-form" element={user ? <BreedingGroupForm /> : <Login />} />
          <Route path="/breeding-group-list" element={user ? <BreedingGroupManagerList /> : <Login />} />
          <Route path="/breeding-group/:id/edit" element={user ? <EditBreedingGroup /> : <Login />} />
          <Route path="/breeding-group/:id" element={user ? <BreedingGroupDetails /> : <Login />} />

          <Route path="/estrus-cycles" element={user ? <CreateEstrusCycle /> : <Login />} />
          <Route path="/estrus-cycles-list" element={user ? <EstrusCycleList/> : <Login />} /> 
          <Route path="/estrus-cycles-form" element={user ? <EstrusCycleForm /> : <Login />} /> 
          <Route path="/estrus-cycles-details/:id" element={user ? <EstrusCycleDetails /> : <Login />} />
          <Route path="/estrus-cycles/:id/edit" element={user ? <EditEstrusCycle /> : <Login />} />

          <Route path="/pregnancy-records" element={user ? <CreatePregnancy /> : <Login />} />
          <Route path="/pregnancy-records-list" element={user ? <PregnancyList/> : <Login />} /> 
          <Route path="/pregnancy-records-form" element={user ? <PregnancyForm /> : <Login />} /> 
          <Route path="/pregnancy-records-details/:id" element={user ? <PregnancyDetails /> : <Login />} />
          <Route path="/pregnancy-records/:id/edit" element={user ? <EditPregnancy /> : <Login />} />


            {/* Environment Monitoring Routes */}
          {/* <Route path="/environment-monitoring" element={user ? <CreateEnvironmentMonitoring /> : <Login />} /> */}

          {/* Other Routes */}
          <Route path="/api/livestocks/detail/:id" element={<ShowLivestock />} />
          <Route path="/api/livestocks/update/:id" element={user ? <UpdateLivestock /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
