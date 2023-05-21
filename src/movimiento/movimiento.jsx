import { useState, useEffect, useRef } from "react";
import { getCuentas, getMovimientos, createTransaccion } from "../cuenta/respository";
import { today } from "../utils";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import './movimiento.css';

const effects = {}

export default function PanelMovimientos({ _id }) {
    const [movimientos, setMovimientos] = useState([]);
    
    const effect = () => {
        getMovimientos().then(data => {
            console.log(data);
            setMovimientos(data.transacciones);
        });
    }

    effects[_id] = effect;

    useEffect(effect, []);

    return (
        <div className="d-flex w-100 flex-column align-items-center">
            <div className="d-flex gap-3">
                <button className="btn btn-primary">
                    <Link to="nuevo/ingreso" className="unstyled-a">Nuevo ingreso</Link>
                </button>
                <button className="btn btn-primary">
                    <Link to="nuevo/gasto" className="unstyled-a">Nuevo gasto</Link>
                </button>
                <button className="btn btn-primary">
                    <Link to="nuevo/traspaso" className="unstyled-a">Nuevo traspaso</Link>
                </button>
            </div>
            <Outlet />
            <table className="mt-3">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Concepto</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
                {movimientos.map((mov, i) => <Movimiento props={mov} key={`mov-${i}`}/> )}
            </tbody>
        </table>
        </div>
    )
}

function Movimiento({ props }) {
    return (
        <tr>
            <td>
                {props.fecha}
            </td>
            <td>
                {props.origen.nombre}
            </td>
            <td>
                {props.destino.nombre}
            </td>
            <td>
                {props.concepto}
            </td>
            <td>
                {props.monto}
            </td>
        </tr>
    )
}

export async function Loader({ params }) {
    function load(cuentas) {
        switch(params.tipo) {
            case "ingreso": return {
                tipo: params.tipo,
                origen: cuentas.filter(cuenta => cuenta.tipo === "I"),
                destino: cuentas.filter(cuenta => cuenta.tipo === "IE")
            }
            case "gasto": return {
                tipo: params.tipo,
                origen: cuentas.filter(cuenta => cuenta.tipo === "IE"),
                destino: cuentas.filter(cuenta => cuenta.tipo === "E")
            }
            case "traspaso": return {
                tipo: params.tipo,
                origen: cuentas.filter(cuenta => cuenta.tipo === "IE"),
                destino: cuentas.filter(cuenta => cuenta.tipo === "IE")
            }
        }
    }
    
    let cuentas = [];
    await getCuentas().then(data => {cuentas = load(data.cuentas)});
    console.log(cuentas);
    return cuentas;
    
}

export function FormaMovimiento() {

    const [cuentasIngreso, setCuentasIngreso] = useState([]);
    const [cuentasIngresoEgreso, setCuentasIngresoEgreso] = useState([]);
    const fecha = today();
    const cOrigen = useRef();
    const cDestino = useRef();
    let data  = useLoaderData();

    useEffect(() => {
        setCuentasIngreso(data.origen);
        setCuentasIngresoEgreso(data.destino);
    }, [data]);

    function createMovimiento(e) {
        e.preventDefault();
        const data = Array.from(e.target.elements);
        const obj = {};
        data.filter(el => el.name).forEach((el) => {
            obj[el.name] = el.value;
            if (el.type == "number") {
                obj[el.name] = Number(el.value);
            }else if(el.hasAttribute("data-cast")) {
                obj[el.name] = Number(el.value);
            }
        });
        obj["usuario"] = 1;
        createTransaccion(obj);
        console.log(obj);
        effects["panel_1"]();
    }

    function seleccionCuenta() {
        
        const val = cOrigen.current.value;
        if(data.tipo != "traspaso") {
            return;
        }
        cDestino.current.value="";
        Array.from(cDestino.current.options).forEach(e => {
            if (e.value == val) {
                e.classList.toggle("d-none", true);
            }else {
                e.classList.toggle("d-none", false);
            }
        });
    }
    
    return (
        <form 
            onSubmit={createMovimiento}
        >   
            <div className="input-group my-3">
                <input type="date" name="fecha" defaultValue={fecha}  className="form-control"/>
            </div>
            <div className="input-group my-3">
                <label className="input-group-text">Cuenta de origen</label>
                <select name="cuentaOrigen" className="form-select" data-cast="number" onChange={seleccionCuenta} ref={cOrigen} defaultValue="">
                    {cuentasIngreso.map((cuenta) => <option value={cuenta.id} key={`cuenta-${cuenta.id}`}>{cuenta.nombre}</option>)}
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text">Cuenta acreditada</label>
                <select name="cuentaDestino" className="form-select" data-cast="number" ref={cDestino}>
                    {cuentasIngresoEgreso.map((cuenta) => <option value={cuenta.id} key={`cuenta-${cuenta.id}`}>{cuenta.nombre}</option>)}
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text">Concepto</label>
                <input type="text" name="concepto" className="form-control"/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text">Monto</label>
                <input type="number" min="0" step="0.01" name="monto" className="form-control"/>
            </div>
            <div className="d-flex gap-3">
                <input type="submit" value="Guardar" className="w-100 btn btn-primary"/>
                <button className="w-100 btn btn-danger">
                    <Link to={"/movimientos"} className="unstyled-a">Cancelar</Link>
                </button>
            </div>

        </form>
    )
}