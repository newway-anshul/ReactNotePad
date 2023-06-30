import { useState } from "react";
import Doc from "../doc/doc";
import SaveIconBlue from "../../assets/save-svgrepo-blue.svg";
import SaveIconRed from "../../assets/save-svgrepo-red.svg";
import CloseSvg from "../../assets/closeSvg.svg";
import "./tabs.scss";

// Define the type/interface for TabData
interface TabData {
  tabId: number;
  tabName: string;
  isSaved: boolean;
  isActive: boolean;
}

export default function Tabs() {
  // Declare state variable 'tabs' using useState
  const [tabs, setTabs] = useState<TabData[]>([
    {
      tabId: 1,
      tabName: "doc 1",
      isActive: true,
      isSaved: true,
    },
    {
      tabId: 2,
      tabName: "doc 2",
      isActive: false,
      isSaved: false,
    },
  ]);

  const tabClicked = (clickedTab: TabData, e:any) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.tabId === clickedTab.tabId) {
        return { ...tab, isActive: true };
      } else {
        return { ...tab, isActive: false };
      }
    });
    setTabs(updatedTabs);
    e.stopPropagation();
  };
  const addTab = () => {
    let updatedTab = tabs.map((tab) => {
      return { ...tab, isActive: false };
    });
    const newTabId = Math.max(...updatedTab.map((tab)=>tab.tabId))+1
    updatedTab.push({
      isActive: true,
      tabId: newTabId,
      tabName: `doc ${newTabId}`,
      isSaved: true,
    });
    setTabs(updatedTab);
  };
  const closeTab = (tabId: number, e: any) => {
    e.stopPropagation();
    const updatedTabs = tabs.filter((tab) => tab.tabId !== tabId);
    if(updatedTabs.length==0){
       updatedTabs.push({
        tabId:1,
        isActive:true,
        isSaved:true,
        tabName:'doc 1'
       })
    }
    else{
    updatedTabs[updatedTabs.length-1].isActive=true
    }
    setTabs(updatedTabs);
  };
  const Tab = (tab: TabData) => {
    return (
      <div
        className={`tab tab-${tab.tabId} ${tab.isActive ? "activeTab" : ""}`}
        title={tab.tabName}
        onClick={(e) => tabClicked(tab, e)}
      >
        <img
          className="tabStatus"
          src={tab.isSaved ? SaveIconBlue : SaveIconRed}
        ></img>
        <div className="tabName">{tab.tabName}</div>
        <img
          className="closeTab"
          src={CloseSvg}
          onClick={(e) => {
            closeTab(tab.tabId, e);
          }}
        ></img>
      </div>
    );
  };

  return (
    <div className="appTabs">
      <div
        className="tabs"
        onDoubleClick={() => {
          addTab();
        }}
      >
        {tabs.map((tab: TabData) => {
          return <Tab key={tab.tabId} {...tab} />;
        })}
      </div>
      <Doc />
    </div>
  );
}
