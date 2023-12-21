import { useState, useEffect } from "react";

import classes from "./testing.module.css";
import SeatIcon from "./svg";
import SSeatIcon from "./seatsvg";

// =========================================PASSENGER COMPONENT============================================================================

// ============================================================================================================================================

export default function SeatSelection({ bus }) {
  console.log(
    "bus=============================================================",
    bus
  );
  // ----------code to add the selected seats to an array to send server side----------------------------
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState([]);
  // ==========================================INTIAL FETCHING THE SEATS=======================================================================
  const [props, setProps] = useState({});
  const [busdetails, setBusdetails] = useState([]);

  const fetchSeatList = async () => {
    console.log("for fetchlist================");
    try {
      const response = await fetch("/api/seatsbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: bus._id }), // Sending busId in the request body
      });

      if (response.ok) {
        const data = await response.json();
        setProps(data.formData);
        setBusdetails(data.formData.seats);
        console.log("fromdata we get", data.formData.seats);
        console.log("data from the backend", props);
        console.log("data from the busdetails stste", busdetails); // Assuming the API response is an array of seat data
      } else {
        console.error("Failed to fetch seat data");
      }
    } catch (error) {
      console.error("Error fetching seat data:", error);
    }
  };

  // Call the fetchSeatList function when the component mounts
  useEffect(() => {
    console.log("1");
    // This effect will run once when the component mounts
    fetchSeatList();
  }, []);

  // =========================================================================================================================================
  const handleSeatClick = (seatNo) => {
    console.log();
    const clickedSeat = props.seats.find((seat) => seat.seatNo === seatNo);
    const selectedSeatsLength =
      Object.values(selectedSeats).filter(Boolean).length;
    console.log(selectedSeatsLength);
    if (clickedSeat && !clickedSeat.booked && selectedSeatsLength < 5) {
      setSelectedSeats((prevSelectedSeats) => {
        const isSeatSelected = prevSelectedSeats.includes(seatNo);
        return isSeatSelected
          ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatNo)
          : [...prevSelectedSeats, seatNo];
      });
      setSeatDetails((prevSeatDetails) => {
        const existingDetail = prevSeatDetails.find(
          (detail) => detail.seatNo === seatNo
        );

        if (existingDetail) {
          // If details exist, don't add new empty object
          return prevSeatDetails;
        }

        // Add a new empty object for the selected seat
        return [...prevSeatDetails, { seatNo, name: "", age: "", gender: "" }];
      });
      console.log(seatDetails);
    } else {
      alert("maximun reached");
    }
  };

  //  ===============================SEAT LAYOUT START==============================================================================================

  const renderSeats = () => {
    console.log("testing at  sclice ", props.seats);
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
  useEffect(() => {
    console.log(
      "1111111111111111111111111111111111111111111111111111111111112",
      props
    );
    if (props?.busno) {
      renderSeats();
    }
    // setTimeout(() => {
    //   renderSeats();
    // }, 2000);
  }, [props]);
  // ================================SEAT LAYOUT END ==========================================================================================

  // ==================================== POST REQUEST TO API=================================================================================
  async function book() {
    // Your booking logic here using selectedSeats array
    console.log("Selected Seats:", selectedSeats);

    try {
      // Send a POST request to your server to update the database
      const response = await fetch("/api/buslist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          busNo: props.busNo,
          selectedSeats,
          seatDetails,
        }),
      });

      if (response.ok) {
        console.log("Booking successful");

        // Clear selected seats after booking
        setSelectedSeats([]);
        setSeatDetails([]);
      } else {
        console.log("Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // =========================================================================================================================================

  // ====================================================TICKET DETAILS======================================================================

  const renderTicketDetails = () => {
    return selectedSeats.map((seatNo) => (
      <div key={seatNo} className={classes.ticketDetail}>
        <h3>{`Seat ${seatNo}`}</h3>
        <label>Name:</label>
        <input
          type="text"
          value={
            seatDetails.find((detail) => detail.seatNo === seatNo)?.name || ""
          }
          onChange={(e) => handleInputChange(seatNo, "name", e.target.value)}
        />
        <label>Age:</label>
        <input
          type="text"
          value={
            seatDetails.find((detail) => detail.seatNo === seatNo)?.age || ""
          }
          onChange={(e) => handleInputChange(seatNo, "age", e.target.value)}
        />
        <label>Gender:</label>
        <input
          type="text"
          value={
            seatDetails.find((detail) => detail.seatNo === seatNo)?.gender || ""
          }
          onChange={(e) => handleInputChange(seatNo, "gender", e.target.value)}
        />
      </div>
    ));
  };

  const handleInputChange = (seatNo, field, value) => {
    const updatedDetails = seatDetails.map((detail) =>
      detail.seatNo === seatNo ? { ...detail, [field]: value } : detail
    );

    setSeatDetails(updatedDetails);
  };

  const handleSubmit = () => {};

  // ==========================================================================================================================================
  return (
    <div className={classes.busout}>
      <div className={classes.seatselectioncontainer}>
        <h2>Bus-{props?.busNo}</h2> {/* Use optional chaining here */}
        <div className={classes.split}>
          <div className={classes.seatselect}>
            {props?.busNo && renderSeats()}
          </div>
          <div className={classes.legend}>
            <div>
              <h3> LEGEND</h3>
            </div>
            <div className={classes.legendd}>
              <div className={classes.notbooked}></div>
              <h5>-Not Booked</h5>
            </div>
            <div className={classes.legendd}>
              <div className={classes.boooked}></div>
              <h5>-Booked</h5>
            </div>
            <div className={classes.legendd}>
              <div className={classes.bookedfemale}></div>
              <h5>-Booked By Female passenger</h5>
            </div>
            <div className={classes.legendd}>
              <div className={classes.reserved}></div>
              <h5>-Reserved For Female passenger</h5>
            </div>
          </div>
          <div className={classes.ticketdetails}>{renderTicketDetails()}</div>
        </div>
      </div>

      <div className={classes.selectedseats}>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <button onClick={book}>Book</button>
      </div>
    </div>
  );
}
