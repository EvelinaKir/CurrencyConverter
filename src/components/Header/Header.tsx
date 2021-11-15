import style from "./header.module.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
const Header = () => {
  const location = useLocation()
  const languageRu =
  window.navigator && window.navigator.language.includes("ru");
  return (
    <div className={style.container}>
      <ul>
        <li className={location.pathname === '/' ? style.active : style.link}>
          <Link to="/">{languageRu ? 'Конвертер' : 'Converter'}</Link>
        </li>
        <li className={location.pathname === '/currency' ? style.active : style.link}>
          <Link  to="/currency">{languageRu ? 'Курсы валют' : 'Exchange rates'}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
