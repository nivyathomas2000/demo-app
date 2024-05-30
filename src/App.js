import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import MainSideNav from "./components/MainSideNav";
import Content from "./components/Content";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import InventoryExcelReader from "./components/InventoryExcelReader";
import Header from "./components/Header";
import InitialDataLoad from "./components/InitialDataLoad"

function App() {
  const [data, setData] = useState([]);
  const [editEnabled, setEdit] = useState(false);

  const handleEdit = (editEnabled) => {
    setEdit(editEnabled);
  };

  const onDataRead = (dataRead) => {
    localStorage.clear('appData')
   localStorage.setItem("appData", JSON.stringify(dataRead));
    setData(dataRead);
  };

  const setRoute = useMemo(() => {
    if (data != null) {
      return data.flatMap((item, index) => {
        if (item.hasOwnProperty("subMenu")) {
          return item.subMenu.map((x, i) =>
            <Route key={`${index}-${i}`} path={x.path} element={<Content
              data={data}
              item={x}
              editEnabled={editEnabled}
              onSetData={onDataRead}
            />} />
          );
        }  else {
          return (<Route key={index} path={item.path} element={<Content
            data={data}
            item={item}
            editEnabled={editEnabled}
            onSetData={onDataRead}
          />} />
          )
        }
      });
    }
    return [];
  }, [data, editEnabled]);

  return (
    <div className="row">
      <InitialDataLoad onSetData={onDataRead} />
      
      <MainSideNav
        className="col-6 col-md-2 col-lg-10"
        menuData={data}
        editEnabled={editEnabled}
      ></MainSideNav>

      <div className=" col-6 col-md-10 col-lg-10">
        <Header
          onSetData={onDataRead}
          onSetEnableEdit={handleEdit}
        ></Header>
        <Routes>
          <>{setRoute}</>
        </Routes>
      </div>
    </div>
  );
}

export default App;
