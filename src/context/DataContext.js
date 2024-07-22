import { ConfigProvider, theme } from "antd";
import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const location = useLocation();
  const [status, setStatus] = useState(1); // Default to 'In Progress'
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    const getStatusFromPath = (path) => {
      switch (path) {
        case "/complete":
          return 2;
        case "/delete":
          return 0;
        default:
          return 1;
      }
    };
    setStatus(getStatusFromPath(location.pathname));
  }, [location.pathname]);

  const getData = async (status) => {
    try {
      let apiRes = await fetch(
        `http://139.59.47.49:4004/api/tasks?limit=50&start=1&status=${status}`
      );
      let apidata = await apiRes.json();
      setData(apidata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(status);
  }, [status]);

  return (
    <DataContext.Provider
      value={{ location, status, data, setStatus, getData }}
    >
      <ConfigProvider
        theme={{
          token: {
            fontFamily:'EB Garamond'
          },
          components: {
            Layout: {
              headerBg: "	#B6C9FF",
              headerColor: "#000",
              borderRadius: theme.useToken().borderRadiusLG,
              bodyBg: "#fff",
            },
            Button: {
              colorPrimary:"	#7483BB",
              colorPrimaryHover:"	#424A6A"
            },
            Segmented:{
              trackBg:"	#D7DBEB",
              itemSelectedBg:"#F7F7FA",
              itemHoverColor:"	#8F98BB"
            },
            Card:{
              headerBg:'#f0f0f9',
              colorBgContainer:"#fff",
            },
            Pagination:{
              itemActiveBg:'#ffffff',
            },
            
          },
        }}
      >
        {children}
      </ConfigProvider>
    </DataContext.Provider>
  );
};
