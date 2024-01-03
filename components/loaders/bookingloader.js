import classes from "./bookingloader.module.css";
export default function Loader() {
  return (
    <div className={classes.typewriter}>
      <div className={classes.slide}>
        <i></i>
      </div>
      <div className={classes.paper}></div>
      <div className={classes.keyboard}></div>
    </div>
  );
}
