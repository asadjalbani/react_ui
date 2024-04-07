import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function SwipeRoutineModal({ open, onClose, onSubmit }) {
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [likesPerDay, setLikesPerDay] = useState('');
  const [leftSwipePercentage, setLeftSwipePercentage] = useState('');  // New state for left swipe percentage

  const handleClose = () => {
    onClose();
    setStartHour('');
    setEndHour('');
    setLikesPerDay('');
    setLeftSwipePercentage('');  // Resetting left swipe percentage on close
  };

  const handleConfirm = async () => {
    try {
      const url = new URL('http://3.70.194.53:8000/set_swipe_routine_settings');
      const params = new URLSearchParams({
        start_hour: startHour,
        end_hour: endHour,
        likes_per_day: likesPerDay,
        left_swipe_percentage: leftSwipePercentage,  // Including left swipe percentage in the params
        auth_token: ''
      });
      const response = await fetch(`${url.toString()}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log('Swipe routine submitted successfully.');
        onSubmit(); // Notify parent component
        handleClose();
      } else {
        console.error('Failed to submit swipe routine:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting swipe routine:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Swipe Routine</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="start-hour"
          label="Start Hour"
          type="text"
          fullWidth
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
        />
        <TextField
          margin="dense"
          id="end-hour"
          label="End Hour"
          type="text"
          fullWidth
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
        />
        <TextField
          margin="dense"
          id="likes-per-day"
          label="Likes Per Day"
          type="number"
          fullWidth
          value={likesPerDay}
          onChange={(e) => setLikesPerDay(e.target.value)}
        />
        <TextField  // New TextField for left swipe percentage
          margin="dense"
          id="left-swipe-percentage"
          label="Left Swipe Percentage"
          type="number"
          fullWidth
          value={leftSwipePercentage}
          onChange={(e) => setLeftSwipePercentage(e.target.value)}
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

export default SwipeRoutineModal;