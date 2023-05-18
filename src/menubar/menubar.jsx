import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faHouse, faMoneyBillTransfer, faWallet } from '@fortawesome/free-solid-svg-icons';
import './menubar.css';

function MenuBar() {
    return (
        <div className="menubar">
            <div className="icon-wrapper">
                <FontAwesomeIcon icon={faHouse} size="xl" />
                <span>Inicio</span>
            </div>
            <div className="icon-wrapper">
                <FontAwesomeIcon icon={faMoneyBillTransfer} size="xl"/>
                <span>Movimientos</span>
            </div>
            <div className="icon-wrapper">
                <FontAwesomeIcon icon={faWallet} size="xl" />
                <span>Cuentas</span>
            </div>
        </div>
    )
}

export default MenuBar;