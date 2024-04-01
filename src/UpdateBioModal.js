import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function UpdateBioModal({ open, onClose, onSubmit }) {
  const [newBio, setNewBio] = useState('');
  const [authToken, setAuthToken] = useState('');

  const handleClose = () => {
    onClose();
    setNewBio('');
    setAuthToken('');
  };

  const handleConfirm = async () => {
    try {
      const url = new URL('http://3.70.194.53:8000/update_bio');
      const params = new URLSearchParams({
        new_bio: newBio,
        auth_token: 'e1f74c37-aaa4-4772-bd0e-8938b0a6433e'
      });
      const response = await fetch(`${url.toString()}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log('Bio updated successfully.');
        onSubmit(); // Notify parent component
        handleClose();
      } else {
        console.error('Failed to update bio:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Bio</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="new-bio"
          label="New Bio"
          type="text"
          fullWidth
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateBioModal;
