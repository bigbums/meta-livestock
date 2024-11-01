import { BrowserRouter, Routes, Route } from "react-router-dom";


import Layout from "./pages/Layout";
import Home from "./Pages/Home";
import "./App.css";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/show";
import Update from "./Pages/Posts/Update";
import CreateLivestock from "./pages/Livestock/CreateLivestock";
import ShowLivestock from "./Pages/Livestock/ShowLivestock";
import UpdateLivestock from "./Pages/Livestock/UpdateLivestock";
import LivestockGroupForm from "./Pages/Livestock/group/LiveStockGroupForm";
import LivestockGroupList from "./Pages/Livestock/group/LivestockGroupList"
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
import NutritionalRequirementSpecieUpdate from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementSpecieUpdate"

// Feeding Management Module Imports
import FeedsForm from "./Pages/Modules/FeedingManagement/FeedsForm"; 
import FeedTypeForm from "./Pages/Modules/FeedTypes/FeedTypeForm";
import FeedTypeFormList from "./Pages/Modules/FeedTypes/FeedTypeFormList";
import FeedTypeFormDetails from "./Pages/Modules/FeedTypes/FeedTypeFormDetails";
import FeedTypeFormUpdate from "./Pages/Modules/FeedingManagement/FeedTypeFormUpdate";


import FeedScheduleForm from "./Pages/Modules/FeedingManagement/FeedScheduleForm";
import FeedScheduleList from "./Pages/Modules/FeedingManagement/FeedScheduleList";
import FeedScheduleDetails from "./Pages/Modules/FeedingManagement/FeedScheduleDetails";
import FeedScheduleUpdate from "./Pages/Modules/FeedingManagement/FeedScheduleUpdate";


import FeedDistributionForm from "./Pages/Modules/FeedingManagement/FeedDistribution";
import FeedDistributionList from "./Pages/Modules/FeedingManagement/FeedDistributionList";
import FeedDistributionDetails from "./Pages/Modules/FeedingManagement/FeedDistributionDetails";
import FeedDistributionUpdate from "./Pages/Modules/FeedingManagement/FeedDistributionUpdate";

export default function App() {
  const { user } = useContext(AppContext);
  
  return (
  <BrowserRouter>
  
  <Routes>
    <Route path="/" element={<Layout/>}>

    <Route index element={<Home />} />

    <Route path="/register" element={user ? <Home/>:<Register />} />
    <Route path="/login" element={user ? <Home/>:<Login />} />x
    <Route path="/create" element={user ? <Create/>:<Login />} />
    <Route path="/createlivestock" element={user ? <CreateLivestock/>:<Login />} />
    <Route path="/showlivestock" element={user ? <ShowLivestock/>:<Login />} />
    <Route path="/updatelivestock" element={user ? <UpdateLivestock/>:<Login />} />
    <Route path="/livestockgroupform" element={user ? <LivestockGroupForm /> : <Login />} />    
    <Route path="/livestockgrouplist" element={user ? <LivestockGroupList /> : <Login />} />
    <Route path="/livestockgroupedit/:id/edit" element={user ? <LivestockGroupUpdate /> : <Login />} />
    <Route path="/livestockgroupdetails/:id" element={user ? <LivestockGroupDetails /> : <Login />} />
    <Route path="/addtolivestock" element={user ? <AddLivestockToGroup /> : <Login />} />
    


    <Route path="/criteriaform" element={user ? <GroupCriteriaForm /> : <Login />} />
    <Route path="/criterialist" element={user ? <GroupCriteriaList /> : <Login />} />
    <Route path="/criteriadetails/:id" element={user ? <GroupCriteriaDetails /> : <Login />} />
    <Route path="/criteriaedit/:id/edit" element={user ? <CriteriaUpdate /> : <Login />} />


     {/* NutritionalRequirement Module Routes */}
     <Route
            path="/modules/nutritional-requirement/form"
            element={user ? <NutritionalRequirementSpeciesForm /> : <Login />}
          />
          <Route
            path="/modules/nutritional-requirement/list"
            element={user ? <NutritionalRequirementSpeciesList /> : <Login />}
          />
          <Route
            path="/modules/nutritional-requirement/details/:id"
            element={user ? <NutritionalRequirementDetails /> : <Login />}
          />
          <Route path="/nutritional-requirement/:id/edit" element={<NutritionalRequirementSpecieUpdate />} />
          <Route path="/modules/FeedingManagement/feedscheduleform" element={user ? <FeedScheduleForm/>:<Login />} />
          <Route path="/modules/FeedingManagement/feedschedulelist" element={user ? <FeedScheduleList/>:<Login />} />
          <Route path="/feedscheduleDetails/:id" element={user ? <FeedScheduleDetails/>:<Login />} />
          <Route path="/feedScheduleUpdate/:id/edit" element={user ? <FeedScheduleUpdate /> : <Login />} />


         <Route
            path="/feedDistributionForm"
            element={user ? <FeedDistributionForm /> : <Login />}
          />

        <Route
            path="/feedDistributionlist"
            element={user ? <FeedDistributionList /> : <Login />}
          />
<Route path="/feedDistributionDetails/:id" element={user ? <FeedDistributionDetails /> : <Login />} />
<Route path="/feedDistribution/:id/edit" element={user ? <FeedDistributionUpdate /> : <Login />} />





          <Route
            path="/modules/FeedingManagement/FeedsForm"
            element={user ? <FeedsForm /> : <Login />}
          />

          <Route
            path="/modules/FeedTypes/FeedTypeForm"
            element={user ? <FeedTypeForm /> : <Login />}
          />

<Route
            path="/modules/FeedTypes/FeedTypeFormList"
            element={user ? <FeedTypeFormList /> : <Login />}
          />
<Route
            path="/modules/FeedTypes/FeedTypeFormDetails/:id"
            element={user ? <FeedTypeFormDetails /> : <Login />}
          />

<Route path="/feed-types/:id/edit" element={user ?  <FeedTypeFormUpdate /> : <Login/>} />


    {/* <Route path="/posts/:id" element={<Show />} />

    <Route path="/posts/update/:id" element={user ? <Update/> */}

    <Route path="/api/livestocks/detail/:id" element={<ShowLivestock />} />

    <Route path="/api/livestocks/update/:id" element={user ? <UpdateLivestock/>
    :<Login />} />


    </Route>



  


    </Routes>

   
    
    
    </BrowserRouter>
    
  );
  
 
}


