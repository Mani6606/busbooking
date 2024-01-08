import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Addbus from "./addbus";
import Buslist from "./buslist";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import classes from "./adminhome.module.css";
export default function AdminHome() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  const [addbus, setAddbus] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const logoutAfterTime = setTimeout(async () => {
      await signOut({ callbackUrl: "/" });
    }, 30 * 60 * 1000);
    return () => clearTimeout(logoutAfterTime);
  }, []);

  useEffect(() => {
    getSession().then((session) => {
      if (!session || session.user.email !== "admin@gmail.com") {
        router.replace("/");
      }
    });
  }, []);
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
    <div className={classes.body}>
      <div className={classes.header}>
        <h3>welcome To the Admin Page</h3>
        <Button
          variant="contained"
          size="small"
          style={{
            position: "absolute",
            top: "18px",
            right: "10px",
            margin: "5px",
            backgroundColor: " rgb(249, 120, 0)",
          }}
          onClick={handleLogout}
        >
          LogOut
        </Button>
      </div>
      <Container>
        <Box
          fullWidth
          sx={{
            display: "flex",
            flexWrap: "column wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
            backgroundColor: "white",
            gap: "20px",
            // Conditionally apply styles based on showAddBus state
          }}
        >
          <div className={classes.buttonstwo}>
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
          </div>
          <div className={(showAddBus || showBusList) && classes.secondpart}>
            {showAddBus && <Addbus onBackButtonClick={handleBackButtonClick} />}
            {showBusList && (
              <Buslist onBackButtonClick={handleBackButtonClick} />
            )}
          </div>
        </Box>
      </Container>
    </div>
  );
}
