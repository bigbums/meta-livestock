import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LivestockList from './components/LivestockList';
import LivestockDetails from './components/LivestockDetails';
import InventoryManagement from './components/InventoryManagement';
import Navigation from './components/Navigation';
import Pages from './components/Pages';
import Login from './components/Login'

function App() {
  return (
    <Router>
      <div>
        {/* <Navigation /> */}
        <Pages/>
        <Routes>
          <Route path="/" exact component={LivestockList} />
          <Route path="/livestock/:id" component={LivestockDetails} />
          <Route path="/inventory" component={InventoryManagement} />
          <Route path="/Login" component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
