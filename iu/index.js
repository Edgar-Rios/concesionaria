
let print = bufer => console.log(`--${bufer?bufer:``}`);

function titulo(){
    print('----------------------------------------------')
    print('                CONCESIONARIA               --')
    print('----------------------------------------------')
    print('----------------------------------------------')
} 

function piePagina(){
    print()
    print()
    print('----------------------------------------------')
    print('----------------------------------------------')
}

function clienteDataPrint(cliente) {
    print("\tCLIENTE:")
    print(`  Nombre: ${cliente.nombre}`)
    print(`  D.N.I: ${cliente.dni?cliente.dni:""}`)
    print(`  Financiamiento`)
    print(`     max cuota $${cliente.maximoCuota?cliente.maximoCuota:0}\t max pago neto $${cliente.maximoPrecioAPagar?cliente.maximoPrecioAPagar:0}`)
    console.log(`-+++++++++++++++++++++++++++++++++++++`)
}

function autoDataPrint(auto) {
    
    print(`\tAUTO ////////////// < ${auto.patente} >`)
    print(`  Marca: ${auto.marca}`)
    print(`  Modelo: ${auto.modelo}\t Color: ${auto.color}`)
    print(`  Año: ${auto.anio}\t Km: ${auto.km}`)
    print(`      ${auto.vendido?'V E N D I D O':'E N   V E N T A'}`)
    if(!auto.vendido){
        print(`  Precio: $${auto.precio}\t Cuotas: ${auto.cuotas}`)
    }
    console.log(`-+++++++++++++++++++++++++++++++++++++`)
}

function autosListPrints(autosData) {
    if(autosData.length > 0){
        autosData.forEach(dataAuto => autoDataPrint(dataAuto))
    }else{
        render(`  No se enontraron autos`)
    }
}

let isCliente = unCliente => unCliente.nombre != undefined && unCliente.maximoCuota != undefined && unCliente.maximoPrecioAPagar != undefined;

let isAuto = unAuto =>  unAuto.marca != undefined && unAuto.modelo != undefined && unAuto.patente != undefined;

module.exports = {

    print: print
    ,

    render: (...data) =>{
        titulo()
        data.forEach(dataElement => {
            if(isCliente(dataElement)){
                clienteDataPrint(dataElement);
            }else if(isAuto(dataElement)){
                autoDataPrint(dataElement);
            }else if(typeof dataElement == `string`){
                print(dataElement)
            }else if( dataElement.length != undefined ){
                autosListPrints(dataElement)
            }
        });
        piePagina()
    }
}