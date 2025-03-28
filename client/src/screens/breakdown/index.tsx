import React from 'react'
import Header from '../../components/Header'

import BreakdownChart from "../../components/BreakdownChart";
export default function Breakdown() {
  return (
    <div className="ml-10">
      <Header title={"Breakdown"} subtitle={"statistics of total sales"} />
      <div >
        <BreakdownChart />
      </div>
    </div>
  );
}
