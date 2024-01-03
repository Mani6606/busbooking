// SeatIcon.js
import React from "react";

const SeatIcon = ({ selected, booked }) => {
  const seatStyle = {
    fill: selected ? "blue" : booked ? "gray" : "pink",
    cursor: "pointer", // Add cursor pointer for clickable seats
  };

  return (
    <svg width="38" height="73">
      <rect
        x="0"
        y="0"
        width="35"
        height="70"
        rx="8"
        ry="8"
        style={{
          fill: seatStyle.fill,
          stroke: "green",
          strokeWidth: 2,
          fillOpacity: 0.1,
          strokeOpacity: 0.9,
        }}
      />

      <rect
        x="5"
        y="55"
        width="27"
        height="7"
        rx="5"
        ry="5"
        style={{
          fill: seatStyle.fill,
          stroke: "green",
          strokeWidth: 1.5,
          fillOpacity: 0.1,
          strokeOpacity: 0.9,
        }}
      />
    </svg>
  );
};

export default SeatIcon;
