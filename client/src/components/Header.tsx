
import { useSelector } from "react-redux";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
 const isSideBarOpen = useSelector(
   (state: { global: { isSideBarOpen: boolean } }) => state.global.isSideBarOpen
 );
 
    return (
      <div className={`ml-10 ${isSideBarOpen === true ? "ml-32" : ""}`}>
        <h2 className="text-4xl font-bold  mb-1">{title}</h2>
        <h5 className="text-xl">{subtitle}</h5>
      </div>
    );
};

export default Header;
