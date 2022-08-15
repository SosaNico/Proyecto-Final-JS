class Carrito {
  constructor(id) {
    this.id = id;
    this.productos = [];
  }
}

let fotosDeProductos = document.querySelector("#pijamas");
let carrito = new Carrito(1);
let crearCatalogo = [];
const storage = JSON.parse(localStorage.getItem("carrito"));

window.addEventListener("DOMContentLoaded", (e) => {
  storage == null
    ? renovarStorage()
    : storage.productos.forEach((producto) => {
        carrito.productos.push(producto);
      });
  agregarAlCarrito(carrito);
  contadorCarrito();
  obtenerJason();
});

function catalogoSincronico() {
  crearCatalogo.forEach((producto) => {
    fotosDeProductos.innerHTML += crearFoto(producto);
    botonCompra();
  });
}

///<!-- ////////////////////PRODUCTOS DE PAGINA//////////////////////// -->///

function crearFoto(producto) {
  const fotoCreada = `<div class="fotos col-sm-12 col-md-4 col-lg-4 col-xl-2 my-2">
                      <a href="#" target="_blank">
                        <img class="fotos1 p-2 w-100" src="Imagenes/pijama${producto.id}.png" alt="pijama${producto.id}">
                      </a>
                      <h5 id="producto${producto.id}" class="title d-flex justify-content-center my-2">${producto.nombre}</h5>
                      <a id="${producto.id}" class="botonDeCompra btn btn-primary d-flex justify-content-center">$ ${producto.precio}</a>
                    </div>`;
  return fotoCreada;
}

function productosCarrito(producto) {
  const tarjetaProducto = ` <td class="m-0"><h6 id="producto${producto.id} class="titleDos">${producto.nombre}</h6></td>
                            <td class="m-0"><span><b>$${producto.precio}</b></span></td>
                            <td><button id="${producto.id}" type="button" class="botonSumar btn btn-success w-100"><i id="${producto.id}"   class="fa-solid fa-plus w-100 fs-6"></i></button></td>
                            <td><span class=""><b>${producto.cantidad}</b></span></td>
                            <td><button id="${producto.id}" type="button" class="botonRestar btn btn-secondary w-100"><i id="${producto.id}"  class="fa-solid fa-minus w-100 fs-6"></i></button></td>
                            <td><button id="${producto.id}" type="button" class="botonBorrar btn btn-danger w-100"><i id=${producto.id}   class="fa-solid fa-trash-can w-100"></i></button></td>`;
  return tarjetaProducto;
}

function agregarAlCarrito() {
  let canvasCarrito = document.querySelector("#carrito");
  let totalDeProductos = document.querySelector("#offcanvas");
  carrito.productos.forEach((producto) => {
    canvasCarrito.innerHTML += productosCarrito(producto);
  });
  totalDeProductos.innerHTML = `<p>Precio Total: $${totales()}</p>`;
  botonSumar();
  botonRestar();
  botonVaciar();
  finalizarCompra();
}

function botonCompra() {
  const botones = document.querySelectorAll(".botonDeCompra");
  const arrayDeBotones = Array.from(botones);
  arrayDeBotones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const productoSeleccionado = crearCatalogo.find(
        (producto) => producto.id == e.target.id
      );
      const chequeo = carrito.productos.find(
        (producto) => producto.id == e.target.id
      );
      const chequeoDeCarrito = carrito.productos.some(
        (producto) => producto.id == e.target.id
      );
      chequeoDeCarrito
        ? sumar(chequeo)
        : carrito.productos.push(productoSeleccionado) &&
          sumar(productoSeleccionado);
      Toastify({
        text: `¡Producto añadido al carrito!`,
        className: "info",
        position: "left",
        gravity: "bottom",
        duration: 1000,
        style: {
          background:
            "linear-gradient(120deg, #79fb00, #8d01a0, #031ba5, #ff004c, #e6036d, #fb0094, #ff6600, #04c2e4, #adad02, #00c3ff);",
        },
      }).showToast();
      vaciarTabla();
      agregarAlCarrito();
      contadorCarrito();
      finalizarCompra();
    });
  });
  renovarStorage();
}

function botonSumar() {
  const sumarProducto = document.getElementsByClassName("botonSumar");
  const arrayDeBotonSumar = Array.from(sumarProducto);
  arrayDeBotonSumar.find((boton) => {
    boton.addEventListener("click", (e) => {
      const item = carrito.productos.find(
        (producto) => producto.id == e.target.id
      );
      const chequearItem = carrito.productos.some(
        (producto) => producto.id == e.target.id
      );
      chequearItem ? sumar(item) && agregarAlCarrito() : console.log(item);
      vaciarTabla();
      agregarAlCarrito();
      renovarStorage();
    });
  });
}
function botonRestar() {
  const botonRestar = document.querySelectorAll(".botonRestar");
  const arrayDeBotonRestar = Array.from(botonRestar);
  arrayDeBotonRestar.find((boton) => {
    boton.addEventListener("click", (e) => {
      const item = carrito.productos.find(
        (producto) => producto.id == e.target.id
      );
      const chequearItem = carrito.productos.some(
        (producto) => producto.id == e.target.id
      );

      chequearItem ? restar(item) && agregarAlCarrito() : eliminar(item);

      item.cantidad == 0 ? eliminar(item) : console.log(carrito);
      vaciarTabla();
      agregarAlCarrito();
      contadorCarrito();
      renovarStorage();
      finalizarCompra();
    });
  });
}

function botonVaciar() {
  const botonBorrar = document.querySelectorAll(".botonBorrar");
  const arrayDeBotonBorrar = Array.from(botonBorrar);
  arrayDeBotonBorrar.find((boton) => {
    boton.addEventListener("click", (e) => {
      Swal.fire({
        title: "¿Quieres borrar el producto del carrito?",
        text: "Es una acción que no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Producto eliminado!",
            "Tu producto se ha eliminado del carrito.",
            "success"
          );
          const item = carrito.productos.find(
            (producto) => producto.id == e.target.id
          );
          item.cantidad = 0;
          eliminar(item);
          vaciarTabla();
          agregarAlCarrito();
          contadorCarrito();
          renovarStorage();
          finalizarCompra();
        }
      });
    });
  });
}

function contadorCarrito() {
  const carreta = carrito.productos.length;
  let carritoCompra = document.getElementById("cantidadCarrito");
  carritoCompra.innerText = carreta;
  renovarStorage();
}

function vaciarTabla() {
  let carritoDeCompra = document.querySelector("#carrito");
  carritoDeCompra.innerHTML = "";
}

function vaciarCarro() {
  crearCatalogo.forEach((prod) => {
    prod.cantidad = 0;
  });
  carrito.productos.length = 0;
  contadorCarrito();
}

function sumar(productoSeleccionado) {
  productoSeleccionado.cantidad += 1;
  return;
}

function restar(productoSeleccionado) {
  productoSeleccionado.cantidad -= 1;
  return;
}

function totales() {
  let precioTotal = 0;
  carrito.productos.forEach((producto) => {
    const total = producto.precio * producto.cantidad;
    precioTotal += total;
  });
  return precioTotal;
}

function eliminar(item) {
  const indice = carrito.productos.indexOf(item);
  carrito.productos.splice(indice, 1);
}

function finalizarCompra() {
  const comprar = document.getElementById("finalizarCompra");
  comprar.innerHTML = `<a><button id="botoncito" type="button" class="btn btn-success">Finalizar Compra</button></a>`;
  const finalizarCompra = document.getElementById("botoncito");
  carrito.productos.length == 0
    ? (comprar.innerHTML = "")
    : finalizarCompra.addEventListener("click", (e) => {
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Compra realizada con exito!",
          showConfirmButton: false,
          timer: 1500,
        });
        comprar.innerHTML = "";
        vaciarTabla();
        vaciarCarro();
        agregarAlCarrito();
        renovarStorage();
      });
}

function renovarStorage() {
  localStorage.removeItem("carrito");
  localStorage.removeItem("catalogo");
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("catalogo", JSON.stringify(carrito.productos));
}

function cargarData(data) {
  data.forEach((prod) => {
    crearCatalogo.push(prod);
  });
}

async function obtenerJason() {
  try {
    const res = await fetch("json/productos.json");
    const data = await res.json();
    cargarData(data);
    renovarStorage();
  } catch (error) {
    console.log(error);
  }
  catalogoSincronico();
}
