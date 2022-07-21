class Productos {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

class Carrito {
  constructor(id) {
    this.id = id;
    this.productos = [];
  }
  obtenerTotal() {
    let total = 0;
    for (let i = 0; i < this.productos.length; i++) {
      total = total + this.productos[i].precio;
    }
    return total;
  }
}

let productoUno = new Productos(1, "Cupcakes", 1500, 0);
let productoDos = new Productos(2, "The Simpsons", 1500, 0);
let productoTres = new Productos(3, "Monster INC", 1500, 0);
let productoCuatro = new Productos(4, "Stitch", 1500, 0);
let productoCinco = new Productos(5, "Paltas Love's", 1500, 0);
let productoSeis = new Productos(6, "Grey's Anatomy", 1500, 0);
let productoSiete = new Productos(7, "Cactus", 1500, 0);
let productoOcho = new Productos(8, "Dreams", 1500, 0);
let productoNueve = new Productos(9, "Cookies", 1500, 0);
let productoDiez = new Productos(10, "Sponge Bob", 1500, 0);
let productoOnce = new Productos(11, "Stranger Things", 1500, 0);
let productoDoce = new Productos(12, "Pig", 1500, 0);
let fotosProductos = document.querySelector("#pijamas");
let carrito = new Carrito(1);

let crearCatalogo = [];
let catalogoDeProductos = [];

crearCatalogo.push(productoUno);
crearCatalogo.push(productoDos);
crearCatalogo.push(productoTres);
crearCatalogo.push(productoCuatro);
crearCatalogo.push(productoCinco);
crearCatalogo.push(productoSeis);
crearCatalogo.push(productoSiete);
crearCatalogo.push(productoOcho);
crearCatalogo.push(productoNueve);
crearCatalogo.push(productoDiez);
crearCatalogo.push(productoOnce);
crearCatalogo.push(productoDoce);

function empujar() {
  catalogoDeProductos.push(productoUno);
  catalogoDeProductos.push(productoDos);
  catalogoDeProductos.push(productoTres);
  catalogoDeProductos.push(productoCuatro);
  catalogoDeProductos.push(productoCinco);
  catalogoDeProductos.push(productoSeis);
  catalogoDeProductos.push(productoSiete);
  catalogoDeProductos.push(productoOcho);
  catalogoDeProductos.push(productoNueve);
  catalogoDeProductos.push(productoDiez);
  catalogoDeProductos.push(productoOnce);
  catalogoDeProductos.push(productoDoce);
}

crearCatalogo.forEach((producto) => {
  fotosProductos.innerHTML += crearFoto(producto);
});

function crearFoto(producto) {
  let fotoCreada = `
    <div class="fotos col-sm-12 col-md-4 col-lg-4 col-xl-2 my-2">
      <a href="#" target="_blank">
        <img class="fotos1 p-2 w-100" src="Imagenes/pijama${producto.id}.png" alt="pijama${producto.id}">
      </a>
        <h5 id="producto${producto.id}" class="title d-flex justify-content-center my-2">${producto.nombre}</h5>
        <a id="${producto.id}" class="botonDeCompra btn btn-primary d-flex justify-content-center">$ ${producto.precio}</a>
    </div>`;
  return fotoCreada;
}

function vaciarCarrito() {
  let carritoDeCompra = document.querySelector("#carrito");
  carritoDeCompra.innerHTML = "";
}

function cantidadCarrito(carrito) {
  return carrito;
}

function sumarCarreta() {
  let carreta = cantidadCarrito(carrito.productos.length);
  let carritoCompra = document.getElementById("cantidadCarrito");
  carritoCompra.innerText = carreta;
  renovarStorage();
}

///<!-- ////////////////////PRODUCTO DE CARRITO//////////////////////// -->///
function productosCarrito(producto) {
  let tarjetaProducto = `
    <td class="m-0"><h6 id="producto${producto.id} class="titleDos">${producto.nombre}</h6></td>
    <td class="m-0"><span><b>$${producto.precio}</b></span></td>
    <td><button type="button" class="btn btn-success w-100"><i class="fa-solid fa-plus w-100 fs-6"></i></button></td>
    <td><span class=""><b>${producto.cantidad}</b></span></td>
    <td><button type="button" class="btn btn-secondary w-100"><i class="fa-solid fa-minus w-100 fs-6"></i></button></td>
    <td><button type="button" class="botonBorrar btn btn-danger w-100"><i id=${producto.id} class="fa-solid fa-trash-can w-100"></i></button></td>`;
  return tarjetaProducto;
}

function agregarAlCarrito() {
  let carritoDeCompra = document.querySelector("#carrito");
  let tituloCarrito = document.querySelector("#offcanvas");
  carrito.productos.forEach((producto) => {
    carritoDeCompra.innerHTML += productosCarrito(producto);
  });
  tituloCarrito.innerHTML = `<p>Precio Total: $${totales()}</p>`;

  ///<!-- ////////////////////BOTON DE BORRAR//////////////////////// -->///
  let botonBorrar = document.querySelectorAll(".botonBorrar");
  let arrayDeBotonBorrar = Array.from(botonBorrar);
  arrayDeBotonBorrar.find((boton) => {
    boton.addEventListener("click", (e) => {
      const item = carrito.productos.find(
        (producto) => producto.id == e.target.id
      );
      console.log(item);
      const indice = carrito.productos.indexOf(item);
      carrito.productos.splice(indice, 1);
      console.log(carrito);
      vaciarCarrito();
      agregarAlCarrito();
      renovarStorage();
    });
  });
}

let botones = document.querySelectorAll(".botonDeCompra");
let arrayDeBotones = Array.from(botones);
arrayDeBotones.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const productoSeleccionado = catalogoDeProductos.find(
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
    vaciarCarrito();
    agregarAlCarrito();
    sumarCarreta();
  });
});

function sumar(productoSeleccionado) {
  productoSeleccionado.cantidad += 1;
  console.log(`tienes ${productoSeleccionado.cantidad}`);
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

function listaActualizada(storage2) {
  storage2.forEach((producto) => {
    catalogoDeProductos.push(producto);
  });
}

function renovarStorage() {
  localStorage.removeItem("carrito");
  localStorage.removeItem("catalogo");
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("catalogo", JSON.stringify(catalogoDeProductos));
}

window.addEventListener("DOMContentLoaded", (e) => {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  const storage2 = JSON.parse(localStorage.getItem("catalogo"));

  storage == null
    ? renovarStorage()
    : storage.productos.forEach((producto) => {
        carrito.productos.push(producto);
      });

  const cantidades = carrito.productos.length == 0 ? true : false;
  cantidades ? empujar() : listaActualizada(storage2);
  agregarAlCarrito(carrito);
  sumarCarreta();
});
