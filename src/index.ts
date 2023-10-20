let dinosaurExtinction: number = 76_000_000; //Si le agregamos un undescore podemos diferenciar mejor entre las unidades, decenas, centenas...
let dinosaurFavorite: string = "T-Rex";
let Extincts: boolean = true;

/*Para usar la función de typescript de los tipos inferidos,
 solamente debemos colocar el nombre de la variable
 e inicializarla porque de los contrario typescript 
 le asignaría por defecto el tipo any a la variable.
 */

function arturo(config: number): number {
    return config;
}

let newNumber: number = arturo(15);
console.log(newNumber);

let animals: string[] = ["chanchito", "feliz", "felipe"];
let nums: number[] = [1, 2, 3];
let checks: boolean[] = [true, false, true, true];
let num2: Array<number> = []; // ----->Esta es otra forma de definir un arreglo en typescript

//tuplas: es una variable que contiene un set de datos que se encuentran ordenados.

let tupla: [number, string] = [1, "chanchito feliz"];
let tupla1: [number, string[]] = [1, ["chanchito feliz", "Arturo"]];

//Enums: tipo de dato enumerado. Estas sería una lista de constantes que serán referenciadas luego.
//Nota siempre se usa PascalCase

enum Sice {
    Chica = "s",
    Mediana = "m",
    Grande = "l",
    ExtraGrande = "xl",
}
const variable1 = Sice.Grande;
console.log(variable1);

const enum LoadingState {
    Idle,
    Loading,
    Success,
    Error,
}
/*
--si colocamos const antes de definir el enum, cuando 
generemos nuestro código de javascript será mucho más optimizado puesto que 
solo será reflejado el valor cuando le asignemos el valor a otra variable.
*/

const state = LoadingState.Loading;

//Objects

//esta es la forma de hacerlo usando los tipos inferidos de typescritp
const object = {
    id: 1,
    name: "Arturo",
};

//esta sería la forma de hacerlo pero declarando los tipos de los atributos/propiedad del objeto
const object1: {
    id: number;
    name: string;
} = {
    id: 1,
    name: "arturo",
};

object1.id = 42;

const object2: {
    readonly id: number;
    name: string;
} = {
    id: 1,
    name: "arturo",
};

/*Para que no se vea tan engorroso la declaración de un objeto podemos hacer lo siguiente */
/*Aquí estoy definiendo un tipo para si posteriormente necesito la 
misma estructura de datos pueda usarla con esta definición de tipo
*/

type Address = {
    numberAddress: number;
    street: string;
    country: string;
};
type Persona = {
    readonly id: number;
    name: string;
    sice: Sice;
    address: Address;
};
const object3: Persona = {
    id: 1,
    name: "arturo",
    sice: Sice.Chica,
    address: {
        numberAddress: 1,
        street: "Madison Street",
        country: "Apure",
    },
};

//nota: tenemos la disponibilidad de si deseamos que un atributo/propiedad sea opcional
//y esto se hace con nameVariable ?: valor
// Además si queremos que una de nuestras propiedades no se pueda modificar,
// entonces usando readonly antes del nombre de la variable


/*-----------Tipar parámetros de una función que recibe un obejeto -------*/
function saludar({ name, age }: { name: string, age: number }) {
    console.log(`Hola ${name}, tienes ${age} años`)
}

saludar({ name: 'Arturo', age: 3 })

// o

function saludar1(persona: { name: string, age: number }) {
    const { name, age } = persona
    console.log(`Hola ${name}, tienes ${age} años`)
}

saludar({ name: 'Arturo', age: 3 })
/*--------------------------------- -------*/

/*--------- Tipado de retorno -----------*/

function saludar2({ name, age }: { name: string, age: number }): number {
    console.log(`Hola ${name}, tienes ${age} años`)
    return age
}

saludar({ name: 'Arturo', age: 3 })

/*--------------------------------- -------*/


/*Paso de una función como parámetro, necesitamos evitar los tipos function */

const sayHiFromFunction = (fn: (name: string, age: number) => void) => { /*sintaxis para pasar una función por parámetro */
    fn("Arturo", 15)
}

const sayHi = ((name: string, age: number) => {
    console.log(`Hola ${name}, tienes ${age} años`)
})

sayHiFromFunction(sayHi)
/*-------------------------------------------------- */

/*Tipar Arrow Functions */

//Forma 1
const sumar = (a: number, b: number): number => {
    return a + b
}

let result = sumar(1, 2)
console.log(`resultado = ${result}`)

//Forma 2
const restar: (a: number, b: number) => number = (a, b) => {
    return a - b
}

let result1 = restar(1, 2)
console.log(`resultado = ${result1}`)
/*----------------------------------- */

/*Funciones de tipo never, son aquellas funciones que nunca van a devolver nada */
/*----------------------------------------------------------------------------- */


/*En typescript no existe la inferencia de funciones a menos que sean anónimas y además
dependen del contexto  */ /*Por ejemplo */

const avengers = ['Capitan America', 'Iron Man', 'Hulk']

avengers.forEach((element) => { //forEach  es una de estas funciones que tienen la inferencia de tipos
    console.log(`${element}`)
})

/*------------------------------------------------------ */
/*------------Objetos--------- */
type HeroId = `${string}-${string}-${string}-${string}-${string}`; /*De esta forma podemos limitar la forma en la que queremos los string o cualquier valor para una variable */

//En los types no es necesario colocar "," ni ";" puesto que son opcionales
type Hero = {
    readonly id?: HeroId //readonly permite hacer una propiedad inmutable pero solamente en el desarrollo no afecta al .js
    name: string
    age: number
    isActive?: boolean //Esta es un apropiedad opcional
};

const hero: Hero = { /*Este Objeto no está haciendo absolutamente nada solo es un ejemplo */
    name: 'thor',
    age: 1500
};

function createHero(hero: Hero): Hero {
    const { name, age } = hero
    return {
        id: crypto.randomUUID(),
        name,
        age,
        isActive: true
    }
}

const thor = createHero({ name: 'Thor', age: 1500 })


/*Para poder hacer inmutable realmente una propiedad hay que limitar el objeto de la siguiente manera */

const ironMan = Object.freeze(createHero({ name: 'Iron Man', age: 50 }))
/*----------------------------------------------------------------------------------------------------- */

/*------Template Union Types-----------*/

type HexadecimalColor = `#${string}`;
const color: HexadecimalColor = '#00321'

/*Nota importante: estos tamplate Union type al igual que readonly solo funcionan a la hora de desarrollo
en producción no se van a ver reflejados en ninguna parte */

/*---------------------------------------------- */

/*------Union types e Intersection Types--------*/

type PokemonPowers = {
    attacks: string
    damageAttack: number
}
type Pokemon = {
    name: string
    levelLife: number
    elementType: 'ROCA' | 'VIENTO' | 'TRUENO' | 'AGUA' //Esta es una union type
    coach: string
    pokemonPowers: PokemonPowers
}

type Pokedex = {
    pokemon : Pokemon[]
} 

function createPokemon(pokemon: Pokemon): Pokemon {
    const { name, levelLife, elementType, coach, pokemonPowers } = pokemon
    return {
        name,
        levelLife,
        elementType,
        coach,
        pokemonPowers
    }
}

const Piplut = createPokemon({
    name: 'Piplut',
    levelLife: 150,
    elementType: 'AGUA',
    coach: 'Maya',
    pokemonPowers:
    {
        attacks: 'Pistola de Agua',
        damageAttack: 50
    }
})

const Pikachu = createPokemon({
    name: 'Pikachu',
    levelLife: 150,
    elementType: 'TRUENO',
    coach: 'Ash',
    pokemonPowers:
    {
        attacks: 'AttackTrueno',
        damageAttack: 90
    }
})

const pokedex: Pokedex = {
    pokemon: [],
}
pokedex.pokemon.push(Piplut)
pokedex.pokemon.push(Pikachu)

console.log(`\nPOKEDEX => POKÉMONS:`)
pokedex.pokemon.forEach((element) => {
    console.log(element)
})

/*La intersection type consiste en intersectar dos tipos completamente distintos para
obtener un nuevo tipo con lo que tenian los otros dos tipos 

ejemplo

type Persona = {
    name: string
    age: number
}
type Estudiante = {
    id: number
    levelStudy: string
}

type Colegio = Persona&Estudiante  
//esta sería la interseccion, también la puedes hacer para unir los tipos en una variable

*/
/*------------------------- */



