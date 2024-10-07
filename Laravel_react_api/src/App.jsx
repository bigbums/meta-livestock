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

// NutritionalRequirement Module Imports
import NutritionalRequirementSpeciesForm from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementSpeciesForm";
import NutritionalRequirementSpeciesList from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementSpeciesList";
import NutritionalRequirementDetails from "./Pages/Modules/NutritionalRequirement/NutritionalRequirementDetails";



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


