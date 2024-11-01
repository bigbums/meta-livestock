
import { useEffect, useState } from 'react';

const AddLivestockToGroupForm = () => {
  const [species, setSpecies] = useState([]);
  const [group, setGroup] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [livestockSubset, setLivestockSubset] = useState([]);
  const [selectedLivestock, setSelectedLivestock] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(''); // New state for selected group

  useEffect(() => {
    // Fetch species from API
    fetch('/api/species')
      .then((response) => response.json())
      .then((data) => {
        setSpecies(data);
      })
      .catch((error) => {
        console.error('There was an error fetching the species!', error);
      });
  }, []);

  useEffect(() => {
    // Fetch groups from API
    fetch('/api/livestock-groups')
      .then((response) => response.json())
      .then((data) => {
        setGroup(data);
      })
      .catch((error) => {
        console.error('There was an error fetching the Group!', error);
      });
  }, []);

  // Fetch livestock when species is selected
  useEffect(() => {
    if (selectedSpecies) {
      fetch(`/api/livestock?species_id=${selectedSpecies}`)
        .then((response) => response.json())
        .then((data) => {
          setLivestockSubset(data);
        })
        .catch((error) => {
          console.error('There was an error fetching the livestock!', error);
        });
    }
  }, [selectedSpecies]);

  const handleSelectChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedLivestock(selectedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/livestock-groups/add-livestock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        livestock_id: selectedLivestock, // Ensure this is an array if multiple selected
        livestock_group_id: selectedGroup, // This should be included
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-md">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Species:</label>
        <select
          value={selectedSpecies}
          onChange={(e) => setSelectedSpecies(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a species</option>
          {species.map((sp) => (
            <option key={sp.id} value={sp.id}>
              {sp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Group:</label>
        <select
          name="groupId"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a group</option>
          {group.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Livestock:</label>
        <select
          value={selectedLivestock}
          disabled={!selectedSpecies}
          multiple
          onChange={handleSelectChange}
          className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select livestock</option>
          {livestockSubset.map((lv) => (
            <option key={lv.id} value={lv.id}>
              {lv.name} - {lv.tag_id}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add Livestock to Group
      </button>
    </form>
  );
};

export default AddLivestockToGroupForm;
