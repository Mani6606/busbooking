import classes from "./seatsloader.module.css";

export default function Seatsloader() {
  return (
    <div className={`${classes.spinner} ${classes.center}`}>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
      <div className={classes.blade}></div>
    </div>
  );
}
