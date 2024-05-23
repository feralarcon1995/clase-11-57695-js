// localstorage guarda el dato pese a que se recarge, cierre o apague la pc

//setItem es para guardar el dato
// let mensaje = localStorage.setItem('mensajeLocal', 'Hola');


//getItem es para obtener el dato
let mensaje = localStorage.getItem('mensajeLocal')

console.log(mensaje)








let productos = [
  {
    id: 'k123123asdas-12312',
    name: 'Coca Cola',
    price: 2700,
    img: 'https://picsum.photos/200/300',
    description: 'Coca Cola 2L'
  },
  {
    id: 'k123as-909090',
    name: 'Fernet Branca',
    price: 8000,
    img: 'https://picsum.photos/200/300',
    description: 'Fernet branca de cordoba capital papa'
  },
  {
    id: 'k456123asdas-12345',
    name: 'Pepsi',
    price: 2600,
    img: 'https://picsum.photos/200/300',
    description: 'Pepsi 2L'
  },
  {
    id: 'k789as-567890',
    name: 'Sprite',
    price: 2500,
    img: 'https://picsum.photos/200/300',
    description: 'Sprite 2L'
  },
  {
    id: 'k101112asdas-11213',
    name: '7Up',
    price: 2400,
    img: 'https://picsum.photos/200/300',
    description: '7Up 2L'
  },
  {
    id: 'k141516asdas-14151',
    name: 'Fanta',
    price: 2500,
    img: 'https://picsum.photos/200/300',
    description: 'Fanta 2L'
  },
  {
    id: 'k171819asdas-17181',
    name: 'Mirinda',
    price: 2400,
    img: 'https://picsum.photos/200/300',
    description: 'Mirinda 2L'
  },
  {
    id: 'k202122asdas-20212',
    name: 'Mountain Dew',
    price: 2600,
    img: 'https://picsum.photos/200/300',
    description: 'Mountain Dew 2L'
  },
  {
    id: 'k232425asdas-23242',
    name: 'Dr. Pepper',
    price: 2700,
    img: 'https://picsum.photos/200/300',
    description: 'Dr. Pepper 2L'
  },
  {
    id: 'k262728asdas-26272',
    name: 'Lipton Iced Tea',
    price: 2200,
    img: 'https://picsum.photos/200/300',
    description: 'Lipton Iced Tea 1.5L'
  },
  {
    id: 'k293031asdas-29292',
    name: 'Gatorade',
    price: 3000,
    img: 'https://picsum.photos/200/300',
    description: 'Gatorade 1.5L'
  },
  {
    id: 'k323334asdas-32332',
    name: 'Powerade',
    price: 3200,
    img: 'https://picsum.photos/200/300',
    description: 'Powerade 1.5L'
  },
  {
    id: 'k353637asdas-35352',
    name: 'Aquarius',
    price: 2100,
    img: 'https://picsum.photos/200/300',
    description: 'Aquarius 1.5L'
  },
  {
    id: 'k383940asdas-38382',
    name: 'Red Bull',
    price: 4500,
    img: 'https://picsum.photos/200/300',
    description: 'Red Bull 250ml'
  },
  {
    id: 'k414243asdas-41412',
    name: 'Monster Energy',
    price: 4800,
    img: 'https://picsum.photos/200/300',
    description: 'Monster Energy 500ml'
  },
  {
    id: 'k444546asdas-44442',
    name: 'V Power',
    price: 4600,
    img: 'https://picsum.photos/200/300',
    description: 'V Power 500ml'
  }
];

//para guardar un objeto/array en localStorage, tenemos que convertirlo con JSON.stringify
// let prd = localStorage.setItem('product', JSON.stringify(productos))

mostrarProductos();
mostrarCarrito();

function mostrarProductos() {
  let contenedor = document.querySelector('#productos');
  let productosHTML = '';

  for (const product of productos) {
    productosHTML += `
      <div class="card" id=${product.id}>
        <img src=${product.img} alt=${product.description}>
        <div class="card-product">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <b>$${product.price}</b>
          <button class="agregar-carrito" data-id=${product.id}>Agregar</button>
        </div>
      </div>
    `;
  }

  contenedor.innerHTML = productosHTML;

  document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const productoID = btn.getAttribute('data-id');
      agregarAlCarrito(productoID);
    });
  });
}

function agregarAlCarrito(productoID) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const products = productos.find(product => product.id === productoID);
  const productosEnCarrito = carrito.find(p => p.id === productoID);

  if (productosEnCarrito) {
    productosEnCarrito.cantidad += 1;
    productosEnCarrito.totalPrice = productosEnCarrito.cantidad * productosEnCarrito.price;
  } else {
    carrito.push({
      id: productoID,
      name: products.name,
      price: products.price,
      cantidad: 1,
      totalPrice: products.price
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let contenedorCarrito = document.querySelector('#contenedor-carrito');
  let footer = document.querySelector('#total');
  let carritoHTML = '';

  for (const p of carrito) {
    carritoHTML += `
      <div class="card-carrito" id=${p.id}>
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <p>Cantidad: ${p.cantidad}</p>
        <p>Total: $${p.totalPrice}</p>
        <button class="eliminar-carrito" data-id=${p.id}>Eliminar</button>
      </div>
    `;
  }

  contenedorCarrito.innerHTML = carritoHTML;

  document.querySelectorAll('.eliminar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      let btnDelete = btn.getAttribute('data-id');
      eliminarDelCarrito(btnDelete);
    });
  });

  let totalCarrito = carrito.reduce((acc, p) => acc + p.totalPrice, 0);

  footer.innerHTML = `Total: $${totalCarrito}`
}

function eliminarDelCarrito(deleteID) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const nuevoCarrito = carrito.filter(p => p.id !== deleteID);

  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  mostrarCarrito();
}

//sessionstorage guarda el dato hasta que se cierra el navegador
// let mensaje2 = sessionStorage.setItem('mensajeSession', 'holi');

