import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const NavigationBar = ({ title, onBackButtonClick }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {onBackButtonClick && (
          <Button
            color="inherit" // Set the color to "inherit" for white
            size="large" // Set the size as needed (small, medium, large)
            startIcon={<ArrowBackIcon />} // Use the ArrowBackIcon as a start icon
            onClick={onBackButtonClick}
            sx={{ fontWeight: "bold" }} // Set font weight to bold
          >
            Back
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
