import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function ChangeGroup() {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGroup(""); // Reset group
  };

  const handleGroupChange = async () => {
    try {
      const url = new URL("http://18.159.34.32:8000/create_group");
      url.searchParams.append("group_name", group);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Group created successfully:", group);
        setOpen(false); // Close dialog on success
        // Here you can update the UI to reflect the successful group creation
      } else {
        console.error("Failed to create group:", response.statusText);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error("Error creating group:", error);
      // Handle network or unexpected errors
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px", width: "300px", borderRadius: "40px" }}
        onClick={handleClickOpen}
      >
        Create Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter New Group Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="group"
            label="New Group Name"
            type="text"
            fullWidth
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGroupChange} color="primary">
            Create Group
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChangeGroup;
