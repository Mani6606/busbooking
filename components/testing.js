import { useState,useEffect } from 'react';
import Image from 'next/image'
import classes from './seatselect.module.css'; // Import your CSS file
import SeatIcon from './svg';
import { FaChair } from 'react-icons/fa';
export default function SeatSelection() {
  
  const [seatData, setSeatData] = useState([]);
// --------------------------code to fetch the seat details initially-------------------------------
  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await fetch("/api/seatsbooking");
        
        if (!response.ok) {
          throw new Error(`Error fetching seat data: `);
        }

        const data = await response.json();
        // console.log(data)
        console.log("requested data",data[0].seatData)
        setSeatData(data[0].seatData);
        console.log("aaaaaaaaa",seatData);
         // Clear any previous errors
      } catch (error) {
        console.error("Error fetching seat data:");
        
      }
    };

    fetchSeatData();
  }, []);
// --------------------------------------------------------------------------------------------------------------------
// ---------------------this is code to generate the seats structures and add to db manully first time----------------------------------
  // let seatno = 0;
  // const sleeperSeatsCount = 5;
  // const seaterSeatsCount = 20;

  // const [seatData, setSeatData] = useState(() => {
  //   const sleeperSeatslb = Array.from({ length: sleeperSeatsCount }, (_, index) => ({
  //     seatNo: index + 1,
  //     price: 50, // Adjust the price as needed
  //     booked: false,
  //        name:'',
  //        gender:'',
  //        age:'',
  //        berth:"lower",
  //   }));

  //   const seaterSeatslb = Array.from({ length: seaterSeatsCount }, (_, index) => ({
  //     seatNo: index + 1 + sleeperSeatsCount,
  //     price: 30, // Adjust the price as needed
  //     booked: false,
  //  name:'',
  //        gender:'',
  //        age:'',
  //        berth:"lower",
  //   }));
  
  //   const sleeperSeatsub = Array.from({ length: 15 }, (_, index) => ({
  //     seatNo: index + 26,
  //     price: 50, // Adjust the price as needed
  //     booked: false,
  //        name:'',
  //        gender:'',
  //        age:'',
  //        berth:"lower",
  //   }));
  //   return [...sleeperSeatslb, ...seaterSeatslb,...sleeperSeatsub];
  // });

//  ------------------------------------------------------------------------------------------------------- 
// ----------code to add the selected seats to an array to send server side----------------------------
  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSeatClick = (seatNo) => {
    const clickedSeat = seatData.find((seat) => seat.seatNo === seatNo);

    if (clickedSeat && !clickedSeat.booked) {
      setSelectedSeats((prevSelectedSeats) => {
        const isSeatSelected = prevSelectedSeats.includes(seatNo);
        return isSeatSelected
          ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatNo)
          : [...prevSelectedSeats, seatNo];
      });
    }
  };
//  ===================================================================================================
  const renderSeats = () => {
    const firstFiveSeats = seatData.slice(0, 5).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeat}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ''}
        ${seat.booked ? classes.booked : ''}
          
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
          <SeatIcon selected={selectedSeats.includes(seat.seatNo)} booked={seat.booked} />
        {/* <p>|_ {seat.seatNo} - ${seat.price}_|</p> */}
      </div>
    ));

    const remainingSeats1 = seatData.slice(5, 15).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
          ${classes.seat} 
          ${selectedSeats.includes(seat.seatNo) ? classes.selected : ''}
          ${seat.booked ? classes.booked : ''}
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
      

        {/* <p>|_ {seat.seatNo} - ${seat.price}_|</p> */}
        <Image src='/seat.png' height={20} width={20} alt={`Seat ${seat.seatNo}`} />
      </div>
    ));

    const remainingSeats2 = seatData.slice(15,25).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
          ${classes.seat} 
          ${selectedSeats.includes(seat.seatNo) ? classes.selected : ''}
          ${seat.booked ? classes.booked : ''}
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        <p>|_ {seat.seatNo} - ${seat.price}_|</p>
      </div>
    ));
    const upper1 = seatData.slice(25,30).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeatub1}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ''}
        ${seat.booked ? classes.booked : ''}
          
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        <p>|_ {seat.seatNo} - ${seat.price}_|</p>
      </div>
    ));
    const upper2 = seatData.slice(30,35).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeatub}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ''}
        ${seat.booked ? classes.booked : ''}
          
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        <p>|_ {seat.seatNo} - ${seat.price}_|</p>
      </div>
    ));
    const upper3 = seatData.slice(35,40).map((seat) => (
      <div
        key={seat.seatNo}
        className={`
        ${classes.firstSeatub}
        ${selectedSeats.includes(seat.seatNo) ? classes.selected : ''}
        ${seat.booked ? classes.booked : ''}
          
        `}
        onClick={() => handleSeatClick(seat.seatNo)}
      >
        <p>|_ {seat.seatNo} - ${seat.price}_|</p>
      </div>
    ));
    return (
      <div className={classes.seatgrid}>
        <div className={classes.layoutlb}>
          <div className={classes.seatcolumn}>{firstFiveSeats}</div>
          <div className={classes.seatcolumn}>{remainingSeats1}</div>
          <div className={classes.seatcolumn}>{remainingSeats2}</div>
          
        </div>
        <div  className={classes.layoutub}>
        <div className={classes.seatcolumn}>{upper1}</div>
        <div className={classes.seatcolumn}>{upper2}</div>
        <div className={classes.seatcolumn}>{upper3}</div>

        </div>
      </div>
    );
  };
// ------------------------------------------------------------------------------------------------------------
 
// -------------code to send the selected seats to server----------------------------------------------------------------
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
        body: JSON.stringify({selectedSeats}),
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

  return (
    <div className={classes.busout}>
      <div className={classes.seatselectioncontainer}>
        <h2>Bus Seat Selection</h2>
        {/* ------------------------------------------------------------------- */}
        {renderSeats()}
        {/* ------------------------------------------------------------------- */}
      </div>

      <div className={classes.selectedseats}>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <button onClick={book}> book</button>
      </div>
    </div>
  );
};
