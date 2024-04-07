import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SettingsIcon from '@mui/icons-material/Settings';
import SwipeRoutineModal from './SwipeRoutineModal';
import UpdateBioModal from './UpdateBioModal';
import AddAccountWithNumber from './AddAccountWithNumber'; // Adjust the import path as necessary
import UpgradeIcon from '@mui/icons-material/Upgrade'; // Import the UpgradeIcon from Material-UI icons
import Button from '@mui/material/Button';


function TokenDataTable() {
  const [tokens, setTokens] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [swipeModalOpen, setSwipeModalOpen] = useState(false);
  const [updateBioModalOpen, setUpdateBioModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);


  useEffect(() => {
    fetch('http://3.70.194.53:8000/get_auth_tokens')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTokens(data.tokens);
      })
      .catch(error => {
        console.error('Error fetching tokens:', error);
        setFetchError(error.message);
      });
  }, []);

  if (fetchError) {
    return <div>Error loading tokens: {fetchError}</div>;
  }

  const handleOpenSwipeModal = () => {
    setSwipeModalOpen(true);
  };

  const handleCloseSwipeModal = () => {
    setSwipeModalOpen(false);
  };

  const handleSwipeRoutineSubmit = () => {
    setIsRunning(true);
    console.log('Swipe routine submitted');
  };

  const handleStopRoutine = () => {
    setIsRunning(false);
    console.log('Swipe routine stopped');
  };

  const handleOpenUpdateBioModal = () => {
    setUpdateBioModalOpen(true);
  };

  const handleCloseUpdateBioModal = () => {
    setUpdateBioModalOpen(false);
  };

  const handleUpdateBioSubmit = () => {
    console.log('Bio updated');
  };

  const handleOpenAddAccountModal = () => {
    setAddAccountModalOpen(true);
  };

  const handleCloseAddAccountModal = () => {
    setAddAccountModalOpen(false);
  };
  const handleUpgradeModal = () => {
    console.log("Upgraded")
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Upgrade</TableCell>
              <TableCell>Account #</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell>Proxy</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.length > 0 ? (
              tokens.map((token, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{"No Group"}</TableCell>
                  <TableCell><Button
                    variant="contained"
                    color="secondary"
                    startIcon={<UpgradeIcon />}
                    onClick={handleOpenAddAccountModal}
                  ></Button></TableCell>
                  <TableCell>{token[0]}</TableCell>
                  <TableCell>Bio Here</TableCell>
                  <TableCell>{token[1] ? token[1] : ""}{token[2] ? token[2] : ""}</TableCell>
                  <TableCell>
                    <span style={{ color: isRunning ? 'green' : 'red' }}>
                      <FiberManualRecordIcon /> {isRunning ? 'Running' : 'Off'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <IconButton><ShoppingCartIcon /></IconButton>
                    <IconButton><SettingsIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No tokens available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
        {isRunning ? (
          <IconButton onClick={handleStopRoutine} style={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '16px', padding: '10px', margin: '5px' }} aria-label="stop">
            Stop <StopCircleIcon style={{ marginLeft: '5px' }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleSwipeRoutineSubmit} style={{ backgroundColor: '#3f51b5', color: '#fff', fontSize: '16px', padding: '10px', margin: '5px' }} aria-label="play">
            Play <PlayCircleIcon style={{ marginLeft: '5px' }} />
          </IconButton>
        )}
      </div>

      <SwipeRoutineModal
        open={swipeModalOpen}
        onClose={handleCloseSwipeModal}
        onSubmit={handleSwipeRoutineSubmit}
      />

      <UpdateBioModal
        open={updateBioModalOpen}
        onClose={handleCloseUpdateBioModal}
        onSubmit={handleUpdateBioSubmit}
      />
      <AddAccountWithNumber 
      open={addAccountModalOpen}
      onClose={handleCloseAddAccountModal}
      onSubmit={handleUpgradeModal}
      />
    </div>
  );
}

export default TokenDataTable;
