import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getCurrency} from "../../services/functions";
import style from "./currency.module.scss";
import { FC } from "react";
import Spiner from "../../components/Spiner/Spiner";

const Currency = () => {
    const { data, baseCurrency } = useAppSelector(
        (state) => state.currencyReducer
      );
      const ShowValue = [];
      for (let dataKey in data) {
        ShowValue.push(
          <OneCurrentcy dataKey={dataKey} data={data[dataKey]} baseCurrency={baseCurrency} />
        );
      }
    
      if (data) {
        return <div className={style.container}>{ShowValue}</div>;
      } else return null;
};

export default Currency;


const OneCurrentcy: FC<{ dataKey: string; data: number; baseCurrency: string }> = ({
    dataKey,
  data,
  baseCurrency,
}) => {
  const dispatch = useAppDispatch();
  const req = {
    additionalUrl: dataKey,
  };
    if (data !=0)
  return (
    <div className={style.OneCurrentcy}>
      <button onClick={() => dispatch(getCurrency(req))}><h1>{dataKey}</h1></button>
      <div className={style.detailedCurrency}>
        <h2>
          1 {dataKey} = {(1 / data).toFixed(4)} {baseCurrency}
        </h2>
        <h4>
          1 {baseCurrency} = {data} {dataKey}
        </h4>
      </div>
    </div>
  );
  else return null
};
