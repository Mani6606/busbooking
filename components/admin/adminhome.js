import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Addbus from "./addbus";
import Buslist from "./buslist"; // Import the BusList component
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
export default function AdminHome() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the home page after logout
  };

  const router = useRouter();
  useEffect(() => {
    const logoutAfterTime = setTimeout(async () => {
      await signOut({ callbackUrl: "/" }); // Redirect to the home page after logout
    }, 10 * 60 * 1000); // 30 minutes in milliseconds

    return () => clearTimeout(logoutAfterTime); // Clear the timeout on component unmount
  }, []);

  useEffect(() => {
    getSession().then((session) => {
      if (!session || session.user.email !== "admin@gmail.com") {
        router.replace("/");
      } else {
        // temp_id = session.user.email;
        // setInput_id(session.user.email);
        // const emaill = session.user.email;
        // const atIndex = emaill.indexOf("@");
        // setName(session.user.email.substring(0, atIndex));
        // Getmsg(session.user.email);
        console.log(session.user.email);
        console.log(session);
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
    <>
      <Button
        variant="contained"
        size="medium"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          margin: "10px",
          backgroundColor: "red",
        }}
        onClick={handleLogout}
      >
        LogOut
      </Button>
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
    </>
  );
}
