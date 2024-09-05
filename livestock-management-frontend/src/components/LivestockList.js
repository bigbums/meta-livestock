import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LivestockList() {
  const [livestock, setLivestock] = useState([]);

  useEffect(() => {
    fetchLivestock();
  }, []);

  const fetchLivestock = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/livestock');
      setLivestock(response.data);
    } catch (error) {
      console.error('Error fetching livestock data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Livestock Enumeration</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Date of Birth</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {livestock.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.type}</td>
              <td>{animal.breed}</td>
              <td>{animal.date_of_birth}</td>
              <td>{animal.location}</td>
              <td>
                <Link to={`/livestock/${animal.id}`}>
                  <Button variant="info">View Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LivestockList;
