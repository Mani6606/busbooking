import React, { useState, useEffect } from "react";
import SeatSelection from "./testing";
import classes from "./homepage.module.css";
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

const BusList = ({ onBackButtonClick }) => {
  const [busList, setBusList] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    // Fetch bus list data from your API
    fetch("/api/buslist") // Update with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setBusList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const handleViewSeats = (_id) => {
    // Find the selected bus by _id
    const selected = busList.find((bus) => bus._id === _id);
    console.log("seleccted", selected.formData.seats);
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

  const handleCloseDialog = () => {
    setSelectedBus(null);
  };

  return (
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
        <List>
          {busList.map((bus) => (
            <ListItem
              key={bus._id}
              sx={{
                border: "1px solid #000000",
                borderRadius: "8px",
                marginBottom: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItemText

              // maxWidth="lg"
              // sx={{
              //   display: "flex",
              //   flexDirection: "row", // Keep it as "row"
              //   justifyContent: "space-between", // Optional: Adjust the spacing between elements
              //   alignItems: "center",
              //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              //   width: "100%",
              //   height: "100%", // Set height to 100%
              //   // backgroundColor: "#4caf50",
              // }}
              >
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
              </ListItemText>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleViewSeats(bus._id)}
                sx={{ color: "blue", fontWeight: "bold" }}
              >
                View Seats
              </Button>
            </ListItem>
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
        {selectedBus && <SeatSelection bus={selectedBus} callback={handleCloseDialog} />}
      </Dialog>
    </Container>
  );
};

export default BusList;
