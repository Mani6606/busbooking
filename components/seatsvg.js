import React from "react";

const SSeatIcon = () => {
  return (
    <svg width="25" height="25">
      <rect
        x="0"
        y="20"
        width="20"
        height="3"
        rx="5"
        ry="5"
        style={{ fill: "white", strokeWidth: 1, stroke: "rgb(0,0,0)" }}
      />
      <rect
        x="0"
        y="8"
        width="3"
        height="15"
        rx="5"
        ry="5"
        style={{ fill: "white", strokeWidth: 1, stroke: "rgb(0,0,0)" }}
      />
      <rect
        x="18"
        y="8"
        width="3"
        height="15"
        rx="5"
        ry="5"
        style={{ fill: "white", strokeWidth: 1, stroke: "rgb(0,0,0)" }}
      />

      <line
        x1="1"
        y1="0"
        x2="20"
        y2="0"
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1="1.5"
        y1="0"
        x2="1.5"
        y2="9"
        style={{ stroke: "black", strokeWidth: 1 }}
      />
      <line
        x1="19.5"
        y1="0"
        x2="19.5"
        y2="9"
        style={{ stroke: "black", strokeWidth: 1 }}
      />
    </svg>
  );
};

export default SSeatIcon;
