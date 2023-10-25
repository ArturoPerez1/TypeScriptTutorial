/*
*Tipos Genéricos en TypeScript
!------------------------------------------------
*/

/*
Los tipos genéricos consisten en poder declarar una cierta estructura a la que no queremos 
dar un parametrizado en concreto sino que nos permita influenciar el parámetro con diferentes 
valores posibles.

Entonces por ejemplo en el caso de la interfáz Respuesta lo que sucederá es que podremos tener
una Respuesta de string, object, boolean, etc. Podemos influenciar la interfáz de la manera
en la que queramos.

Siempre que vayamos a implementar a Respuesta en este caso debemos influenciar el parámetro T
porque sino nos saltará un error al tratar de hacerlo.

Notas: 
1- Puedes definir más de un parámetro genérico utilizando <param1, param2,...,paramN>.

2- Podemos controlar que sean obligatorios o no los parámetros genéricos diciendo que 
la propiedad que los usa es opcinal con ?.

3- Puedes darle nombres más descriptivos a los 
parámetros genéricos para que tengan más sentido a la hora de implementarlos.
 */


interface Respuesta<T/*Messsage*/> /*<T> T es el nombre del parámetro genérico */ {
    type: string,
    success: boolean,
    message: T/*Messsage*/,
}

/*En este caso tenemos dos ejemplos de la influenciación que le suministramos al parámetro T
cambiando así el comportamiento del tipo interno de messsage, el cual en el primer ejemplo es 
de tipo string lo que maneja y en el segundo ejemplo es de tipo boolean.*/

let payload: Respuesta<string> = {
    type: 'post',
    success: true,
    message: 'Hola, ¿cómo te va?'
}

let payload2: Respuesta<boolean> = {
    type: 'error',
    success: false,
    message: true
}

/*
*Tipos genéricos en funciones
 */
interface Post {id: number}
interface Nota extends Post { mensaje: string }
interface NotaColorida extends Nota { color: string }
interface Foto extends Post { url: string }
interface Video extends Foto { duracion: number }


/*Nota:
1- Como en los casos anteriores podemos colocar multiples parámetros genéricos en la función
e igual que los otros casos podemos manejar que es opcional y que es obligatorio.

2- Podemos limitar los tipos de datos que puede recibir un genérico. En este ejemplo lo
hicimos usando una interfáz Post e hicimos que publicación extendiera de ella para limitar
*/

function subir<
    Publicacion extends Post,
    Extra>
    (publicacion: Publicacion, extra?: Extra): Publicacion {
        return publicacion
}

/*Esta forma de llamar a la función genérica no se usa, 
sino que se usa la inferencia de datos */

//!  let x = subir<Nota>({mensaje:'Hola mundo'}) 

/*Entonces: */

let post: Nota = { id: 0, mensaje: 'Hola mundo' }
let upload = subir(post)

/*
!--------------------------------------------------------------
*/



