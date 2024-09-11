// Variables
let carritoStorage = localStorage.getItem("nuevoCarrito");
carritoStorage = JSON.parse(carritoStorage) || [];

let contenedorCarrito = document.getElementById("seccion-carrito");
let totalPagar = document.getElementById("total-pagar");
let contadorCarrito = document.getElementById("contadorCarrito");

// Función para mostrar los productos en el carrito

function verCarrito(productoCarrito) {
  contenedorCarrito.innerHTML = "";
  let total = 0;
  productoCarrito.forEach((producto, index) => {
    const tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("tarjeta-carrito");
    tarjetaProducto.innerHTML = `
      <img src=".${producto.img}" alt="${producto.nombre}">
      <p>${producto.nombre}
      <span> Precio: $${producto.precio} </span>
      </p>

      <span class="conjunto-botones"> 
      <button class="sumar-button">+</button>
      <span class="counter">1</span>
      <button class="restar-button">-</button> <span>
      
      <button class="borrar-producto" data-index="${index}"><i class="bi bi-trash"></i></button>
    `;
    contenedorCarrito.appendChild(tarjetaProducto);
  });

  // EVENTOS

  document.querySelectorAll(".sumar-button").forEach((button, index) => {
    button.onclick = () => {
      let counter = document.querySelectorAll(".counter")[index];
      let contador = parseInt(counter.innerHTML);
      contador++;
      counter.innerHTML = contador;
      actualizarTotal();
      actualizarContadorCarrito();
    };
  });

  document.querySelectorAll(".restar-button").forEach((button, index) => {
    button.onclick = () => {
      let counter = document.querySelectorAll(".counter")[index];
      let contador = parseInt(counter.innerHTML);
      if (contador > 0) {
        contador--;
        counter.innerHTML = contador;
        actualizarTotal();
        actualizarContadorCarrito();
      }
    };
  });

  document.querySelectorAll(".borrar-producto").forEach((button) => {
    button.onclick = (e) => {
      let index = e.target
        .closest(".borrar-producto")
        .getAttribute("data-index");
      carritoStorage.splice(index, 1);
      localStorage.setItem("nuevoCarrito", JSON.stringify(carritoStorage));
      verCarrito(carritoStorage);
      actualizarTotal();
      actualizarContadorCarrito();
    };
  });

  actualizarTotal();
  actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  let contadorCarrito = document.getElementById("contadorCarrito");
  let contadorGuardado = localStorage.getItem("contadorCarrito");
  if (contadorGuardado) {
    contadorCarrito.innerHTML = contadorGuardado;
  }
});

document.getElementById("confirmar-compra").onclick = () => {
  window.location.href = "#calificar-tienda";
};

// FUNCIONES

function actualizarTotal() {
  let total = 0;
  carritoStorage.forEach((producto, index) => {
    let counter = document.querySelectorAll(".counter")[index];
    let cantidad = parseInt(counter.innerHTML);
    total += producto.precio * cantidad;
  });
  totalPagar.innerHTML = total;
}

function limpiarCarrito() {
  carritoStorage = [];

  localStorage.setItem("carrito", JSON.stringify(carritoStorage));

  verCarrito(carritoStorage);
  actualizarTotal();
  actualizarContadorCarrito();
}

document.getElementById("boton-limpiar").onclick = limpiarCarrito;

function actualizarContadorCarrito() {
  let totalItems = 0;
  carritoStorage.forEach((producto, index) => {
    let counter = document.querySelectorAll(".counter")[index];
    let cantidad = parseInt(counter.innerHTML);
    totalItems += cantidad;
  });
  contadorCarrito.innerHTML = totalItems;
  localStorage.setItem("contadorCarrito", totalItems); 
}

// Llamada
verCarrito(carritoStorage);
