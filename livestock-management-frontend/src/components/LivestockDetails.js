import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

function LivestockDetails() {
  const { id } = useParams();
  const [livestock, setLivestock] = useState(null);

  useEffect(() => {
    fetchLivestockDetails();
  }, []);

  const fetchLivestockDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/livestock/${id}`);
      setLivestock(response.data);
    } catch (error) {
      console.error('Error fetching livestock details:', error);
    }
  };

  if (!livestock) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>Livestock Details</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>ID:</strong> {livestock.id}</ListGroup.Item>
          <ListGroup.Item><strong>Type:</strong> {livestock.type}</ListGroup.Item>
          <ListGroup.Item><strong>Breed:</strong> {livestock.breed}</ListGroup.Item>
          <ListGroup.Item><strong>Date of Birth:</strong> {livestock.date_of_birth}</ListGroup.Item>
          <ListGroup.Item><strong>Location:</strong> {livestock.location}</ListGroup.Item>
          <ListGroup.Item><strong>RFID Tag:</strong> {livestock.rfid_tag}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="primary">Edit</Button>
          <Button variant="danger" className="ml-2">Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LivestockDetails;
