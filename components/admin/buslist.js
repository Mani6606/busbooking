import React, { useState, useEffect } from "react";
import classes from "./buslist.module.css";
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
import Typography from "@mui/material/Typography";

import NavigationBar from "./navigationbar";

const BusList = ({ onBackButtonClick }) => {
  const [busList, setBusList] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

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

  const handleViewSeats = (_id) => {
    // Find the selected bus by _id
    const selected = busList.find((bus) => bus._id === _id);
    setSelectedBus(selected);
  };

  const handleDeleteBus = (_id) => {
    // Send DELETE request to delete the bus by _id
    fetch(`/api/buslist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    })
      .then((response) => response.json())
      .then(() => {
        // Update busList after deletion
        setBusList((prevBusList) =>
          prevBusList.filter((bus) => bus._id !== _id)
        );
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
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
      <NavigationBar title="Bus List" onBackButtonClick={onBackButtonClick} />
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
              fullWidth
              key={bus._id}
              sx={{
                border: "2px solid #000000",
                borderRadius: "8px",
                marginRight: "10px", // Add margin between items
                marginBottom: "10px",
                padding: "10px",
                width: "120%", // Set width to 100%
                height: "15%", // Set height to 15%
                display: "flex",
                flexDirection: "row",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItemText
                fullWidth
                maxWidth="lg"
                sx={{
                  display: "flex",
                  flexDirection: "row", // Keep it as "row"
                  justifyContent: "space-between", // Optional: Adjust the spacing between elements
                  alignItems: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  height: "100%", // Set height to 100%
                  // backgroundColor: "#4caf50",
                }}
              >
                <Typography
                  fullWidth
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  Bus No: {bus.formData.busNo}
                  <Typography
                    sx={{ color: "black", fontWeight: "bold", padding: "10px" }}
                  >
                    FROM:
                  </Typography>
                  <Typography>{bus.formData.from}</Typography>
                  <Typography
                    sx={{ color: "black", fontWeight: "bold", padding: "10px" }}
                  >
                    TO:
                  </Typography>
                  <Typography> {bus.formData.to} </Typography>
                  <Typography sx={{ color: "black", fontWeight: "bold" }}>
                    DEPARTURE: {bus.formData.departureTime}
                  </Typography>
                  <Typography sx={{ color: "black", fontWeight: "bold" }}>
                    ARRIVAL: {bus.formData.arrivalTime}
                  </Typography>
                </Typography>
              </ListItemText>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleViewSeats(bus._id)}
                sx={{ color: "blue", fontWeight: "bold" }}
              >
                View Seats
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteBus(bus._id)}
                sx={{ color: "red", fontWeight: "bold", marginLeft: "10px" }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Dialog to display seat status */}
      <Dialog
        open={Boolean(selectedBus)}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg" // You can adjust this value as needed
      >
        {selectedBus && (
          <div className={classes.box}>
            <DialogTitle>
              Seat Status for Bus No: {selectedBus.formData.busNo}
            </DialogTitle>
            <DialogContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Seat No</TableCell>
                      <TableCell>price</TableCell>
                      <TableCell>booked</TableCell>
                      <TableCell>name</TableCell>
                      <TableCell>gender</TableCell>
                      <TableCell>age</TableCell>
                      <TableCell>berth</TableCell>
                      <TableCell>seat_type</TableCell>
                      <TableCell>reserved</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedBus.formData.seats.map((seat) => (
                      <TableRow key={seat.seatNo}>
                        <TableCell>{seat.seatNo}</TableCell>
                        <TableCell>{seat.price}</TableCell>
                        <TableCell>
                          {seat.booked ? "Booked" : "Not Booked"}
                        </TableCell>
                        <TableCell>{seat.name || "Null"}</TableCell>
                        <TableCell>{seat.gender || "Null"}</TableCell>
                        <TableCell>{seat.age || "Null"}</TableCell>
                        <TableCell>{seat.berth}</TableCell>
                        <TableCell>{seat.seat_type}</TableCell>
                        <TableCell>{seat.reserved ? "yes" : "No"}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              handleDeleteSeat(
                                selectedBus.formData.busNo,
                                seat.seatNo
                              )
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions
              sx={{
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff", // Set background color as needed
                zIndex: 1,
              }}
            >
              <Button
                onClick={handleCloseDialog}
                color="primary"
                sx={{
                  backgroundColor: "#4caf50",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#7be07e", // Set the slightly dimmed color on hover
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </Container>
  );
};

export default BusList;
