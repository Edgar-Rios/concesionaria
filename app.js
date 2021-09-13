let concesionaria = require("./entidades/concesionaria");
let { argv: argumentos} = require("process");

let errorApp = () => console.log(`Fallo en la lectura y ejecucion ejecucion de la aplicacion`)

let leerComandos = () => {
    let index = 2
    let comandos = []
    do {
        let comando = argumentos[index]
        if (comando) {
            comandos.push(comando)
        }
        index++

    } while (argumentos[index]);

    return comandos;
}

function isString(bufer) {
    for(i=0; i<bufer.length; i++){
        switch(bufer[i]){
            case `0`:case `1`: case `2`:case `3`:case `4`:case `5`:case `6`:case `7`:case `8`:case `9`:
                return false;
        }
    }   
    return true;
}

function isNumber(bufer) {
   
    for(i=0; i<bufer.length; i++){
        switch(bufer[i]){
            case `0`:case `1`: case `2`:case `3`:case `4`:case `5`:case `6`:case `7`:case `8`:case `9`:
                break;
            default:
                return false
        }
    }   
    return true;
}
//coloca una mayuscula al inicio de una palabra
let mYm = palabra => palabra[0].toUpperCase() + palabra.slice(1).toLowerCase()

function iniciar() {
    comandos.shift()
    let nombreYApellido = comandos.map( n => mYm(n) ).join(` `)
    if (isString(nombreYApellido)) {
        concesionaria.iniciarOperacion(nombreYApellido)
    } else {
        errorApp()
    }
}

function cotizar(){
    let cuota = Number(comandos[1])
        let pagoNeto = Number(comandos[2])
        if(isNumber(cuota) && isNumber(pagoNeto)){
            concesionaria.presupuestoCliente(cuota, pagoNeto)
        }else{
            errorApp()
       }
}

function vender() {
    let dni = comandos[1]
    let patente = comandos[2]

    concesionaria.venderAuto(patente, dni);
}

/*
-----------------------------------
    INICIO DE LA APLICACION
-----------------------------------
*/
let comandos = leerComandos()
switch (comandos[0]) {
    //se debe ingresar el nombre y/o apellido del cliente
    case `iniciar`:
        iniciar()
        break;
    //se debe agregar el monto de la cuota y el pago neto
    case `cotizar`:
        cotizar()
        break;
    case `atender`:
        //muestra las posibilidades para el cliente
        concesionaria.atender()
        break;
    //agregar PATENTE y DNI
    case `vender`:
        vender()
        break; 2
    //muestra catalogo completo de autos
    case `catalogo`:
        concesionaria.listarAutos()
        break;
    case `vender`:
        vender()
        break;
    default: 
        console.log(`${comandos[0]}`)
        errorApp()

}


//*/
