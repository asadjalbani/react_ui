import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import AddAccountButton from './AddAccountButton';
import SwipeRoutineModal from './SwipeRoutineModal';
import UpdateBioModal from './UpdateBioModal';

function MainContent() {
  const [swipeModalOpen, setSwipeModalOpen] = useState(false);
  const [updateBioModalOpen, setUpdateBioModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleOpenSwipeModal = () => {
    setSwipeModalOpen(true);
  };

  const handleCloseSwipeModal = () => {
    setSwipeModalOpen(false);
  };

  const handleSwipeRoutineSubmit = () => {
    setIsRunning(true); // Update state to indicate running status
    // Handle submission logic here
    console.log('Swipe routine submitted');
  };

  const handleStopRoutine = () => {
    setIsRunning(false); // Update state to indicate stopped status
    // Handle stopping routine logic here
    console.log('Swipe routine stopped');
  };

  const handleOpenUpdateBioModal = () => {
    setUpdateBioModalOpen(true);
  };

  const handleCloseUpdateBioModal = () => {
    setUpdateBioModalOpen(false);
  };

  const handleUpdateBioSubmit = () => {
    // Handle submission logic here
    console.log('Bio updated');
  };

  return (
    <div style={{ marginLeft: '350px', padding: '20px', width: 'calc(100% - 250px)', position: 'fixed', top: '64px', bottom: '0', right: '0' }}>
      <Box display="flex" alignItems="center" mb={3}>
        <input type="text" placeholder="Search..." style={{ marginLeft: '10px', flex: 1, width: '80%' }} />
      </Box>
      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Upgrade</TableCell>
              <TableCell>Account #</TableCell>
              <TableCell>Proxy</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sample table rows */}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Group A</TableCell>
              <TableCell>Upgrade A</TableCell>
              <TableCell>Account #1</TableCell>
              <TableCell>Proxy #1</TableCell>
              <TableCell>
                {isRunning ? (
                  <span style={{ color: 'green' }}> <FiberManualRecordIcon/> Running</span>
                ) : (
                  <span style={{ color: 'red' }}> <FiberManualRecordIcon/> Off</span>
                )}
              </TableCell>
              <TableCell>
                <IconButton><ShoppingCartIcon/></IconButton>
                {isRunning ? (
                  <IconButton onClick={handleStopRoutine}><StopCircleIcon /></IconButton>
                ) : (
                  <IconButton onClick={handleOpenSwipeModal}><PlayCircleIcon /></IconButton>
                )}
                <IconButton onClick={handleOpenUpdateBioModal}><SettingsIcon /></IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add Account button */}
      <AddAccountButton />
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
    </div>
  );
}

export default MainContent;
