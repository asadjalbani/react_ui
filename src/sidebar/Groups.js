import React, { useState, useEffect } from 'react';
import AddGroup from '../AddGroup';
import AddTokenToGroup from '../AddTokenToGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    fetch('http://3.70.194.53:8000/get_groups')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGroups(data.groups);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
        setFetchError(error.message);
      });
  };

  const deleteGroup = (groupName) => {
    // Construct the request URL with the group_name query parameter
    const url = new URL('http://3.70.194.53:8000/remove_group');
    url.searchParams.append('group_name', groupName);
  
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {t
        throw new Error('Failed to delete the group');
      }
      return response.json();
    })
    .then(() => {
      fetchGroups();
    })
    .catch(error => {
      console.error('Error deleting group:', error);
    });
  };  

  if (fetchError) {
    return <div>Error loading groups: {fetchError}</div>;
  }

  return (
    <div>
      <h2>Groups Page</h2>
      <AddGroup />
      <AddTokenToGroup />
      <h3>Group List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>S/N</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Group Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>{index + 1}</td>
              <td style={{ padding: '8px' }}>{group}</td>
              <td style={{ padding: '8px' }}>
                <IconButton onClick={() => deleteGroup(group)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Groups;
