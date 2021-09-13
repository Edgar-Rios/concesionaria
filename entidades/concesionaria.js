let fs = require("fs");//FILE SYSTEM
let iu = require("../iu")//MODULO PROPIO PARA IMPRIMIR POR CONSOLA

//Clientes y Autos
let autosDB = JSON.parse(fs.readFileSync('./dataBase/autos.json', "utf-8"));
let clientesDB = JSON.parse(fs.readFileSync("./dataBase/clientes.json", "utf-8"));
//datos de operacion en curso
let clienteCache = JSON.parse(fs.readFileSync("./cache/cache_cliente.json", "utf-8"));
let autosCache = JSON.parse(fs.readFileSync("./cache/cache_autos.json", "utf-8"));

//actualizar cache de cliente
function guardarClienteCache(cliente) {
    let dataCliente = JSON.stringify(cliente)
    fs.writeFileSync("./cache/cache_cliente.json", dataCliente, "utf-8");
}


function guardarAutosCache(Cliente) {
    let dataCliente = JSON.stringify(cliente)
    fs.writeFileSync("./cache/cache_autos.json", dataCliente, "utf-8");
}

//borra el contenido de los json cache
/*//////////////////////////////////////////////////////////////////////////////////////////////////////
    Le COLOQUE LLAVE Y CORCHETES PORQUE SI LOS LIMPIO COMPLETAMENTE LANZA ERROR CUANDO LOS QUIERP LEER
*////////////////////////////////////////////////////////////////////////////////////////////////////////
function limpiarCache() {
    fs.writeFileSync('./cache/cache_cliente.json', {}, "utf-8");
    fs.writeFileSync('./cache/cache_autos.json', [], "utf-8");
    console.log("cache vaciado")
}
/*///////////////////////////////////////////////////////////////////////////////////////////////
    TODOS ESTOS DOS METODOS DE CONTROL NO ESTAN MUY BIEN QUE DIGAMOS 
*////////////////////////////////////////////////////////////////////////////////////////////////
function trEnCurso() {
    return clienteCache.nombre == undefined
}

function presupuestoEstablecido() {
    return clienteCache.maximoCuota != undefined && clienteCache.maximoPrecioAPagar != undefined
}
////////////////////////////////////////////////////////////////////////////////////////////////// 

function clientePuedePagar(cliente, auto) {
    return (!((auto.precio / auto.cuotas) > cliente.maximoCuota) && !(auto.precio > cliente.maximoPrecioAPagar))
}

//funcion mostrar autos que cliente puede llegar a pagar
// @ return array de autos
function mostrarPaqueteDeOpciones(cliente) {
    return autosDB.filter(auto => (clientePuedePagar(cliente, auto) && !auto.vendido))
}

//FUNCIONES PARA EXPORTAR
let concesionaria = {
    iniciarOperacion: (nombre) => {
        if (trEnCurso()) {
            let cliente = {
                nombre: nombre,
                maximoCuota: 0,
                maximoPrecioAPagar: 0,
            }
            guardarClienteCache(cliente);
            iu.render("\tOPERACION INICIADA EXITOSAMENTE!", `\tBienvenido ${cliente.nombre}`)
        } else {
            iu.render(clienteCache, "\tError: Ya hay una transaccion en curso.")
        }
    },

    presupuestoCliente: (cuotaMaximo, PagoNetoMaximo) => {
        if (trEnCurso) {
            clienteCache.maximoCuota = cuotaMaximo
            clienteCache.maximoPrecioAPagar = PagoNetoMaximo
            guardarClienteCache(clienteCache)
            iu.render(`  Valores de pago establecidos para el cliente ${clienteCache.nombre}`)
        } else {
            iu.render("  Error: Primero debe iniciar una operacion")
        }
    },

    atender: () => {
        if (presupuestoEstablecido()) {
            let autosBaseCliente = mostrarPaqueteDeOpciones(clienteCache)
            guardarAutosCache(autosBaseCliente)
            iu.render(clienteCache, autosBaseCliente)
        }
    },

    //funcion para buscar auto
    traerAuto: patente => { //@param patente: string
        let auto = null;
        autosCache.forEach(item => {
            if (item.patente == patente) {
                auto = item
            }
        });
        return result;
    },

    //funcion vender un auto
    //////////////////////////////////
    //      NO LO PROBE TODAVIA
    ///////////////////////////////////
    venderAuto: (patente, dni) => { //@param patente: string
        if (presupuestoEstablecido()) {
            let auto = this.traerAuto(patente);
            if (auto != null) {
                auto.vendido = true
                console.log("auto vendido") //test
            }
        }

    },

    //funcion mostrar todos los autos
    listarAutos: () => { //@ VOID: muestra por consola cada auto dentro del array
        autosDB.forEach(auto => {
            console.log(auto);
        })
    },

}

module.exports = concesionaria