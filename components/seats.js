import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import classes from "./seats.module.css";
import SeatIcon from "./svg";
import SSeatIcon from "./seatsvg";
import Confirm from "./confrimbooking";
import { useRouter } from "next/router";
export default function SeatSelection({ bus, callback }) {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState([]);
  // const [nameerror, setNameerror] = useState(false);
  // const [ageerror, setAgeerror] = useState(false);
  // const [gendererror, setGendererror] = useState(false);
  const [nameErrors, setNameErrors] = useState({});
  const [ageErrors, setAgeErrors] = useState({});

  const [genderErrors, setGenderErrors] = useState({});
  // ==========================================INTIAL FETCHING THE SEATS=======================================================================
  const [props, setProps] = useState({});
  const router = useRouter;
  const fetchSeatList = async () => {
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
      } else {
        console.error("Failed to fetch seat data");
      }
    } catch (error) {
      console.error("Error fetching seat data:", error);
    }
  };

  // Call the fetchSeatList function when the component mounts
  useEffect(() => {
    // This effect will run once when the component mounts
    fetchSeatList();
  }, []);

  // =========================================================================================================================================
  const handleSeatClick = (seatNo) => {
    console.log("props", props);
    const clickedSeat = props.seats.find((seat) => seat.seatNo === seatNo);
    console.log(clickedSeat);
    const selectedSeatsLength =
      Object.values(selectedSeats).filter(Boolean).length;
    const isSeatSelected = selectedSeats.includes(seatNo);

    if (clickedSeat.booked) {
      alert("Seat Already Booked");
      return;
    }

    if (
      clickedSeat &&
      !clickedSeat.booked &&
      (selectedSeatsLength < 5 || isSeatSelected)
    ) {
      setSelectedSeats((prevSelectedSeats) => {
        const isSeatSelected = prevSelectedSeats.includes(seatNo);
        return isSeatSelected
          ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatNo)
          : [...prevSelectedSeats, seatNo];
      });

      setSeatDetails((prevSeatDetails) => {
        const existingDetailIndex = prevSeatDetails.findIndex(
          (detail) => detail.seatNo === seatNo
        );

        if (existingDetailIndex !== -1) {
          // If details exist, remove the existing detail
          const updatedSeatDetails = [...prevSeatDetails];
          updatedSeatDetails.splice(existingDetailIndex, 1);
          return updatedSeatDetails;
        }

        // Add a new empty object for the selected seat
        return [...prevSeatDetails, { seatNo, name: "", age: "", gender: "" }];
      });

      setNameErrors((prevNameErrors) => ({
        ...prevNameErrors,
        [seatNo]: false,
      }));
      setAgeErrors((prevAgeErrors) => ({ ...prevAgeErrors, [seatNo]: false }));
      setGenderErrors((prevGenderErrors) => ({
        ...prevGenderErrors,
        [seatNo]: false,
      }));
    } else {
      alert("Maximum seats reached");
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
  // ================================SEAT LAYOUT END ==========================================================================================
  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };
  // ==================================== POST REQUEST TO API=================================================================================
  async function confrimbook() {
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
        callback();
        // closeConfirmationDialog();
      } else {
        console.log("Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function book() {
    console.log("selectedSeats and seatDEtails", selectedSeats, seatDetails);
    const selectedSeatsLength =
      Object.values(selectedSeats).filter(Boolean).length;
    if (selectedSeatsLength === 0) {
      alert("no seats selected");
      return;
    }
    // Validate seat details
    const isSeatDetailsValid = seatDetails.every((detail) => {
      const isValidName =
        detail.name &&
        detail.name.length >= 3 &&
        /^[a-zA-Z ]+$/.test(detail.name);
      const isValidAge = detail.age && detail.age > 5;
      const isValidGender =
        detail.gender &&
        (detail.gender === "male" || detail.gender === "female");

      // Log specific errors for each seat
      if (!isValidName) {
        alert(`Invalid name for seat ${detail.seatNo}`);
        return;
      }
      if (!isValidAge) {
        alert(`Invalid age for seat ${detail.seatNo}`);
        return;
      }
      if (!isValidGender) {
        alert(`Invalid gender for seat ${detail.seatNo}`);
        return;
      }

      return isValidName && isValidAge && isValidGender;
    });

    // if (!isSeatDetailsValid) {
    //   alert("Please correct the errors in the seat details.");
    //   return;
    // }
    if (isSeatDetailsValid) {
      openConfirmationDialog();
    } else {
      alert("check the seat details");
    }
  }
  // =========================================================================================================================================

  // ====================================================TICKET DETAILS======================================================================

  const renderTicketDetails = () => {
    console.log(selectedSeats);
    return selectedSeats.map((seatNo) => {
      const seatDetail = seatDetails.find((detail) => detail.seatNo === seatNo);
      const isSeatReservedForFemale = props.seats.find(
        (seat) => seat.seatNo === seatNo
      )?.reserved;

      return (
        <div key={seatNo} className={classes.ticketDetail}>
          <div>
            <h3>{`Seat ${seatNo}`}</h3>
          </div>
          <div className={classes.smalldetail}>
            <label>Name:</label>

            <div className={classes.errordetails}>
              <input
                type="text"
                value={seatDetail?.name || ""}
                // seatDetail.name === "" ? "required" :
                placeholder="Enter your name"
                onChange={(e) =>
                  handleInputChange(seatNo, "name", e.target.value)
                }
              />
              <div className={classes.error}>
                {seatDetail.name === "" ? (
                  <p>*required</p>
                ) : (
                  nameErrors[seatNo] && (
                    <p>
                      minimum of 3 characters. Should not allow numbers or any
                      special characters.
                    </p>
                  )
                )}
              </div>
            </div>

            <label>Age:</label>
            <div className={classes.errordetails}>
              <input
                type="number"
                placeholder="Enter your age"
                value={seatDetail?.age || ""}
                onChange={(e) =>
                  handleInputChange(seatNo, "age", e.target.value)
                }
              />
              <div className={classes.error}>
                {seatDetail.age === "" ? (
                  <p>*required</p>
                ) : (
                  ageErrors[seatNo] && <p>age should be above 5</p>
                )}
              </div>
            </div>

            <label>Gender:</label>
            <div className={classes.errordetails}>
              {isSeatReservedForFemale ? (
                <select
                  value={seatDetail?.gender || ""}
                  onChange={(e) =>
                    handleInputChange(seatNo, "gender", e.target.value)
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <select
                  value={seatDetail?.gender || ""}
                  onChange={(e) =>
                    handleInputChange(seatNo, "gender", e.target.value)
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
              <div className={classes.error}>
                {seatDetail.gender === "" ? (
                  <p>*required</p>
                ) : (
                  genderErrors[seatNo] && <p>mandatory</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleInputChange = (seatNo, field, value) => {
    if (field === "name") {
      if (value && value.length > 3 && !!/^[a-zA-Z ]+$/.test(value)) {
        // console.log("name satisfying the above criteria");
        setNameErrors((prevNameErrors) => ({
          ...prevNameErrors,
          [seatNo]: false,
        }));
      } else {
        // console.error(
        //   "Name is mandatory and should be at least 3 characters long."
        // );
        setNameErrors((prevNameErrors) => ({
          ...prevNameErrors,
          [seatNo]: true,
        }));
      }
    } else if (field === "age") {
      if (value && value > 5) {
        // console.log("age satisfying the above criteria");
        setAgeErrors((prevAgeErrors) => ({
          ...prevAgeErrors,
          [seatNo]: false,
        }));
      } else {
        // console.error(
        //   "age is mandatory and should be at greater than 5 characters long."
        // );
        setAgeErrors((prevAgeErrors) => ({ ...prevAgeErrors, [seatNo]: true }));
      }
    } else {
      if (!value) {
        // console.error("gender is mandatory");
        setGenderErrors((prevGenderErrors) => ({
          ...prevGenderErrors,
          [seatNo]: true,
        }));
      } else {
        setGenderErrors((prevGenderErrors) => ({
          ...prevGenderErrors,
          [seatNo]: false,
        }));
      }
    }
    const updatedDetails = seatDetails.map((detail) =>
      detail.seatNo === seatNo ? { ...detail, [field]: value } : detail
    );
    setSeatDetails(updatedDetails);
  };

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
          <div className={classes.ticketdetails}>
            <div className={classes.tk}>
              <h3>Ticket Details</h3>
            </div>
            {renderTicketDetails()}
          </div>
        </div>
        <div className={classes.selectedseats}>
          <button onClick={book}>Book</button>
          <Dialog
            open={isConfirmationDialogOpen}
            onClose={closeConfirmationDialog}
            maxWidth="lg"
          >
            {isConfirmationDialogOpen && (
              <Confirm
                props={props}
                selectedSeats={selectedSeats}
                seatDetails={seatDetails}
                onConfirm={confrimbook}
              />
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
}
