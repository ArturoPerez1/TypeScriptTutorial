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
        *readonly ancho: number
        *readonly alto: number
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

/*
*Una clase abstracta es aquella que se utiliza para dar una gerarquía de 
*herencia pero la misma no podrá ser instanciada 
*/
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

    protected llevarAlTaller() {
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

    reparar() {
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

    reparar() {
        this.llevarAlTaller()
    }
}

console.log("\n")

let vehiculoTerrestre = new VehiculoTerrestre("Auto", "Toyota")
vehiculoTerrestre.reparar()

let vehiculoAero = new VehiculoAereo("Toyota")
vehiculoAero.reparar()

//*-------------------------------------

//*Tipos literales---------------------

/*
*Los tipos literales consisten en que pueden aceptar un único valor dentro 
*de los tipos definidos.

*Esto quiere decir que el valor que puede recibir tiene que ser igual al tipo asignado

*Algunos tipos literales por defecto serían (undefined y null)
*/

//Ejemplos:

let vardadera: true = true
let numero: 1 = 1
let cadena: "Arturo" = "Arturo"

let posibleCadena: 'Arturo' | 'Angel' | 'Wilmer'
posibleCadena = 'Wilmer'

/*
!Ejemplo de error: si tipeas una variable como literal, entonces el valor que puede
!la variable es único o sea no puedes tratar de asignarle a la variable posibleCadena
!el string 'Belkys' puesto que ese valor no está definido dentro del tipo literal
*/

/*
*Importante, si utilizamos const como forma de definir una variable entonces le estamos
*diciendo al compilador que infiera de manera estricta el tipo de dato de la varible un caso de 
*esto son los siguientes:
*/

const permiso = true
const numeroConst = 1
const cadenasConst = 'Estres' //todo> Importante: hay que tener en cuenta que en este caso 
//todo> las union types no aplican porque no se permitiría debido al const

//*------------------------------------

//*Union types----------------------
//todo: este tipo de uniones también se pueden usar en funciones para definir el valor de retorno
//Ejemplo:

function convertir(valor: string | number) {
    //*Para que typescrit pueda diferenciar entre strign y number hay que hacer lo siguiente
    if (typeof (valor) === "string") {
        console.log(valor.length)
    } else if (typeof (valor) === "number") {
        console.log(valor)
    }
}

//*Union types(Campos discriminantes)
//Ejemplo:

type OperacionSuma = {
    sumando1: number,
    sumando2: number,
    tipo: 'suma'
}

type OperacionMultiplicar = {
    operando1: number,
    operando2: number,
    tipo: 'multiplicar'
}

type Operacion = OperacionSuma | OperacionMultiplicar

function operar(o: Operacion): number | undefined {
    if (o.tipo == "suma") {
        return (o.sumando1 + o.sumando2)
    } else if (o.tipo == "multiplicar") {
        return (o.operando1 * o.operando2)
    }

    return undefined
}

console.log(operar({ sumando1: 2, sumando2: 3, tipo: 'suma' }))

//*----------------------------------

//*Intersection types-------------

type Coordenada = [x: number, y: number]
type Vector = [x: number, y: number]

type Posicionable = {
    posicion: Coordenada
}

type Movible = {
    velocidad: Vector
    aceleracion: Vector
}

type MovibleYPosicinable = Movible & Posicionable

//*Al volverse una intersección, typescript necesita que si definimos un objeto del tipo 
//*intersección llenemos todos los campos de las propiedades 
//*definidas en cada tipó de la intersección

let obj: MovibleYPosicinable = {
    posicion: [5, 5],
    velocidad: [5, 6],
    aceleracion: [5, 7]
}
//*-------------------------------

//*Interfaces---------------------
/*
*Una interfaz es una especie de especificación o contrato,
*cuando creamos una interfaz lo que hacemos es declarar tipo
*en el cual tenemos unos ciertos aspectos que queremos que en algunos 
*objetos que definamos de ese tipo tengan.
*/

//Ejemplo:

//*Modificadores en las interfaces(readonly, ? --> atributos opcionales)

/*
Pilas con el readonly en especial en los tipos estructura como los objetos,
si colocamos readonly a un objeto solo estariamos restringiendo la modificación del objeto
en general no de las propiedades. 

!Ejemplo: {
! type Personal = {
!   readonly personal: {
!           name: string,
!           email: string
!       }
!}

!podríamos modificar name y email haciendo lo siguiente
!let personal : Personal = { //Asignamos el valor usando la estructura de objeto la cual solo podremos modificar una vez debido al readonly
!    personal : {
!        name: "Arturo",
!        email: "arjperez31@gmail.com"
!    }
!}
!personal.personal.name = "Angel" //Aqui estaríamos modificando la propiedad la cual no daría error porque el readonly solo afecta a la estructura no a la propiedad
!
!}


*/

interface UserData {
    readonly username: string,
    created_at?: Date,
    superuser: boolean
    readonly personal: {
        name: string,
        email: string
    }

    logout(): void,
    rename: (username: string) => void
}

function login(): UserData {
    return {
        username: 'admin',
        created_at: new Date(),
        superuser: true,
        personal: {
            name: "Arturo",
            email: "arjperez31@gmail.com"
        },
        logout() {
            console.log("Adios")
        },
        rename(username) {
            console.log('TODO: Rename account')
        }
    }
}

let data = login()

//-------Operaciones equivalentes con atributos opcionales
if (data.created_at) {
    let time = data.created_at.getTime
    console.log(time)
}
//*El if y el operador ? serían equivalentes en este caso puesto que te permiten usar las propiedades del atributo de tipo Date
let seconds = data.created_at?.getSeconds
//--------

//*Interfaces usadas en clases

interface Shape {
    readonly sides: number,
    area(): number
    perimeter(): number
}

//*Independientemente de que le estemos pasando una instancia de la clase Rectangle a la función, esta no podrá acceder a los atributos de la clase puesto que a esta solo le interesa lo que tenga la interfaz Shape
function process(s: Shape) {
    console.log({ area: s.area() })
}


//*La clase sería una Shape por eso es que al declarar una instancia de la clase Rectangle facilmente podemos pasarla como parámetro de la función process()
class Rectangle implements Shape {
    sides: number = 4

    constructor(readonly width: number, readonly heigth: number) {

    }

    area(): number {
        return (this.width * this.heigth)
    }

    perimeter(): number {
        return ((2 * this.width) + (2 * this.heigth))
    }
}

let rectangle = new Rectangle(5, 2)
process(rectangle)

//*Especialización --> Herencia en interfaces 
interface InterfaceVehiculo {
    readonly fabricante: string,
    arracarMotor(): void,
    repostar(): void,
    detenerMotor(): void
}

interface InterfaceVehiculoT extends InterfaceVehiculo {
    conducir(): void
}

interface InterfaceVehiculoA extends InterfaceVehiculo {
    sonarSirena(): void,
    encenderChimenea(): void
    detenerChimenea(): void
}

class OpelCorsa implements InterfaceVehiculoT {
    fabricante: string = "Opel"

    conducir(): void {
        console.log("brum brum")
    }

    arracarMotor(): void {
        console.log("turururururur")
    }

    repostar(): void {
        console.log("Echando 20$ de gasolina")
    }

    detenerMotor(): void {
        console.log("tururur........")
    }
}

//*Interfaces con índice --> Tipos Raros

interface Indizable {
    [/*Parámetro índice*/ index: number]: boolean
}

let l: Indizable = {}
let k = l[4]

//*Funciones y tipos híbridos

//Aquí se habla de un tipo híbrido porque cualquier varibale de tipo Comparator puede usar la propiedad de tipo función o una simple
interface Comparator {
    (first: string, second: string): number
    algorithm: string
}

function sort(c: Comparator) {
    let out = c("first", "second")
}



//Nota: basicamente todo lo que estamos haciendo con las interfaces lo podemos hacer con type alias
//Nota: en typescript undefined evalua a false dentro de un if así que puedes usarlo como criterio de entrada.
//*-------------------------------

//*Casteo con as

interface Geometria {
    lados: number
    pintar():void
}

interface Triangulo extends Geometria {
    base: number,
    altura: number
}

interface Cuadrado extends Geometria{
    lado: number
}

function procesar(g: Geometria){
    if(g.lados == 4 ){
        let cuadrado =  g as Cuadrado //Me está devolviendo una geometría pero de tipo Caudrado o sea quiere decir que está bajando en la jerarquía
        console.log(cuadrado.lado)
    }else if (g.lados == 3){
        let triangulo = g as Triangulo
        console.log(`${triangulo.base} ${triangulo.altura}`)
    }
}

//*Formas de tener un casteo más seguro(instanceof(Aplica solo para objetos) y guards(Aplican a interfaces)) 

//Los Guards son casteo en tiempo de ejecución que nos ayudaran a castear de forma más segura si una estructura es de un tipo o de otra

function esUnaGeometria(x: any): x is Geometria{
    return x.lados && x.pintar
}

function esUnCuadrado(x: any): x is Cuadrado { 
    return esUnaGeometria(x) && (x as any).lado
}

function esUnTriangulo(x: any): x is Triangulo {
    return esUnaGeometria(x) && (x as any).lado && (x as any).base  && (x as any).altura
}

function procesar1(g: Geometria){
    if(esUnCuadrado(g)){
        console.log(g.lado)
    }else if(esUnTriangulo(g)){
        console.log(`${g.base} ${g.altura}`)
    }
}

/* 
*Enums: Los enums son una forma de limitar los valores que puede tener una variable en concreto
*Además cada parte del enum tendrá su propio índice el cual podemos dejar que typescript los asigne o
*nosotros mismo los creamos sin más, puedes usar string o numbers. Ten en cuenta que cuando usas strings
*tienes que colocarle a todos un valor, pero si usas numbers se creará una secuencia
*/
const enum DiaSemana {
    Lunes,
    Martes,
    Miercoles,
    Jueves,
    Viernes,
    Sabado,
    Domingo
}

interface CitaMedica{
    dia: DiaSemana
}

let c: CitaMedica = {
    dia: DiaSemana.Lunes
}



//*-----------------------------