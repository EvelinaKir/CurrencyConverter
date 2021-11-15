import React, { FC } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import style from "./app.module.scss";
import Header from "../Header/Header";
import Conventer from "../../pages/Conventer/Conventer";
import Currency from "../../pages/Currency/Currency";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getCurrency } from "../../services/functions";
import Spiner from "../../components/Spiner/Spiner";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const languageRu =
    window.navigator && window.navigator.language.includes("ru");
  const { data, loading } = useAppSelector((state) => state.currencyReducer);
  useEffect(() => {
    dispatch(getCurrency(req));
  }, []);

  const req = {
    additionalUrl: `${languageRu ? "RUB" : "USD"}`,
  };

  return (
    <div className={style.container}>
      <Header />
      {loading === "pending" && <Spiner />}
      {loading === "succeeded" && data && (
        <Routes>
          <Route path="/" element={<Conventer />} />
          <Route path="/currency" element={<Currency />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
