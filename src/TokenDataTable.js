import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from "@mui/icons-material/Settings";
import SwipeRoutineModal from "./SwipeRoutineModal";
import UpdateBioModal from "./UpdateBioModal";
import AddAccountWithNumber from "./AddAccountWithNumber";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Button from "@mui/material/Button";
import TransitionsModal from "./components/modal";
import { useViewContext } from "./context/ViewsContext";
import { Alert, Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function TokenDataTable() {
  const { isOpen, openModal, setAuthToken, openUpgradeModal, setTokenCount } =
    useViewContext();
  const [tokens, setTokens] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [swipeModalOpen, setSwipeModalOpen] = useState(false);
  const [updateBioModalOpen, setUpdateBioModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://18.159.34.32:8000/get_auth_tokens")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTokens(data.tokens);
        setTokenCount(data.tokens.length);
      })
      .catch((error) => {
        console.error("Error fetching tokens:", error);
        setFetchError(error.message);
      });
  }, []);

  if (fetchError) {
    return <div>Error loading tokens: {fetchError}</div>;
  }

  const updateBio = (token) => {
    // preventDefault();
    setAuthToken(token);
    openModal();
  };

  const deleteToken = (token) => {
    console.log("token", token);
    fetch(`http://18.159.34.32:8000/remove_auth_token?auth_token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Removed:", data);
        setAlert(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setInterval(() => {
      setAlert(false);
    }, 3000);
  };
  // const handleOpenSwipeModal = () => {
  //   setSwipeModalOpen(true);
  // };
  const handleSwipeRoutineStop = () => {
    setIsRunning(false);
  };

  const handleCloseSwipeModal = () => {
    setSwipeModalOpen(false);
  };

  const handleSwipeRoutineSubmit = () => {
    fetch(`http://18.159.34.32:8000/start_mass_swipe`, {
      method: "POST",
      headers: {
        "Content-Type": "text",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsRunning(true);
    console.log("Swipe routine submitted");
  };

  // const handleStopRoutine = () => {
  //   setIsRunning(false);
  //   console.log("Swipe routine stopped");
  // };

  // const handleOpenUpdateBioModal = () => {
  //   setUpdateBioModalOpen(true);
  // };

  const handleCloseUpdateBioModal = () => {
    setUpdateBioModalOpen(false);
  };

  const handleUpdateBioSubmit = () => {
    console.log("Bio updated");
  };

  // const handleOpenAddAccountModal = () => {
  //   setAddAccountModalOpen(true);
  // };

  const handleCloseAddAccountModal = () => {
    setAddAccountModalOpen(false);
  };
  const handleUpgradeModal = () => {
    console.log("Upgraded");
  };

  return (
    <div>
      <>
        <TextField
          id="outlined-start-adornment"
          sx={{
            border: "1px solid black",
            borderRadius: "8px",
            width: "80%",
          }}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            console.log("Search Query:", e.target.value); // Add this line
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                style={{ cursor: "pointer" }}
                onClick={() => setSearchQuery("")}
                position="end"
              >
                <CloseIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </>
      {alert && <Alert severity="info">"Token Deleted Successfully!" </Alert>}
      {isOpen && <TransitionsModal />}
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
              tokens
                .filter((token) =>
                  token[0].toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((token, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{"No Group"}</TableCell>
                    <TableCell>
                      <UpgradeIcon
                        onClick={openUpgradeModal}
                        sx={{
                          height: "30px",
                          width: "30px",
                          backgroundColor: "#165FC7",
                          color: "white",
                          borderRadius: "25px",
                          padding: 0.5,
                          ":hover": {
                            cursor: "pointer",
                            backgroundColor: "lightBlue",
                            color: "#165FC7",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>{token[0]}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      {token[1] ? token[1] : ""} <br></br>
                      {token[2] ? token[2] : ""}
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isRunning ? "green" : "red",
                        }}
                      >
                        <FiberManualRecordIcon />{" "}
                        {isRunning ? "Running" : "Off"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <IconButton onClick={() => updateBio(token[0])}>
                          <SettingsIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteToken(token[0])}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {isRunning ? (
          <Button
            variant="contained"
            onClick={handleSwipeRoutineStop}
            style={{
              color: "primary",
              borderRadius: "35px",
              fontSize: "16px",
              height: "40px",
              width: "100px",
              margin: "5px",
            }}
            aria-label="play"
          >
            Stop <StopCircleIcon style={{ marginLeft: "5px" }} />
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSwipeRoutineSubmit}
            style={{
              color: "primary",
              borderRadius: "35px",
              fontSize: "16px",
              height: "40px",
              width: "100px",
              margin: "5px",
            }}
            aria-label="play"
          >
            Play <PlayCircleIcon />
          </Button>
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
