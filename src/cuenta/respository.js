const apiURL = "http://localhost:5500/api/"

export async function getCuentas() {
    const response = await fetch(`${apiURL}cuentas/?usuario=1`);
    return await response.json();
    /*return [
        {
            "id": 1,
            "nombre": "Banco",
            "tipo": "IE",
            "monto": 500.00
        },
        {
            "id": 2,
            "nombre": "Nómina",
            "tipo": "I",
            "monto": 1000.00
        },
        {
            "id": 3,
            "nombre": "Universidad",
            "tipo": "E",
            "monto": -100.00
        },
        {
            "id": 4,
            "nombre": "Efectivo",
            "tipo": "IE",
            "monto": 400.00
        }
    ]*/
}

export async function getMovimientos() {
    const response = await fetch(`${apiURL}transacciones/?usuario=1`);
    return await response.json();
    /* return [
        {
            "id":1,
            "origen": {
                "id":2,
                "nombre": "Nómina"
            },
            "destino": {
                "id": 1,
                "nombre": "Banco"
            },
            "monto": 1000,
            "concepto": "Pago nómina",
            "fecha": "2023-05-13"
        },
        {
            "id":2,
            "origen": {
                "id": 1, 
                "nombre": "Banco"
            },
            "destino": {
                "id": 4, 
                "nombre": "Efectivo"
            },
            "monto": 500,
            "concepto": "Retiro",
            "fecha": "2023-05-13"
        },
        {
            "id":3,
            "origen": {
                "id": 4,
                "nombre": "Efectivo"
            },
            "destino": {
                "id": 3,
                "nombre": "Universidad"
            },
            "monto": 100,
            "concepto": "Pago libros",
            "fecha": "2023-05-13"
        }
    ] */
}

export async function createTransaccion(transaccion) {
    const response = await fetch(`${apiURL}transacciones/`, {
        method: 'POST',
        body: JSON.stringify(transaccion)
    });
    return response.json();
}