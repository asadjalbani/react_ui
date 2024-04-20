import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useViewContext } from "./context/ViewsContext";

function AddAccountWithNumber() {
  const { upgradeModal, closeUpgradeModal } = useViewContext();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifyEnabled, setVerifyEnabled] = useState(false);

  useEffect(() => {
    if (otpSent) {
      setVerifyEnabled(true);
    }
  }, [otpSent]);

  const handleClose = () => {
    closeUpgradeModal();
    setMobileNumber("");
    setOtp("");
    setOtpSent(false);
    setVerifyEnabled(false);
  };

  const sendOtp = async () => {
    try {
      const url = new URL("http://3.70.194.53:8000/send_otp");
      url.searchParams.append("phone_number", mobileNumber); // Adding phone_number as a query parameter
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setOtpSent(true);
      } else {
        console.error("Failed to send OTP:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const url = new URL("http://18.159.34.32:8000/auth");
      url.searchParams.append("otp", otp); // Adding OTP as a query parameter
      url.searchParams.append("phone_number", mobileNumber); // Adding phone number as a query parameter
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("OTP verified successfully.");
        // setOpen(false);
        closeUpgradeModal();
        // Redirect to the dashboard page here
      } else {
        console.error("Failed to verify OTP:", response.statusText);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <Dialog open={upgradeModal} onClose={closeUpgradeModal}>
        <DialogTitle>Enter Mobile Number</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="mobile-number"
            label="Mobile Number"
            type="text"
            fullWidth
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          {otpSent && (
            <React.Fragment>
              <TextField
                margin="dense"
                id="otp"
                label="OTP"
                type="text"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                onClick={handleVerifyOtp}
                color="primary"
                disabled={!verifyEnabled}
              >
                Verify OTP
              </Button>
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          {!otpSent ? (
            <Button onClick={sendOtp} color="primary">
              Send OTP
            </Button>
          ) : (
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAccountWithNumber;
