import React, { useEffect, useState } from "react";
import classes from "./homepage.module.css";
import moment from "moment";

export default function Homepage() {
  const [buslist, setBuslist] = useState([]);
  const [showSeats, setShowSeats] = useState(false);

  useEffect(() => {
    // Fetch bus list when the component mounts
    GetBuslist();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleViewSeatsClick = () => {
    setShowSeats(!showSeats);
  };

  function GetBuslist() {
    fetch("api/buslist", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching bus list");
        }
      })
      .then((data) => {
        // Update the buslist state with the fetched data
        setBuslist(data);
      })
      .catch((error) => {
        console.error("Error fetching bus list:", error);
      });
  }

  return (
    <div className={classes.layout}>
      <center>
        <h1>Bus List</h1>
      </center>

      {buslist.map((bus) => (
        <li key={bus.id} className={classes.buses}>
          <div className={classes.smalldiv}>
            <div className={classes.smallone}>
              <h3>FROM </h3>
              <h3> : </h3>
              <h3>{bus.From}</h3>
            </div>

            <div className={classes.smallone}>
              <h3>Departure</h3>
              <h3> : </h3>
              <h3>{bus.Start}</h3>
            </div>
          </div>

          <div>
            <button onClick={handleViewSeatsClick}>View Seats</button>
            {showSeats && (
              <div>
                <h2>Seats</h2>
                <ul>
                  {bus.Seats.map((seat) => (
                    <li key={seat.id}>{seat.number}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={classes.smalldiv}>
            <div className={classes.smallone}>
              <h3>TO</h3>
              <h3> : </h3>
              <h3>{bus.To}</h3>
            </div>
            <div className={classes.smallone}>
              <h3>Arrival</h3>
              <h3> : </h3>
              <h3>{bus.End}</h3>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
