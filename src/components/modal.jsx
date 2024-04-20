import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useViewContext } from "../context/ViewsContext";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const { isOpen, closeModal, token } = useViewContext();
  const [bio, setBio] = React.useState("");

  const updateBio = () => {
    fetch(
      `http://18.159.34.32:8000/update_bio?new_bio=${bio}&auth_token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "text",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography
              sx={{ mb: 2 }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Bio
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                sx={{ width: 500 }}
                id="outlined-basic"
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                variant="outlined"
              />
              <Button
                onClick={updateBio}
                sx={{ mx: 2, width: 100, fontSize: 13 }}
                variant="contained"
              >
                Update{" "}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
