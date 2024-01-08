import { useState, useEffect } from "react";
import classes from "./seatsselection.module.css";
import SeatIcon from "../svg/svg";
import SSeatIcon from "../svg/seatsvg";
export default function SeatsSelection({ props }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const renderSeats = () => {
    // =========================================1==================================================================================================
    const firstFiveSeats = props.seats.slice(0, 5).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
    ${classes.firstSeat}
    ${selectedSeats.includes(seat.seatNo) ? classes.selected : ""}
    ${seat.booked ? classes.booked : ""}
    ${seat.booked && seat.gender === "female" ? classes.femalebooked : ""}
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
    ${seat.gender === "female" && seat.booked ? classes.femalebooked : ""}
    ${!seat.booked && seat.reserved ? classes.femalereserved : ""}
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
          ${seat.booked && seat.gender === "female" ? classes.femalebooked : ""}
          ${!seat.booked && seat.reserved ? classes.femalereserved : ""}
          
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
      ${seat.booked && seat.gender === "female" ? classes.femalebooked : ""}
      
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
      ${seat.booked && seat.gender === "female" ? classes.femalebooked : ""}
      ${!seat.booked && seat.reserved ? classes.femalereserved : ""}
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
      ${seat.booked && seat.gender === "female" ? classes.femalebooked : ""}
      ${!seat.booked && seat.reserved ? classes.femalereserved : ""}
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
          <h3>LOWER DECK</h3>
          <h3>UPPER DECK</h3>
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
  useEffect(() => {
    if (props?.busno) {
      renderSeats();
    }
    // setTimeout(() => {
    //   renderSeats();
    // }, 2000);
  }, [props]);

  return renderSeats();
}
