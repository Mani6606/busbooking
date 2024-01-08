import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Loader from "../loaders/bookingloader";
import classes from "./confrimbooking.module.css";
export default function Confirm({
  props,
  seatDetails,
  selectedSeats,
  onConfirm,
}) {
  // Calculate total cost based on the prices associated with selected seats
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const totalCost = selectedSeats.reduce((total, seatNo) => {
    const seat = props.seats.find((seat) => seat.seatNo === seatNo);

    const seatIndex = seatDetails.findIndex(
      (seats) => seats.seatNo === seat.seatNo
    );

    const details = seatDetails[seatIndex];

    seatDetails[seatIndex] = {
      seatNo: seatNo,
      price: seat.price,
      name: details.name,
      age: details.age,
      gender: details.gender,
      // Add other properties if needed
    };

    return total + (seat ? seat.price : 0);
  }, 0);
  const handleConfirm = () => {
    setBookingSuccess(true);
    onConfirm();
  };
  return (
    <Container sx={{ position: "relative" }}>
      {bookingSuccess && <Loader />}

      <div className={bookingSuccess && classes.dimmed}>
        <Box
          sx={{
            textAlign: "center",
            mt: 1,
            mb: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#006f41ef",
              fontFamily: "bold",
              textShadow: "1px 1px 2px rgba(20, 29, 29, 0.973)",
            }}
          >
            Confirmation Details
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            mt: 1,
            mb: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            border: "0px solid black",
            boxShadow: "4px 4px 6px rgba(20, 29, 29, 0.973)",
          }}
        >
          <Typography
            sx={{
              fontSize: "25px",
              paddingLeft: "10px",
              color: "#006f41ef",
            }}
          >
            <strong>Bus No</strong> {props.busNo}
          </Typography>
          <Typography
            sx={{
              fontFamily: "bold",
              fontSize: "26px",
              color: "#ff7700c5",
              padding: "10px",
            }}
          >
            <strong>From</strong> {props.from}
          </Typography>
          <Typography
            sx={{ fontSize: "26px", color: "#0871bde3", padding: "10px" }}
          >
            <strong>To</strong> {props.to}
          </Typography>
          <Typography
            sx={{ fontSize: "26px", color: "#ff7700c5", padding: "10px" }}
          >
            <strong>Departure Time</strong> {props.departureTime}
          </Typography>
          <Typography
            sx={{ fontSize: "26px", color: "#006f41ef", padding: "10px" }}
          >
            <strong>Arrival Time </strong> {props.arrivalTime}
          </Typography>
        </Box>
        <Box
          mt={3}
          sx={{
            textAlign: "center",
            mt: 1,
            mb: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "0px solid black",
            boxShadow: "4px 4px 6px rgba(20, 29, 29, 0.973)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "35px",
              color: "#ff7700c5",
              fontFamily: "bold",
              textShadow: "1px 1px 2px rgba(255, 119, 0, 0.773)",
            }}
          >
            Passenger Details:
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {seatDetails.map((detail) => (
                  <TableRow key={detail.seatNo}>
                    <TableCell sx={{ fontSize: "18px", color: "#006f41ef" }}>
                      <strong>Seat No:</strong> {detail.seatNo}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", color: "#0871bde3" }}>
                      <strong>Name:</strong> {detail.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", color: "#0871bde3" }}>
                      <strong>Age:</strong> {detail.age}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", color: "#006f41ef" }}>
                      <strong>Gender:</strong> {detail.gender}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", color: "#000000c5" }}>
                      <strong>Price:</strong> {detail.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          mt={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {/* </Box>
      <Box mt={1} sx={{ textAlign: "center" }}> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{
              margin: "20px",
              marginLeft: "450px",
              ":hover": {
                backgroundColor: "darken(primary.main, 0.9)",

                boxShadow: "0px 0px 10px 1px blue", // Move boxShadow here
              },
            }}
          >
            Confirm Booking
          </Button>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "end",
              fontFamily: "bold",
              fontSize: "25px",
              marginRight: "50px",
            }}
          >
            <strong>Total Cost:</strong> ${totalCost}
          </Typography>
        </Box>
      </div>
    </Container>
  );
}
