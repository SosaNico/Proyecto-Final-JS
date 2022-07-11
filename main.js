class Productos{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito{
    constructor(id){
        this.id = id;
        this.productos = [];
    }
    obtenerTotal(){
        let total = 0;
        for(let i = 0; i < this.productos.length; i++){
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

catalogoDeProductos.forEach(producto =>{
    fotosProductos.innerHTML += crearFoto(producto);
})

function crearFoto(producto){
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

function vaciarCarrito(){
    let carritoDeCompra = document.querySelector("#carrito");
    carritoDeCompra.innerHTML = "";
}

function agregarAlCarrito(){
    let carritoDeCompra = document.querySelector("#carrito");
    carrito.productos.forEach(producto =>{
        carritoDeCompra.innerHTML += crearFoto(producto);
    })
    carritoDeCompra.innerHTML += `<h3>Precio Total: $ ${carrito.obtenerTotal()}</h3>`;
}

let carrito = new Carrito(1);

let botones = document.querySelectorAll(".botonDeCompra");
let arrayDeBotones = Array.from(botones);
arrayDeBotones.forEach(boton =>{
    boton.addEventListener("click", (e) =>{
        let productoSeleccionado = catalogoDeProductos.find(producto => producto.id == e.target.id);
        carrito.productos.push(productoSeleccionado);
        console.log(carrito);
        vaciarCarrito();
        agregarAlCarrito();
    })
})