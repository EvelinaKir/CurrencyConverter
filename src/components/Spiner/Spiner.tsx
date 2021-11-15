import spiner from '../../images/spiner.png'
import style from './spiner.module.scss'

const Spiner = () => {
    return (
        <div className={style.container}>
            <img src={spiner} alt="loader" />
        </div>
    )
}

export default Spiner