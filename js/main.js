/*MENÚ HAMBURGUESA*/

document.getElementById("menu-button").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-menu")
  navMenu.style.display = navMenu.style.display === "block" ? "none" : "block"
})

// ARRAY PARA LA TIENDA
const productos = [
  { id: 1, nombre: "Auriculares", precio: 20000, img: "./img/auriculares.png" },
  { id: 2, nombre: "Auriculares Bluetooth", precio: 30000, img: "./img/auriculares-b.png" },
  { id: 3, nombre: "Fundas", precio: 8000, img: "./img/fundas.png" },
  { id: 4, nombre: "Cargador", precio: 5000, img: "./img/cargadores.png" },
  { id: 5, nombre: "Bateria", precio: 10000, img: "./img/baterias.png" },
  { id: 6, nombre: "Modulo de pantalla", precio: 120000, img: "./img/modulos.png" }
];

// Variable para almacenar en el carrito
let nuevoCarrito = [];

// Contenedor para las tarjetas de productos:
const contenedorTarjetas = document.getElementById("productos-container");

// Función para crear las tarjetas de los productos:
function crearTarjetasProductos(productos) {
  productos.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList.add("tarjeta-producto");
    nuevoProducto.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <span>Precio: $${producto.precio}</span>
      <button class="boton-agregar" id="boton-${producto.id}">Agregar al carrito</button>
    `;
    contenedorTarjetas.appendChild(nuevoProducto);
  });
  agregarAlCarrito();
}

crearTarjetasProductos(productos);

function agregarAlCarrito() {
  const agregarBoton = document.querySelectorAll(".boton-agregar");
  agregarBoton.forEach(button => {
    button.addEventListener("click", (e) => {
      const productoId = e.currentTarget.id.split('-')[1];
      const seleccionarProducto = productos.find(producto => producto.id == productoId);
      nuevoCarrito.push(seleccionarProducto);
      console.log(nuevoCarrito);
      localStorage.setItem("nuevoCarrito", JSON.stringify(nuevoCarrito));
    });
  });
}



