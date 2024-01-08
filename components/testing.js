import { useState, useEffect, useCallback } from "react";
import { Dialog } from "@mui/material";
import classes from "./testing.module.css";
import SeatIcon from "./svg/svg";
import SSeatIcon from "./svg/seatsvg";
import Confirm from "../components/home-seatsselection-confrimbooking/confrimbooking";
import { useRouter } from "next/router";
import Popup from "../components/loaders/popup";
import Seatsloader from "../components/loaders/seatsloader";

const SeatSelection = ({ bus, callback, callback1 }) => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState([]);
  const [nameErrors, setNameErrors] = useState({});
  const [ageErrors, setAgeErrors] = useState({});
  const [genderErrors, setGenderErrors] = useState({});
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [props, setProps] = useState({});
  const router = useRouter();

  const fetchSeatList = useCallback(async () => {
    try {
      const response = await fetch("/api/seatsbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: bus._id }),
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
  }, [bus._id]);

  useEffect(() => {
    fetchSeatList();
  }, [fetchSeatList]);

  const handleSeatClick = (seatNo) => {
    const clickedSeat = props.seats.find((seat) => seat.seatNo === seatNo);
    const selectedSeatsLength = selectedSeats.filter(Boolean).length;
    const isSeatSelected = selectedSeats.includes(seatNo);

    if (clickedSeat.booked) {
      setMsg("Seat Already Booked");
      setPopup(true);
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
          const updatedSeatDetails = [...prevSeatDetails];
          updatedSeatDetails.splice(existingDetailIndex, 1);
          return updatedSeatDetails;
        }

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
      setMsg("Maximum seats reached");
      setPopup(true);
    }
  };

  const renderSeat = (seat) => (
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
      <div className={classes.seatImageContainer}>
        {seat.category === "upper" ? (
          <SSeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
        ) : (
          <SeatIcon
            selected={selectedSeats.includes(seat.seatNo)}
            booked={seat.booked}
          />
        )}
        <span className={classes.seatNumber}>{seat.seatNo}</span>
      </div>
    </div>
  );

  const renderSeats = () => props.seats.map(renderSeat);

  const renderLegend = () => {
    const legendItems = [
      { className: classes.notbooked, text: "Not Booked" },
      { className: classes.boooked, text: "Booked" },
      { className: classes.bookedfemale, text: "Booked By Female passenger" },
      { className: classes.reserved, text: "Reserved For Female passenger" },
    ];

    return (
      <div className={classes.legend}>
        <div>
          <h3> LEGEND</h3>
        </div>
        {legendItems.map((item, index) => (
          <div key={index} className={classes.legendd}>
            <div className={item.className}></div>
            <h5>{`-${item.text}`}</h5>
          </div>
        ))}
      </div>
    );
  };

  const renderTicketDetails = () => {
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
                placeholder="Enter your name"
                onChange={(e) =>
                  handleInputChange(seatNo, "name", e.target.value)
                }
              />
              <div className={classes.error}>
                {seatDetail.name === ""
                  ? ""
                  : nameErrors[seatNo] && (
                      <p>
                        minimum of 3 characters. Should not allow numbers or any
                        special characters.
                      </p>
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
                {seatDetail.age === ""
                  ? ""
                  : ageErrors[seatNo] && <p>age should be above 5</p>}
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
                {seatDetail.gender === ""
                  ? ""
                  : genderErrors[seatNo] && <p>mandatory</p>}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleInputChange = (seatNo, field, value) => {
    const validationMap = {
      name: {
        check: value && value.length >= 3 && /^[a-zA-Z ]+$/.test(value),
        setError: () =>
          setNameErrors((prevNameErrors) => ({
            ...prevNameErrors,
            [seatNo]: false,
          })),
        errorMessage:
          "minimum of 3 characters. Should not allow numbers or any special characters.",
      },
      age: {
        check: value && value > 5,
        setError: () =>
          setAgeErrors((prevAgeErrors) => ({
            ...prevAgeErrors,
            [seatNo]: false,
          })),
        errorMessage: "age should be above 5",
      },
      gender: {
        check: value !== "",
        setError: () =>
          setGenderErrors((prevGenderErrors) => ({
            ...prevGenderErrors,
            [seatNo]: false,
          })),
        errorMessage: "mandatory",
      },
    };

    const validation = validationMap[field];

    if (validation) {
      validation.setError();

      if (!validation.check) {
        setMsg(`Invalid ${field} for seat ${seatNo}`);
        setPopup(true);
      }
    }

    const updatedDetails = seatDetails.map((detail) =>
      detail.seatNo === seatNo ? { ...detail, [field]: value } : detail
    );

    setSeatDetails(updatedDetails);
  };

  const popfun = () => setPopup(false);

  const openConfirmationDialog = () => setConfirmationDialogOpen(true);
  const closeConfirmationDialog = () => setConfirmationDialogOpen(false);

  const confrimbook = async () => {
    try {
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

        setSelectedSeats([]);
        setSeatDetails([]);
        callback();
        callback1();
      } else {
        console.log("Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const book = () => {
    const selectedSeatsLength = selectedSeats.filter(Boolean).length;

    if (selectedSeatsLength === 0) {
      setMsg("No seats selected");
      setPopup(true);
      return;
    }

    const isSeatDetailsValid = seatDetails.every((detail) => {
      const validationMap = {
        name: {
          check:
            detail.name &&
            detail.name.length >= 3 &&
            /^[a-zA-Z ]+$/.test(detail.name),
          errorMessage: `Invalid name for seat ${detail.seatNo}`,
        },
        age: {
          check: detail.age && detail.age > 5,
          errorMessage: `Invalid age for seat ${detail.seatNo}`,
        },
        gender: {
          check:
            detail.gender &&
            (detail.gender === "male" || detail.gender === "female"),
          errorMessage: `Invalid gender for seat ${detail.seatNo}`,
        },
      };

      const isValid = Object.keys(validationMap).every((field) => {
        const validation = validationMap[field];

        if (!validation.check) {
          setMsg(validation.errorMessage);
          setPopup(true);
        }

        return validation.check;
      });

      return isValid;
    });

    if (isSeatDetailsValid) {
      openConfirmationDialog();
    }
  };

  return (
    <div className={classes.busout}>
      {!props.busNo && <Seatsloader />}
      {popup && <Popup props={msg} callbackfun={popfun} />}
      <div className={classes.seatselectioncontainer}>
        <h2>Bus-{props?.busNo}</h2>
        <div className={classes.split}>
          <div className={classes.seatselect}>
            {props?.busNo && renderSeats()}
          </div>
          {renderLegend()}
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
};

export default SeatSelection;
