/*MENÚ HAMBURGUESA*/

document.getElementById("menu-button").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-menu");
  navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
});

let nuevoCarrito = [];
let contenedorTarjetas = document.getElementById("productos-container");
let productos = [];

// FETCH y crear las tarjetas de los productos:
fetch("./db/data.JSON")
  .then(response => response.json())
  .then(data => {
    productos = data; // Asigna los productos a la variable global
    data.forEach(producto => {
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList.add('tarjeta-producto');
      nuevoProducto.innerHTML = `<img src="${producto.img}" alt="${producto.nombre}">
                                 <h3>${producto.nombre}</h3>
                                 <span>Precio: $${producto.precio}</span>
                                 <button class="boton-agregar" id="boton-${producto.id}">Agregar al carrito</button> `;
      contenedorTarjetas.appendChild(nuevoProducto);
    });

    agregarAlCarrito(); // Llama a la función después de cargar los productos
  });

function agregarAlCarrito() {
  const agregarBoton = document.querySelectorAll(".boton-agregar");
  agregarBoton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productoId = e.currentTarget.id.split("-")[1];
      const seleccionarProducto = productos.find(
        (producto) => producto.id == productoId
      );
      nuevoCarrito.push(seleccionarProducto);
      console.log(nuevoCarrito);
      localStorage.setItem("nuevoCarrito", JSON.stringify(nuevoCarrito));

     
      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "center", 
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true, 
      }).showToast();
    });
  });
}

