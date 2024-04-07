import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function AddTokenToGroup() {
  const [open, setOpen] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [groupName, setGroupName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAuthToken(''); // Reset auth token
    setGroupName(''); // Reset group name
  };

  const handleAddTokenToGroup = async () => {
    try {
      const url = new URL('http://3.70.194.53:8000/add_token_to_group');
      url.searchParams.append('auth_token', authToken);
      url.searchParams.append('group_name', groupName);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Token added to group successfully:', { authToken, groupName });
        setOpen(false); // Close dialog on success
        // Here you can update the UI to reflect the successful addition
      } else {
        console.error('Failed to add token to group:', response.statusText);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error adding token to group:', error);
      // Handle network or unexpected errors
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" style={{ marginTop: '20px', width: '50%' }} onClick={handleClickOpen}>
        Add Token to Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Token To Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="auth-token"
            label="Auth Token"
            type="text"
            fullWidth
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="group-name"
            label="Group Name"
            type="text"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTokenToGroup} color="primary">
            Add Token to Group
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTokenToGroup;
