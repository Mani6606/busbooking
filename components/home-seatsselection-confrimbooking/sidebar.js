import classes from "./sidebar.module.css";
import { useState } from "react";

export default function Sidebar() {
  const [bar, setBar] = useState(false);

  const barhandler = () => {
    setBar((preBar) => !preBar);
  };

  return (
    <>
      <input type="checkbox" id="sidebarCheckbox" />
      <label htmlFor="sidebarCheckbox" className={classes.toggle}>
        <div className={classes.bars} id="bar1"></div>
        <div className={classes.bars} id="bar2"></div>
        <div className={classes.bars} id="bar3"></div>
      </label>
      {bar && (
        <div className={classes.sidebar}>
          <input type="checkbox" id="sidebarCheckbox" />
          <label htmlFor="sidebarCheckbox" className={classes.toggle}>
            <div className={classes.bars} id="bar1"></div>
            <div className={classes.bars} id="bar2"></div>
            <div className={classes.bars} id="bar3"></div>
          </label>
        </div>
      )}
    </>
  );
}
