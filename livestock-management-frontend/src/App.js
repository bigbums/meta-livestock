import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LivestockList from './components/LivestockList';
import LivestockDetails from './components/LivestockDetails';
import InventoryManagement from './components/InventoryManagement';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" exact component={LivestockList} />
          <Route path="/livestock/:id" component={LivestockDetails} />
          <Route path="/inventory" component={InventoryManagement} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
