import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BranchDetails = () => {
  const { branchId, subBranchId } = useParams();
  const [branch, setBranch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBranchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/branch/get_branch_hierarchy?branchId=${branchId}`);
        if (response.data && response.data.data) {
          const branchData = response.data.data;
          setBranch(branchData);
        } else {
          setError('Branch not found.');
        }
      } catch (error) {
        setError(`Failed to fetch branch details: ${error.message}`);
      }
    };

    fetchBranchDetails();
  }, [branchId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (branch) {
    const subBranch = subBranchId ? branch.children.find(sub => sub.branchMasterPk === parseInt(subBranchId)) : null;
    const displayBranch = subBranch || branch;
    
    return (
      <div>
        <h2>{displayBranch.branchName}</h2>
        <p><strong>Branch Type:</strong> {displayBranch.branchType || 'N/A'}</p>
        <p><strong>Branch Code:</strong> {displayBranch.branchCode || 'N/A'}</p>
        <p><strong>Created Date:</strong> {displayBranch.createdDate ? new Date(displayBranch.createdDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Last Updated:</strong> {displayBranch.lastUpdatedDate ? new Date(displayBranch.lastUpdatedDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Description:</strong> {displayBranch.branchDescription || 'No description available.'}</p>
      </div>
    );
  }

  return <p>Loading...</p>;
};

export default BranchDetails;
