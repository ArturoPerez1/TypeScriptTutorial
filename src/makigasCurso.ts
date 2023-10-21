//* ---------Clases en TypeScript---------

/* ------
* Creación de Clases
* Visivilidad -> (private) - (readonly)
* Getters y Setters Virtuales
* Herencia de Clases
* Abstract y Protectd

-------*/

//Ejemplo 1: Todos los conceptos antes de herencia de clases

class Rectagulo {
    ancho: number
    alto: number
    private _nombre: string

    /*
        * Uso del readonly ejemplo():
        readonly ancho: number
        readonly alto: number
        *Este modificador permite que las variable sean visibles desde fuera
        *de la clase pero que no sean modificables, al igual que dentro de la clase
        *no se podrá modificar estas variables
     */

    constructor(ancho: number, alto: number, nombre: string) {
        console.log("constructor()")
        this.ancho = ancho
        this.alto = alto
        this._nombre = nombre
    }

    area() {
        console.log("area()")
        return this.ancho * this.alto
    }

    perimetro() {
        console.log("perimetro()")
        return ((this.ancho * 2) + (this.alto * 2))
    }

    /*
      *Los getters y setters en typescript al crearse este mismo los toma como
      *propiedades por ende serían una especie de atributo virtual
     */

    get getArea() {
        console.log('getter de area')
        return (this.ancho * this.alto)
    }

    get getNombre() {
        console.log("Obtengo el nombre")
        return this._nombre
    }

    set setNombre(value: string) {
        console.log("Seteo el nombre")
        this._nombre = value
    }


}

let rectangulo = new Rectagulo(2, 3, "Rectángulo 1")
rectangulo.setNombre = "Rectángulo 2" //En esta línea estoy llamando al setter
console.log(`El nombre del rectángulo es:  ${rectangulo.getNombre}`) // En esta línea estoy llamando al getter
/* 
* En este caso area se convierte en una propiedad más de la clase y no un método
*/


//Ejemplo 2: Todos los conceptos hasta abstract y protected

/*Una clase abstracta es aquella que se utiliza para dar una gerarquía de 
herencia pero la misma no podrá ser instanciada */
abstract class Vehiculo {
    protected fabricante: string
    /*
    * Modificador protected: protected no dejan que los atributos 
    *puedan ser accedidos desde fuera de la clase pero si permite que los hijos de
    *la clase puedan acceder a ellos.
    */
    constructor(fabricante: string) {
        this.fabricante = fabricante
    }

    moverse() {
        console.log(`El vehiculo ${this.fabricante} se ha movido magicamente`)
    }

    protected llevarAlTaller(){
        console.log(`Al taller que va`)
    }
}

class VehiculoTerrestre extends Vehiculo {
    private tipo: string

    constructor(tipo: string, fabricante: string) {
        super(fabricante)
        this.tipo = tipo
    }

    moverse() {
        console.log(`rum rum hace mi ${this.tipo}`)
        super.moverse()
    }

    reparar(){
        console.log(`Un momento que me leo el manual de instrucciones de ${this.fabricante}`)
    }
}

class VehiculoAcuatico extends Vehiculo {
    moverse() {
        console.log("niuuuuuuuuuun")
    }
}

class VehiculoAereo extends Vehiculo {
    moverse() {
        console.log("popopopo")     
    }

    reparar(){
        this.llevarAlTaller()
    }
}

console.log("\n")

let vehiculoTerrestre = new VehiculoTerrestre("Auto","Toyota")
vehiculoTerrestre.reparar()

let vehiculoAero = new VehiculoAereo("Toyota")
vehiculoAero.reparar()

//*-------------------------------------
