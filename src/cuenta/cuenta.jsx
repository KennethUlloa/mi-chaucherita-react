import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './cuenta.css';

function Cuenta({nombre, monto, tipo}) {
    function clasePorTipo(tipo) {
        switch(tipo) {
            case 'E': return faArrowLeft;
            case 'I': return faArrowRight;
            default: return faArrowRightArrowLeft;
        }
    }

    function getSigno(monto) {
        let valMonto = Math.abs(monto);
        return (monto < 0)? `-$${valMonto}` : `$${valMonto}`;
    }

    return (
        <div className="cuenta-wrapper">
            <div className="title">
                <FontAwesomeIcon icon={clasePorTipo(tipo)}/>
                <h3>{nombre}</h3>
            </div>
            <p className={`monto-element ${(monto < 0)? 'red-color': ''}`}>{getSigno(monto)}</p>
        </div>
    )
}

export default Cuenta;
