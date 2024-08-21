// ARRAY PARA LA TIENDA
const tienda = [
    {id: 1, nombre: "Auriculares", precio: 20000},
    {id: 2, nombre: "Auriculares Bluetooth", precio: 30000},
    {id: 3, nombre: "Fundas", precio: 8000},
    {id: 4, nombre: "Cargador", precio: 5000},
    {id: 5, nombre: "Bateria", precio: 10000},
    {id: 6, nombre: "Modulo de pantalla", precio: 120000}
]

// Variables 

let total = 0
let cantidadProductos = 0

// FUNCIONES

/********************************************************************/

function agregarAlCarrito(opcion) {
    if (opcion > 0 && opcion <= tienda.length) {
        const producto = tienda[opcion - 1]
        console.log(`${producto.nombre} se agregó al carrito`)
        total += producto.precio
        cantidadProductos++
    } else {
        console.warn("Opción no válida")
    }
}

/********************************************************************/

function aplicarDescuento(total, porcentaje = 10) {
    if (total > 25000) {
        console.log(`¡Superaste los $25.000 en tu compra, ganaste un descuento del ${porcentaje}%!`)
        return total * (1 - porcentaje / 100) 
    }
    return total
}

/********************************************************************/

function calificarTienda(puntuacion) {
    if (puntuacion >= 1 && puntuacion <= 5) {
        console.log(`Calificaste nuestra tienda con un ${puntuacion}. ¡Muchas gracias!`)
    } else {
        console.warn("Puntuación no válida. Por favor, ingresa un número del 1 al 5.")
    }
}

/********************************************************************/


//Recorrido del array
let mensaje = "¡Bienvenido a nuestra tienda!\nEstos son nuestros productos en stock:\n"
for (const producto of tienda) {
    mensaje += producto.id + ". " + producto.nombre + ": $" + producto.precio + "\n"
}
mensaje += "0. Finalizar\n"

// Interacción 
let opcion = parseInt(prompt(mensaje + "\nElegí el producto que deseas indicando su número"))

while (opcion !== 0) {
    agregarAlCarrito(opcion)
    opcion = parseInt(prompt(mensaje + "\nElegí el producto que deseas indicando su número"))
}

// Llamados 
total = aplicarDescuento(total)
console.log("Finalizaste tu compra. El total a pagar es: $" + total)
console.log("Cantidad de productos: " + cantidadProductos)

// Interacción  
let puntuacion = parseInt(prompt("Califica del 1 al 5 nuestra tienda, donde 1 es 'no me gustó' y 5 es 'me encantó':"))
calificarTienda(puntuacion)
