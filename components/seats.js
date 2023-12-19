import React, { useState } from "react";
import classes from "./seatselect.module.css";

const SeatSelection = () => {
  const totalRows = 10;
  const seatsPerRow = 3;
  let seatno = 0;
  const sleeperSeatsCount = 5;
  const seaterSeatsCount = 20;

  const [seatData, setSeatData] = useState(() => {
    // Initialize sleeper seat data
    const sleeperSeats = Array.from(
      { length: sleeperSeatsCount },
      (_, index) => ({
        seatNo: index + 1,
        price: 50, // Adjust the price as needed
        booked: false,
      })
    );

    // Initialize seater seat data
    const seaterSeats = Array.from(
      { length: seaterSeatsCount },
      (_, index) => ({
        seatNo: index + 1 + sleeperSeatsCount,
        price: 30, // Adjust the price as needed
        booked: false,
      })
    );

    return [...sleeperSeats, ...seaterSeats];
  });

  console.log(seatData);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, seat) => {
    const seatIndex = `${row}-${seat}`;
    // console.log(selectedSeats)
    if (selectedSeats.includes(seatIndex)) {
      // If seat is already selected, remove it from the list
      setSelectedSeats(selectedSeats.filter((s) => s !== seatIndex));
    } else {
      // If seat is not selected, add it to the list
      setSelectedSeats([...selectedSeats, seatIndex]);
    }
    console.log(selectedSeats);
  };

  async function book() {
    const responce = await fetch("/api/seatsbooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedSeats }),
    });
    const jsonData = await responce.json();
    if (responce.ok) {
      console.log(jsonData.msg);
    } else {
      console.log(jsonData.msg);
    }
  }
  return (
    <div className={classes.busout}>
      <div className={classes.seatselectioncontainer}>
        <h2>Bus Seat Selection</h2>
        {/* ------------------------------------------------------------------- */}
        <div className={classes.wholebus}>
          <div className={classes.seatgrid}>
            {[...Array(5)].map((_, row) => (
              <div key={row} className={classes.seatrow}>
                {[...Array(1)].map((_, seat) => (
                  <div
                    key={seat}
                    className={`
                ${classes.seat} 
                ${
                  selectedSeats.includes(`${row}-${seat}`)
                    ? classes.selected
                    : ""
                } 
                ${seat === 0 ? classes.firstSeat : ""}`} // Apply the 'firstSeat' class to the first seat in each row
                    onClick={() => handleSeatClick(row, seat)}
                  >
                    <p>|_ {(seatno = seatno + 1)}_|</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* -------------------------------------------------------------------------------------- */}
          <div className={classes.seatgrid}>
            {[...Array(totalRows)].map((_, row) => (
              <div key={row} className={classes.seatrow}>
                {[...Array(seatsPerRow - 1)].map((_, seat) => (
                  <div
                    key={seat}
                    className={`
                ${classes.seat} 
                ${
                  selectedSeats.includes(`${row}-${seat}`)
                    ? classes.selected
                    : ""
                } 
                ${seat === 0 ? classes.firstSeatone : ""}`}
                    onClick={() => handleSeatClick(row, seat)}
                  >
                    <p>|_ {(seatno = seatno + 1)}_|</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* ---------------------------------------------------------------------------------------- */}
        </div>
      </div>

      <div className={classes.selectedseats}>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <button onClick={book}> book</button>
      </div>
    </div>
  );
};

export default SeatSelection;
