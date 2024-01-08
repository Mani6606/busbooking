import classes from "./success.module.css";

export default function Success({ props }) {
  return (
    <div className={classes.terminalloader}>
      <div className={classes.text}>{props}</div>
    </div>
  );
}
