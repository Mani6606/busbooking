import React, { useState, useEffect } from "react";
import SeatSelection from "./seats";

import classes from "./homepage.module.css";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Success from "../loaders/success";

import {
  Container,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const BusList = () => {
  const [busList, setBusList] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  // ==================use effect for  checking session===================================================================
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/");
      }
    });
  }, []);
  // =============================================================================================================================
  // ==================use effect for timeout  session===================================================================
  useEffect(() => {
    const logoutAfterTime = setTimeout(async () => {
      await signOut({ callbackUrl: "/" });
    }, 30 * 60 * 1000);

    return () => clearTimeout(logoutAfterTime);
  }, []);
  // =============================================================================================================================
  // ==================use effect for fetch data===================================================================
  useEffect(() => {
    // Fetch bus list data from your API
    fetch("/api/buslist") // Update with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setBusList(data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);
  // =============================================================================================================================
  const handleViewSeats = (_id) => {
    // Find the selected bus by _id
    const selected = busList.find((bus) => bus._id === _id);

    setSelectedBus(selected);
  };

  const handleDeleteSeat = (busNo, seatNo) => {
    // Implement logic to send a request to update the seat
    fetch(`/api/deleteSeat`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ busNo, seatNo }),
    })
      .then((response) => response.json())
      .then(() => {
        // Update the selectedBus data after updating the seat
        setSelectedBus((prevSelectedBus) => {
          const updatedSeats = prevSelectedBus.formData.seats.map((seat) => {
            if (seat.seatNo === seatNo) {
              return {
                seatNo: seat.seatNo,
                price: seat.price,
                booked: false,
                name: null,
                gender: null,
                age: null,
                berth: seat.berth,
                seat_type: seat.seat_type,
                reserved: null,
              };
            }
            return seat;
          });

          return {
            ...prevSelectedBus,
            formData: {
              ...prevSelectedBus.formData,
              seats: updatedSeats,
            },
          };
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };
  const successtoast = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  const handleCloseDialog = () => {
    setSelectedBus(null);
    // successtoast();
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the home page after logout
  };

  return (
    <>
      <div className={classes.image}>
        <Image
          src="/blur.png" // Replace with the actual path to your image
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={classes.header}>
        <Image
          width={150}
          height={80}
          src="/logo.jpg"
          style={{
            borderRadius: "50%",
            marginRight: "10px",
          }}
        ></Image>

        <h2>welcome for online ticket reservation system</h2>
        <Button
          sx={{
            fontFamily: "bold",
            backgroundColor: "red",
            opacity: "1",
            color: "white",
            padding: "8px",
            marginLeft: "10px",
            ":hover": {
              opacity: "1",
              fontSize: "15px",

              color: "black",
              backgroundColor: "red",
              // border: "2px solid black",
            },
          }}
          onClick={handleLogout}
        >
          LogOut
        </Button>
      </div>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Change "column" to "row"
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
            flexWrap: "wrap",
            // Allow items to wrap to the next row
          }}
        >
          <List sx={{ marginTop: "100px" }}>
            {busList.map((bus) => (
              <div key={bus.busNo} className={classes.listfull}>
                <div className={classes.busDetails}>
                  <div className={classes.list}>
                    <div className={classes.heading}>Bus No: </div>
                    <div className={classes.value}>{bus.formData.busNo}</div>
                    <div className={classes.heading}> From: </div>
                    <div className={classes.value}>{bus.formData.from}</div>
                    <div className={classes.heading}> To: </div>
                    <div className={classes.value}> {bus.formData.to}</div>
                    <div className={classes.heading}>Departure Time: </div>
                    <div className={classes.value}>
                      {bus.formData.departureTime}
                    </div>
                    <div className={classes.heading}> Arrival Time: </div>
                    <div className={classes.value}>
                      {bus.formData.arrivalTime}
                    </div>
                  </div>
                </div>

                <div className={classes.buttonContainer}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewSeats(bus._id)}
                    sx={{
                      color: "orange",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      ":hover": {
                        opacity: "1",
                        borderRadius: "20px",
                        border: "2px solid blue",
                        // transition: "border 0.2s ease,borderRadius 0.2s ease",
                      },
                    }}
                  >
                    View Seats
                  </Button>
                </div>
              </div>
            ))}
          </List>
        </Box>

        {/* Dialog to display seat status */}
        <Dialog
          fullWidth
          open={Boolean(selectedBus)}
          onClose={handleCloseDialog}
          maxWidth="lg" // You can adjust this value as needed
        >
          {selectedBus && (
            <SeatSelection
              bus={selectedBus}
              callback={handleCloseDialog}
              callback1={successtoast}
            />
          )}
        </Dialog>
      </Container>
      {success && <Success props="Booking Successfull" />}
    </>
  );
};

export default BusList;
