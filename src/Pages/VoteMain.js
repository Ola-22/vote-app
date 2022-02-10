import { useState } from "react";
import Tab from "../Components/Tabs/Tab";
import TabNav from "../Components/Tabs/TabNav";
import MostShared from "../Components/VotePublic/MostShared";
import NewShared from "../Components/VotePublic/NewShared";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

export default function VoteMain() {
  const [selected, setSelected] = useState("أحدث الإضافات");
  const navigate = useNavigate();

  const SelectTab = (tab) => {
    setSelected(tab);
  };

  return (
    <div>
      <div className="headerPage">
        <button onClick={() => navigate(-1)}>
          <img src="/images/btnBack.png" alt="" />
        </button>
        <Link to="/">
          <img className="logoHeader" src="/images/logo.png" alt="" />
        </Link>
      </div>
      <TabNav
        tabs={["أحدث الإضافات", "الأكثر مشاركة"]}
        selected={selected}
        SelectTab={SelectTab}
      >
        <>
          <Tab isSelected={selected === "أحدث الإضافات"}>
            <NewShared />
          </Tab>
        </>

        <>
          <Tab isSelected={selected === "الأكثر مشاركة"}>
            <MostShared />
          </Tab>
        </>
      </TabNav>
    </div>
  );
}
