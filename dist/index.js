"use strict";
let dinosaurExtinction = 76000000;
let dinosaurFavorite = "T-Rex";
let Extincts = true;
function arturo(config) {
    return config;
}
let newNumber = arturo(15);
console.log(newNumber);
let animals = ["chanchito", "feliz", "felipe"];
let nums = [1, 2, 3];
let checks = [true, false, true, true];
let num2 = [];
let tupla = [1, "chanchito feliz"];
let tupla1 = [1, ["chanchito feliz", "Arturo"]];
var Sice;
(function (Sice) {
    Sice["Chica"] = "s";
    Sice["Mediana"] = "m";
    Sice["Grande"] = "l";
    Sice["ExtraGrande"] = "xl";
})(Sice || (Sice = {}));
const variable1 = Sice.Grande;
console.log(variable1);
const state = 1;
const object = {
    id: 1,
    name: "Arturo",
};
const object1 = {
    id: 1,
    name: "arturo",
};
object1.id = 42;
const object2 = {
    id: 1,
    name: "arturo",
};
const object3 = {
    id: 1,
    name: "arturo",
    sice: Sice.Chica,
    address: {
        numberAddress: 1,
        street: "Madison Street",
        country: "Apure",
    },
};
function saludar({ name, age }) {
    console.log(`Hola ${name}, tienes ${age} años`);
}
saludar({ name: 'Arturo', age: 3 });
function saludar1(persona) {
    const { name, age } = persona;
    console.log(`Hola ${name}, tienes ${age} años`);
}
saludar({ name: 'Arturo', age: 3 });
function saludar2({ name, age }) {
    console.log(`Hola ${name}, tienes ${age} años`);
    return age;
}
saludar({ name: 'Arturo', age: 3 });
const sayHiFromFunction = (fn) => {
    fn("Arturo", 15);
};
const sayHi = ((name, age) => {
    console.log(`Hola ${name}, tienes ${age} años`);
});
sayHiFromFunction(sayHi);
const sumar = (a, b) => {
    return a + b;
};
let result = sumar(1, 2);
console.log(`resultado = ${result}`);
const restar = (a, b) => {
    return a - b;
};
let result1 = restar(1, 2);
console.log(`resultado = ${result1}`);
const avengers = ['Capitan America', 'Iron Man', 'Hulk'];
avengers.forEach((element) => {
    console.log(`${element}`);
});
const hero = {
    name: 'thor',
    age: 1500
};
function createHero(hero) {
    const { name, age } = hero;
    return {
        id: crypto.randomUUID(),
        name,
        age,
        isActive: true
    };
}
const thor = createHero({ name: 'Thor', age: 1500 });
const ironMan = Object.freeze(createHero({ name: 'Iron Man', age: 50 }));
const color = '#00321';
//# sourceMappingURL=index.js.map