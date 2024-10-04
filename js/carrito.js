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
      
      <button class="restar-button">-</button> 
      <span class="counter">1</span>
      <button class="sumar-button">+</button>
      <span>
      
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
      if (contador > 1) {
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

let volverTienda = document.getElementById("volver-tienda");

volverTienda.onclick = () => {
  window.location.href = "../index.html#tienda";
};

//eventos para confirmar compra y sweetalert

document
  .getElementById("confirmar-compra")
  .addEventListener("click", function () {
    Swal.fire({
      title: "Rellena tus datos",
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
        <input type="text" id="direccion" class="swal2-input" placeholder="Dirección">
        <input type="email" id="email" class="swal2-input" placeholder="Email">
      `,
      confirmButtonText: "Confirmar",
      focusConfirm: false,
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector("#nombre").value;
        const email = Swal.getPopup().querySelector("#email").value;
        if (!nombre || !email) {
          Swal.showValidationMessage(`Por favor, rellena ambos campos`);
        }
        return { nombre: nombre, email: email };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (carritoStorage.length === 0) {
          Swal.fire({
            title: "¡Carrito vacío!",
            text: "No agregaste ningún producto a tu carrito",
            icon: "warning",
            confirmButtonText: "Aceptar",
          });
        } else {
          const productosComprados = carritoStorage
            .map((producto) => `${producto.nombre} (Precio: $${producto.precio})`)
            .join("<br>");

          Swal.fire({
            title: "Compra Confirmada",
            html: `Compraste:<br>${productosComprados}`,
            icon: "success",
            confirmButtonText: "Calificar Tienda",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                input: "textarea",
                inputLabel:
                  "En CF Electronic valoramos mucho tu opinión, déjanos tu mensaje",
                inputPlaceholder: "Escribe tu mensaje aquí...",
                showCancelButton: true,
                confirmButtonText: "Enviar",
                cancelButtonText: "Cancelar",
              }).then((calificacionResult) => {
                if (calificacionResult.isConfirmed) {
                  const mensaje = calificacionResult.value.trim();

                  if (!mensaje) {
                    Swal.fire({
                      title: "Error",
                      text: "El campo de opinión no puede estar vacío.",
                      icon: "error",
                      confirmButtonText: "Aceptar",
                    });
                  } else {
                    Swal.fire("Agradecemos tu opinión", mensaje, "success");
                  }
                }
              });
            }
          });
        }
      }
    });
  });


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
