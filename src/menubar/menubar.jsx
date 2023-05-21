import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faHouse, faMoneyBillTransfer, faWallet } from '@fortawesome/free-solid-svg-icons';
import './menubar.css';
import { Link } from "react-router-dom";

function MenuBar() {
    return (
        <header className="justify-content-center">
            <nav className="">
                <ul className="l-nav-menu">
                    <li className="l-nav-item gap-2 d-flex align-items-center">
                        <FontAwesomeIcon icon={faHouse}/>
                        <Link to={"/"}>Inicio</Link>
                    </li>
                    <li className="l-nav-item gap-2 d-flex align-items-center">
                        <FontAwesomeIcon icon={faMoneyBillTransfer}/>
                        <Link to={"/movimientos"}>Movimientos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MenuBar;