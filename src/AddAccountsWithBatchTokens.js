import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function UploadCSV() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null); // Reset the file input when the dialog is closed
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadCSV = () => {
    if (!file) {
      alert('Please select a CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvContent = e.target.result;

      fetch('http://3.70.194.53:8000/upload_tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/csv',
        },
        body: csvContent, // CSV file content
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setOpen(false); // Close the dialog on successful upload
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to upload CSV. Please try again.');
      });
    };
    reader.readAsText(file); // Read the CSV file content as text
  };

  return (
    <div>
      <Button variant="contained" color="primary" style={{ marginTop: '20px', width: '50%' }} onClick={handleClickOpen}>
        Upload CSV
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload CSV File</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: '.csv' }} // Accept only CSV files
            helperText="Select a CSV file to upload."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUploadCSV} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadCSV;
