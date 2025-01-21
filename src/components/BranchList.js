import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddBranchForm from './AddBranchForm'; // Adjust the path as needed

const BranchList = () => {
  const [branch, setBranch] = useState(null);
  const [error, setError] = useState('');
  const [expandedBranches, setExpandedBranches] = useState({});
  const [selectedBranch, setSelectedBranch] = useState(null);

  const fetchBranch = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/branch/get_branch_hierarchy?branchId=1');
      if (response.data && response.data.data) {
        setBranch(response.data.data);
      } else {
        console.error('Unexpected response structure:', response.data);
        setError('Failed to fetch branches.');
      }
    } catch (error) {
      console.error('Error fetching branch data:', error.response ? error.response.data : error.message);
      setError(`Failed to fetch branches: ${error.response ? error.response.data.message : error.message}`);
    }
  }, []);

  useEffect(() => {
    fetchBranch();
  }, [fetchBranch]);

  const toggleBranch = (branchId) => {
    setExpandedBranches(prevState => ({
      ...prevState,
      [branchId]: !prevState[branchId],
    }));
  };

  const handleBranchSelect = (branchId) => {
    setSelectedBranch(branchId);
  };

  const handleBranchAdded = () => {
    fetchBranch();
  };

  const renderBranch = (branch) => (
    <li key={branch.branchMasterPk}>
      <div onClick={() => toggleBranch(branch.branchMasterPk)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <input
          type="radio"
          name="branch"
          checked={selectedBranch === branch.branchMasterPk}
          onChange={() => handleBranchSelect(branch.branchMasterPk)}
          style={{ marginRight: '8px' }}
        />
        <span>{branch.branchName} ({branch.branchType})</span>
      </div>
      {expandedBranches[branch.branchMasterPk] && branch.children.length > 0 && (
        <ul>
          {branch.children.map((child) => renderBranch(child))}
        </ul>
      )}
    </li>
  );

  return (
    <div>
      <h2>Browse Organization</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {branch ? (
        <ul>
          {renderBranch(branch)}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <AddBranchForm parentId={selectedBranch} onBranchAdded={handleBranchAdded} />
    </div>
  );
};

export default BranchList;
