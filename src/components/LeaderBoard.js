import React from "react";
import styles from "./Leaderboard.module.css";

const Leaderboard = (props) => {
  return (
    <div className={styles["leaderboard-container"]}>
      <div className={styles["leaderboard-img-container"]}>
        <img
          className={styles["leaderboard-img"]}
          src={`./CarsLogos/${props.value.split(" ").join("")}.svg`}
          alt={props.value}
        />
      </div>
      <span className={styles["leaderboard-value"]}>{props.value}</span>
      <span className={styles["leaderboard-title"]}>{props.title}</span>
    </div>
  );
};

export default Leaderboard;
