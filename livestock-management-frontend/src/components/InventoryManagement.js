import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newInventory, setNewInventory] = useState({ location: '', count: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const handleAddInventory = async () => {
    try {
      await axios.post('http://localhost:8080/api/inventory', newInventory);
      fetchInventory();
      setShowModal(false);
      setNewInventory({ location: '', count: 0 });
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inventory Management</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Inventory</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.location}</td>
              <td>{item.count}</td>
              <td>
                <Button variant="info">Edit</Button>
                <Button variant="danger" className="ml-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Inventory Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={newInventory.location}
                onChange={(e) => setNewInventory({ ...newInventory, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="count">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count"
                value={newInventory.count}
                onChange={(e) => setNewInventory({ ...newInventory, count: parseInt(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddInventory}>Add Inventory</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InventoryManagement;
