import React, { useEffect, useState } from "react";
import Popup from "../loaders/popup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import classes from "./addbus.module.css";
export default function Addbus({ onBackButtonClick }) {
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  function callback() {
    setPopup(false);
  }
  const router = useRouter();
  const [formData, setFormData] = useState({
    busNo: "",
    from: "",
    to: "",
    departureTime: null,
    arrivalTime: null,
    busModel: "",
    seats: [],
  });

  useEffect(() => {
    const generateInitialSeats = () => {
      const sleeperSeatsCount = 5;
      const seaterSeatsCount = 20;

      const sleeperSeatslb = Array.from(
        { length: sleeperSeatsCount },
        (_, index) => ({
          seatNo: index + 1,
          price: 1200,
          booked: false,
          name: "",
          gender: "",
          age: "",
          berth: "lower",
          seat_type: "sleeper",
          reserved: false,
        })
      );

      const seaterSeatslb = Array.from(
        { length: seaterSeatsCount },
        (_, index) => ({
          seatNo: index + 1 + sleeperSeatsCount,
          price: 700,
          booked: false,
          name: "",
          gender: "",
          age: "",
          berth: "lower",
          seat_type: "seater",
          reserved: false,
        })
      );

      const sleeperSeatsub = Array.from({ length: 15 }, (_, index) => ({
        seatNo: index + 26,
        price: 1100,
        booked: false,
        name: "",
        gender: "",
        age: "",
        berth: "upper",
        seat_type: "sleeper",
        reserved: false,
      }));

      return [...sleeperSeatslb, ...seaterSeatslb, ...sleeperSeatsub];
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      seats: generateInitialSeats(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      formData.busNo &&
      formData.arrivalTime &&
      formData.departureTime &&
      formData.from &&
      formData.to &&
      formData.busModel
    ) {
      fetch("/api/buslist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Bus number already exists") {
            setPopup(true);
            setMsg("Bus number already exists");
          }
          if (data.message === "Message stored successfully") {
            setPopup(true);
            setMsg("Bus Added successfully");
          }
          if (data.message === "Internal server error") {
            setPopup(true);
            setMsg("Internal server error");
          }

          console.log("API Response:", data.message);

          setFormData({
            busNo: "",
            from: "",
            to: "",
            departureTime: "",
            arrivalTime: "",
            busModel: "",
            seats: [],
          });
        })

        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      setPopup(true);
      setMsg("Fill the required details");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "800px",
        margin: "0px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "20px",
        // border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {popup && <Popup props={msg} callbackfun={callback} />}
      <button className={classes.close} onClick={onBackButtonClick}>
        <svg viewBox="0 0 10 10">
          <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"></polygon>
        </svg>
      </button>
      <TextField
        label="Bus No"
        type="text"
        name="busNo"
        value={formData.busNo}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="From"
        type="text"
        name="from"
        value={formData.from}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="To"
        type="text"
        name="to"
        value={formData.to}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      {/* Departure Time */}
      <TextField
        label="Departure Timing"
        type="time"
        name="departureTime"
        value={formData.departureTime}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 minutes step
        }}
      />

      {/* Arrival Time */}
      <TextField
        label="Arrival Timing"
        type="time"
        name="arrivalTime"
        value={formData.arrivalTime}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 minutes step
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="busModel-label">Bus Model</InputLabel>
        <Select
          labelId="busModel-label"
          id="busModel"
          name="busModel"
          value={formData.busModel}
          onChange={handleChange}
          required
        >
          <MenuItem value="">Select Bus Model</MenuItem>
          <MenuItem value="model1">Model 1</MenuItem>
          <MenuItem value="model2">Model 2</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Submit
      </Button>
    </form>
  );
}
