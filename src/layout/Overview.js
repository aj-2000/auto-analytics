import React, { useEffect, useState } from "react";
import { BASE_URL } from "../consts/urls";
import Leaderboard from "../components/LeaderBoard";
import styles from "./Overview.module.css";
import Sales from "../components/Sales";

const Overview = (props) => {
  const [salesData, setSalesData] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    async function getOverviewData() {
      const apiUrl = `${BASE_URL}/overview/`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const obj = JSON.parse(data);
      setLeaders({
        topBrandYear: obj.top_brand_of_year,
        topBrandMonth: obj.top_brand_of_month,
      });
      setSalesData(JSON.parse(obj.sales));
      setIsLoaded(true);
    }
    getOverviewData();
  }, []);
  // fetch(`http://127.0.0.1:8000/overview/`)
  // .then(res => res.json())
  // .then(result => {
  //     setLeaders({
  //         'topBrandYear': result.top_brand_of_year,
  //         'topBrandMonth': result.top_brand_of_month,
  //     });
  //     // setSalesData(JSON.parse(result.sales))
  //     console.log(JSON.parse(result.sales))
  //     setIsLoaded(true);
  // },
  // (error) => {
  //     console.log(error);
  //     setIsLoaded(true);
  //     setError(error);
  // });
  // }, []);

  if (!isLoaded) {
    return <div className={styles["overview-loading"]}>Loading...</div>;
  }
  return (
    <div className={styles["overview-section"]}>
      <Sales
        title="Sold this year"
        currentValue={salesData["2022"]}
        previousValue={salesData["2021"]}
      />
      <Sales
        title="Sold this month"
        currentValue={salesData["May_2022"]}
        previousValue={salesData["April_2022"]}
      />
      <Leaderboard title="Top Brand this year" value={leaders.topBrandYear} />
      <Leaderboard title="Top Brand this month" value={leaders.topBrandMonth} />
    </div>
  );
};

export default Overview;
