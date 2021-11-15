import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import style from "./conventer.module.scss";
import { convertValue } from "../../services/functions";
import { getConvert, countValue } from "../../services/functions";
import { currencySlice } from "../../services/reducers/mainReducers";

const Conventer = () => {
  const languageRu =
    window.navigator && window.navigator.language.includes("ru");

  const dispatch = useAppDispatch();
  const [convert, setConvert] = useState<string>("");
  const { data, conventer, dataToConvert } = useAppSelector(
    (state) => state.currencyReducer
  );
  const writeData = currencySlice.actions.setDataToConvert;
  const [valueToShow, setValueToShow] = useState<null | number | string>(null);
  const submitHadler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(writeData(convertValue(data, convert)));
  };

  useEffect(() => {
    if (dataToConvert && dataToConvert.error) {
      setValueToShow(null);
    }
    if (dataToConvert && dataToConvert.howMany) {
      dispatch(getConvert(dataToConvert.from));
    }
  }, [dataToConvert]);

  useEffect(() => {
    if (conventer && dataToConvert) {
      setValueToShow(countValue(conventer, dataToConvert));
    }
  }, [conventer]);

  return (
    <div className={style.container}>
      <form onSubmit={submitHadler}>
        <div className={style.resultContainer}>
          {valueToShow && <h4>{valueToShow}</h4>}
          {dataToConvert && dataToConvert.error && (
            <h4 className={style.wrongRequest}>
              {languageRu ? "Упс, запрос не верный" : "Ops, wroong request"}
            </h4>
          )}
        </div>

        <input
          placeholder={languageRu ? "Введите запрос" : "write your request"}
          type="text"
          value={convert}
          onChange={(e) => setConvert(e.target.value)}
        />
        <button>{languageRu ? "Конвертировать" : "Convert"}</button>
      </form>
      <h6>
        {languageRu
          ? 'Возможные варианты: а)"ваше число" EUR в RUB б)"ваше число" eur на rub (и другие производные в данном порядке)'
          : 'Possible variants: a) "Your number" EUR to RUB b)"Your number" eur in rub (and other variants in such order'}
      </h6>
    </div>
  );
};

export default Conventer;
