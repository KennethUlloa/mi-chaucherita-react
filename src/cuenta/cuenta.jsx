import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faArrowRight, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { getCuentas } from "./respository";
import './cuenta.css';

function Cuenta({ props }) {
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
                <FontAwesomeIcon icon={clasePorTipo(props.tipo)} className="color-primary-"/>
                <h3 className="color-primary-">{props.nombre}</h3>
            </div>
            <p className={`monto-element ${(props.monto < 0)? 'red-color': ''}`}>{getSigno(props.monto)}</p>
        </div>
    )
}

export function PanelCuentas() {
    const [cuentas, setCuentas] = useState([]);
    useEffect(() => {
        getCuentas().then(data => {
            setCuentas(data.cuentas);
        })
        
    },[]);
    return (
        <div className="d-flex flex-row gap-3 align-items-start px-5 pt-3 justify-content-center">

            <div className="cuentas-container vertical bg-soft p-3 rounded-4">
                <div className="d-flex flex-row gap-2">
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <h3>Cuentas</h3>
                </div>
                {cuentas.filter((cuenta) => cuenta.tipo === "IE")
                .map((cuenta) => <Cuenta props={cuenta} key={cuenta.id}/>)}
            </div>
            <div className="d-flex flex-column gap-3 bg-soft p-3 rounded-4">
            <div className="d-flex flex-row gap-2">
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <h3>Gastos</h3>
                </div>
                <div className="cuentas-container">
                    {cuentas.filter((cuenta) => cuenta.tipo === "E")
                    .map((cuenta) => <Cuenta props={cuenta} key={cuenta.id}/>)}
                </div>
                <div className="d-flex flex-row gap-2">
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <h3>Ingresos</h3>
                </div>
                <div className="cuentas-container">
                    {cuentas.filter((cuenta) => cuenta.tipo === "I")
                    .map((cuenta) => <Cuenta props={cuenta} key={cuenta.id}/>)}
                </div>
            </div>
        </div>
    )
}

export default Cuenta;
