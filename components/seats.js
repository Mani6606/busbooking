import { useState, useEffect } from "react";

import classes from "./testing.module.css";
import SeatIcon from "./svg";
import SSeatIcon from "./seatsvg";
import { FaChair } from "react-icons/fa";
export default function SeatSelection({ props }) {
  // ----------code to add the selected seats to an array to send server side----------------------------
  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSeatClick = (seatNo) => {
    const clickedSeat = props.seats.find((seat) => seat.seatNo === seatNo);

    if (clickedSeat && !clickedSeat.booked) {
      setSelectedSeats((prevSelectedSeats) => {
        const isSeatSelected = prevSelectedSeats.includes(seatNo);
        return isSeatSelected
          ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatNo)
          : [...prevSelectedSeats, seatNo];
      });
    }
  };
  //  ===============================SEAT LAYOUT START==============================================================================================
  const renderSeats = () => {
    // =========================================1==================================================================================================
    const firstFiveSeats = props.seats.slice(0, 5).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeat}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ""}
        ${seat.booked ? classes.booked : ""}
       `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        <div className={classes.seatImageContainer}>
          <SeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
          <span className={classes.seatNumber}>{seat.seatNo}</span>
        </div>

        {/* <p>|_ {seat.seatNo} - ${seat.price}_|</p> */}
      </div>
    ));
    // =====================================2==================================================================================================
    const remainingSeats1 = props.seats.slice(5, 15).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
          ${classes.seat} 
          ${selectedSeats.includes(seat.seatNo) ? classes.selected : ""}
          ${seat.booked ? classes.booked : ""}
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        <div className={classes.seatImageContainerseat}>
          <SSeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
          <span className={classes.seatNumberseat}>{seat.seatNo}</span>
        </div>
      </div>
    ));
    // ===================================================3======================================================================================
    const remainingSeats2 = props.seats.slice(15, 25).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
          ${classes.seat} 
          ${selectedSeats.includes(seat.seatNo) ? classes.selected : ""}
          ${seat.booked ? classes.booked : ""}
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        {/* <p>|_ {seat.seatNo} - ${seat.price}_|</p> */}
        <div className={classes.seatImageContainerseat}>
          <SSeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
          <span className={classes.seatNumberseat}>{seat.seatNo}</span>
        </div>
      </div>
    ));
    // ===================================================4==================================================================================
    const upper1 = props.seats.slice(25, 30).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeatub1}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ""}
        ${seat.booked ? classes.booked : ""}
          
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        <div className={classes.seatImageContainer}>
          <SeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
          <span className={classes.seatNumber}>{seat.seatNo}</span>
        </div>
        {/* <Image src='/seat.png' height={20} width={20} alt={`Seat ${seat.seatNo}`} /> */}
        {/* <p>|_ {seat.seatNo} - ${seat.price}_|</p> */}
      </div>
    ));
    // ===================================================5==================================================================================
    const upper2 = props.seats.slice(30, 35).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeatub}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ""}
        ${seat.booked ? classes.booked : ""}
          
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        {/* <p>|_ {seat.seatNo} - ${seat.price}_|</p> */}
        <div className={classes.seatImageContainer}>
          <SeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
          <span className={classes.seatNumber}>{seat.seatNo}</span>
        </div>
      </div>
    ));
    // ====================================6=======================================================================================================
    const upper3 = props.seats.slice(35, 40).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeatub}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ""}
        ${seat.booked ? classes.booked : ""}
          
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        {/* <p>|_ {seat.seatNo} - ${seat.price}_|</p> */}
        <div className={classes.seatImageContainer}>
          <SeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
          <span className={classes.seatNumber}>{seat.seatNo}</span>
        </div>
      </div>
    ));
    //  ==========================================================================================================================================
    return (
      <div className={classes.head}>
        <div className={classes.head1}>
          <h2>LOWER DECK</h2>
          <h2>UPPER DECK</h2>
        </div>
        <div className={classes.seatgrid}>
          <div className={classes.layoutlb}>
            <div>{firstFiveSeats}</div>
            <div>{remainingSeats1}</div>
            <div>{remainingSeats2}</div>
          </div>
          <div className={classes.layoutub}>
            <div>{upper1}</div>
            <div>{upper2}</div>
            <div>{upper3}</div>
          </div>
        </div>
      </div>
    );
  };
  // ================================SEAT LAYOUT END ==========================================================================================

  // ==================================== POST REQUEST TO API=================================================================================
  async function book() {
    // Your booking logic here using selectedSeats array
    console.log("Selected Seats:", selectedSeats);

    try {
      // Send a POST request to your server to update the database
      const response = await fetch("/api/seatsbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedSeats }),
      });

      if (response.ok) {
        console.log("Booking successful");

        // Clear selected seats after booking
        setSelectedSeats([]);
      } else {
        console.log("Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // =========================================================================================================================================
  return (
    <div className={classes.busout}>
      <div className={classes.seatselectioncontainer}>
        <h2>Bus-{props.busNo}</h2>
        <div className={classes.split}>
          <div className={classes.seatselect}>{renderSeats()}</div>
          <div className={classes.ticketdetails}>ticketdetails</div>
        </div>
      </div>

      <div className={classes.selectedseats}>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <button onClick={book}> book</button>
      </div>
    </div>
  );
}
