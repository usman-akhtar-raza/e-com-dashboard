import { useState } from "react";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import { useSelector } from "react-redux";

function Overview() {
    const mode =useSelector(
        (state:{global:{mode:string}})=>state.global.mode
    )
  const [view, setView] = useState<"sales" | "units">("units");
  return (
    <div className="ml-10 mt-10">
      <Header
        title={"Overview"}
        subtitle={"overview of general revenue and profit"}
      />

      <div className="max-h-screen">
        <div className="flex flex-col w-25">
          <label htmlFor="view">View</label>
          <select
            id="view"
            value={view}
            onChange={(e) => setView(e.target.value as "sales" | "units")}
            className=""
          >
            <option
              className={`${
                mode === "dark" ? "bg-primary-400 text-white" : ""
              }`}
              value="sales"
            >
              Sales
            </option>
            <option className={`${
                mode === "dark" ? "bg-primary-400 text-white" : ""
              }`} 
              value="units">Units</option>
          </select>
        </div>
        <OverviewChart 
        view ={view}/>
      </div>
    </div>
  );
}

export default Overview;
