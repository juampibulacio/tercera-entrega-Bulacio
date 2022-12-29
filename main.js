class Libro {
    constructor(nombre, id, paginas, autor, precio, genero) {
        this.nombre = nombre;
        this.id = id;
        this.paginas = paginas;
        this.autor = autor; 
        this.precio = precio;
        this.genero = genero;
        this.cantidad = 1; 
    }
}

//arrays 
const libros = [];

libros.push(new Libro("Los suicidas del fin del mundo", 1, 274, "Leila Guerriero", 3000, "Crónica"));
libros.push(new Libro("Los libros de la buena memoria", 2, 500, "Leonidas Lamborghini", 2500, "Novela Fantástica"));
libros.push(new Libro("Facundo", 3, 262, "Domingo F Sarmiento", 1000, "Ensayo"));
libros.push(new Libro("Mimesis", 4, 560, "Erich Auerbach", 3500, "Teoría Literaria"));

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorLibros = document.getElementById("contenedorLibros");

const mostrarLibros = () => {
    libros.forEach( Libro => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div>
                    <h2>${Libro.nombre}</h2>
                    <h3>$${Libro.precio}</h3>
                    <h4>${Libro.autor}</h4>
                    <p>${Libro.genero}</p>
                    <button class="btn" id="boton ${Libro.id}"> Agregar al carrito </button>
                
            </div>
                    `

    contenedorLibros.appendChild(card);

    const boton = document.getElementById(`boton ${Libro.id}`);
    boton.addEventListener("click", () => {
        agregarAlCarrito(Libro.id);
    })
            
    })
}


mostrarLibros();

const agregarAlCarrito = (id) => {
    const LibroenCarrito = carrito.find(Libro => Libro.id === id);
    if(LibroenCarrito) {
        LibroenCarrito.cantidad++;
    } else {
        const Libro = libros.find(Libro => Libro.id === id);
        carrito.push(Libro);

    }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularTotal();
    
    

}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "",

    carrito.forEach(Libro => {
        const card = document.createElement("div");

        card.innerHTML = `
                <div>
                    
                        <h2>${Libro.nombre}</h2>
                        <h3>${Libro.precio}</h3>
                        <h4>${Libro.autor}</h4>
                        <h2>${Libro.cantidad}</h2>
                        <button class="btn" id="menosUno${Libro.id}"> Eliminar Uno </button>
                        <button class="btn" id="eliminar${Libro.id}"> Eliminar Todos </button>
                        

                        

                   
                </div>
                    `

        contenedorCarrito.appendChild(card);
       

        const boton = document.getElementById(`eliminar${Libro.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(Libro.id)

        })
        
        const botonDisminuir = document.getElementById(`menosUno${Libro.id}`);
        botonDisminuir.addEventListener("click", () => {
            eliminarUno(Libro.id)
        })

    })
    calcularTotal();
}




const eliminarDelCarrito = (id) => {
    const Libro = carrito.find(Libro => Libro.id === id);
    const indice = carrito.indexOf(Libro);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const eliminarUno = (id) => {
    const LibroenCarrito = carrito.find(Libro => Libro.id === id);
    if(LibroenCarrito.cantidad > 1){
        LibroenCarrito.cantidad--;
    }else {
        eliminarDelCarrito(LibroenCarrito.id)
    }
    mostrarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener ("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total"); 

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(Libro => {
        totalCompra = totalCompra + Libro.precio * Libro.cantidad;
    })
    total.innerHTML = ` $${totalCompra}`;
}