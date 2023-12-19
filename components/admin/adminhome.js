import React, { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Addbus from "./addbus";
import Buslist from "./buslist"; // Import the BusList component

export default function AdminHome() {
  const [showAddBus, setShowAddBus] = useState(false);
  const [showBusList, setShowBusList] = useState(false);

  const handleAddBusClick = () => {
    setShowAddBus(true);
    setShowBusList(false); // Hide BusList when Add Bus is clicked
  };

  const handleBusListClick = () => {
    setShowBusList(true);
    setShowAddBus(false); // Hide Addbus when Bus List is clicked
  };

  const handleBackButtonClick = () => {
    setShowAddBus(false);
    setShowBusList(false);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {showAddBus ? (
          <Addbus onBackButtonClick={handleBackButtonClick} />
        ) : showBusList ? (
          <Buslist onBackButtonClick={handleBackButtonClick} />
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ margin: "10px" }}
              onClick={handleAddBusClick}
            >
              Add Bus
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ margin: "10px" }}
              onClick={handleBusListClick}
            >
              Bus List
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
