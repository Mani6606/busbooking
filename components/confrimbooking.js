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
    return total + (seat ? seat.price : 0);
  }, 0);
  const handleConfirm = () => {
    // Assume a successful booking response for demonstration purposes
    // In your actual code, you would replace the following line with the logic to handle API calls and responses
    setBookingSuccess(true);
    onConfirm();
  };
  return (
    <Container>
      {bookingSuccess && (
        <Box
          mt={3}
          sx={{
            marginLeft: "40%",
            textAlign: "center",
            backgroundColor: "#4CAF50", // Green background color
            color: "white",
            padding: "15px",
            borderRadius: "5px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "4px 4px 4px 4px #4CAF50",
          }}
        >
          <Typography variant="h6">Booking Successful!</Typography>
        </Box>
      )}

      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#3e3b3bf8",
            fontFamily: "bold",
            textShadow: "1px 1px 1px rgba(20, 29, 29, 0.973)",
          }}
        >
          Confirmation Details
        </Typography>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          border: "1px solid black",
          boxShadow: "4px 4px 6px rgba(20, 29, 29, 0.973)",
        }}
      >
        <Typography
          sx={{
            fontSize: "25px",
            paddingLeft: "10px",
            color: "#3e3b3bf8",
          }}
        >
          <strong>Bus No:</strong> {props.busNo}
        </Typography>
        <Typography sx={{ fontSize: "25px", color: "#3e3b3bf8" }}>
          <strong>From:</strong> {props.from}
        </Typography>
        <Typography sx={{ fontSize: "25px", color: "#3e3b3bf8" }}>
          <strong>To:</strong> {props.to}
        </Typography>
        <Typography sx={{ fontSize: "25px", color: "#3e3b3bf8" }}>
          <strong>DepartureTime :</strong> {props.departureTime}
        </Typography>
        <Typography sx={{ fontSize: "25px", color: "#3e3b3bf8" }}>
          <strong>ArrivalTime :</strong> {props.arrivalTime}
        </Typography>
      </Box>
      <Box
        mt={3}
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid black",
          boxShadow: "4px 4px 6px rgba(20, 29, 29, 0.973)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: "28px",
            color: "#3e3b3bf8",
            fontFamily: "bold",
            textShadow: "1px 1px 1px rgba(20, 29, 29, 0.973)",
          }}
        >
          Passenger Details:
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              {seatDetails.map((detail) => (
                <TableRow key={detail.seatNo}>
                  <TableCell sx={{ fontSize: "18px", color: "#3e3b3bf8" }}>
                    <strong>Seat No:</strong> {detail.seatNo}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px", color: "#3e3b3bf8" }}>
                    <strong>Name:</strong> {detail.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px", color: "#3e3b3bf8" }}>
                    <strong>Age:</strong> {detail.age}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px", color: "#3e3b3bf8" }}>
                    <strong>Gender:</strong> {detail.gender}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={3}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "end",
            fontFamily: "bold",
            fontSize: "25px",
          }}
        >
          <strong>Total Cost:</strong> ${totalCost}
        </Typography>
      </Box>
      <Box mt={3} sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{ margin: "20px" }}
        >
          Confirm Booking
        </Button>
      </Box>
    </Container>
  );
}
