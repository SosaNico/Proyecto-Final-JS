class Productos {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 0;
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

let catalogoDeProductos = [];
let productoUno = new Productos(1, "Cupcakes", 1500);
let productoDos = new Productos(2, "The Simpsons", 1500);
let productoTres = new Productos(3, "Monster INC", 1500);
let productoCuatro = new Productos(4, "Stitch", 1500);
let productoCinco = new Productos(5, "Paltas Love's", 1500);
let productoSeis = new Productos(6, "Grey's Anatomy", 1500);
let productoSiete = new Productos(7, "Cactus", 1500);
let productoOcho = new Productos(8, "Dreams", 1500);
let productoNueve = new Productos(9, "Cookies", 1500);
let productoDiez = new Productos(10, "Sponge Bob", 1500);
let productoOnce = new Productos(11, "Stranger Things", 1500);
let productoDoce = new Productos(12, "Pig", 1500);
let fotosProductos = document.querySelector("#pijamas");

let carrito = new Carrito(1);

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

catalogoDeProductos.forEach((producto) => {
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
                                                  ///<!-- ////////////////////CONTADOR DE CARRITO//////////////////////// -->///
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
    <td><span class=""><b>${producto.cantidad}</b></span></td>
    <td><button type="button" class="botonBorrar btn btn-danger w-100"><i id=${producto.id} class="fa-solid fa-trash-can w-100"></i></button></td>`;
  return tarjetaProducto;
}

function agregarAlCarrito() {
  let carritoDeCompra = document.querySelector("#carrito");
  carrito.productos.forEach((producto) => {
    carritoDeCompra.innerHTML += productosCarrito(producto);
  });
    carritoDeCompra.innerHTML += `<h5>Precio Total: $${carrito.obtenerTotal()}</h5>`;
                                                  ///<!-- ////////////////////BOTON DE BORRAR//////////////////////// -->///
  let botonBorrar = document.querySelectorAll(".botonBorrar");
  let arrayDeBotonBorrar = Array.from(botonBorrar);
    arrayDeBotonBorrar.find((boton) => {
      boton.addEventListener("click", (e) => {
        const item = carrito.productos.find(
          (producto) => producto.id == e.target.id
        );
        const indice = carrito.productos.indexOf(item);
          carrito.productos.splice(indice, 1);
      restar(item);
      vaciarCarrito();
      agregarAlCarrito();
      renovarStorage();
    });
  });
}
                                                  ///<!-- ////////////////////CANTIDADES DE PRODUCTOS-1//////////////////////// -->///
function restar(item) {
    item.cantidad -= 1;
      console.log(`tienes ${item.cantidad}`);
    return;
}
                                                  ///<!-- ////////////////////BOTON DE COMPRA//////////////////////// -->///
let botones = document.querySelectorAll(".botonDeCompra");

let arrayDeBotones = Array.from(botones);
arrayDeBotones.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    let productoSeleccionado = catalogoDeProductos.find((producto) => producto.id == e.target.id);
    carrito.productos.push(productoSeleccionado);
    sumar(productoSeleccionado);
    vaciarCarrito();
    agregarAlCarrito();
    sumarCarreta();
  });
});
                                                  ///<!-- ////////////////////CANTIDADES DE PRODUCTOS-2//////////////////////// -->///
function sumar(productoSeleccionado) {
    productoSeleccionado.cantidad += 1;
    console.log(`tienes ${productoSeleccionado.cantidad}`);
    return;
}
                                                  ///<!-- ////////////////////JSON & STORAGE//////////////////////// -->///
function renovarStorage() {
  localStorage.removeItem("carrito");
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.addEventListener("DOMContentLoaded", (e) => {
  let storage = JSON.parse(localStorage.getItem("carrito"));
    storage.productos.forEach((producto) => {
      carrito.productos.push(producto);
  });
  vaciarCarrito();
  agregarAlCarrito(carrito);
  sumarCarreta();
});
