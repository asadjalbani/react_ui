import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function AddAccountWithToken() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [http_proxy, setHttpProxy] = useState("");
  const [https_proxy, setHttpsProxy] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setToken(""); // Reset token
    setHttpProxy("");
    setHttpsProxy("");
  };

  const handleTokenSubmit = async () => {
    try {
      const url = new URL("http://18.159.34.32:8000/upload_token");
      url.searchParams.append("auth_token", token); // Sending the token as a URL parameter
      url.searchParams.append("http_proxy", http_proxy);
      url.searchParams.append("https_proxy", https_proxy);

      const response = await fetch(url.toString(), {
        method: "POST", // Changed to GET since we're now sending the token as a parameter
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Token verified successfully.");
        setOpen(false); // Close dialog on success
        // Here you can redirect the user or update the UI to reflect the successful token verification
      } else {
        console.error("Failed to verify token:", response.statusText);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error("Error verifying token:", error);
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
        Add Account With Token
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Auth Token</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="auth-token"
            label="Auth Token"
            type="text"
            fullWidth
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="http_proxy"
            label="Http Proxy"
            type="text"
            fullWidth
            value={http_proxy}
            onChange={(e) => setHttpProxy(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="https_proxy"
            label="Https Proxy"
            type="text"
            fullWidth
            value={https_proxy}
            onChange={(e) => setHttpsProxy(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTokenSubmit} color="primary">
            Submit Token
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAccountWithToken;
