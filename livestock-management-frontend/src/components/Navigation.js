import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// import React from 'react';
// import { Nav, Navbar, Container } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';


function LivestockDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  // Memoize fetchLivestockDetails function
  const fetchLivestockDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/livestocks/${id}`);
      console.log(response)
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Failed to fetch livestock details:', error);
    }
  }, [id]); //  Dependency array: fetchLivestockDetails depends on id

  useEffect(() => {
    fetchLivestockDetails(); // Call the fetch function
  }, [fetchLivestockDetails]); // Dependency array: useEffect depends on fetchLivestockDetailsarray

  return (
    <div>
      <h1>Livestock Details</h1>
      {details ? (
        <div>
          {/* Render livestock details */}
          <p>{details.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LivestockDetails;


