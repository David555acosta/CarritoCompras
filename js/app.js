const Fragment = document.createDocumentFragment();
const Contenedor = document.getElementById("carrito");
const Template = document.getElementById("template");
const Footer = document.getElementById("footer");
const TemplateFooter = document.getElementById("templateFooter");

// Arreglo del carrito
let Carrito = [];

// Evento para manejar los clics en los botones
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    AgregarCarrito(e);
  }
  if (e.target.matches(".btn-success")) {
    BtnAgregar(e);
  }
  if (e.target.matches(".btn-danger")) {
    BtnQuitar(e);
  }
  if (e.target.matches(".btn-outline-primary")) {
    BtnFinalizarCompra(e);
  }
  
});

// Función para agregar productos al carrito
const AgregarCarrito = (e) => {
  const Producto = {
    Titulo: e.target.dataset.fruta,
    Id: e.target.dataset.fruta,
    Cantidad: 1,
    Precio: parseInt(e.target.dataset.precio),
  };

  const Posicion = Carrito.findIndex((item) => item.Titulo === Producto.Titulo);

  if (Posicion === -1) {
    Carrito.push(Producto);
  } else {
    Carrito[Posicion].Cantidad++;
  }

  MostrarCarrito();
};

// Función para mostrar el carrito
const MostrarCarrito = () => {
  Fragment.textContent = "";
  Contenedor.textContent = "";
  Carrito.forEach((item) => {
    const Clone = Template.content.cloneNode(true);

    Clone.querySelector(".badge").textContent = item.Cantidad;
    Clone.querySelector(".text-uppercase .lead").textContent = item.Titulo;
    Clone.querySelector(".justify-content-between .lead span").textContent =
      item.Precio * item.Cantidad;
    Clone.querySelector(".btn-success").dataset.id = item.Id;
    Clone.querySelector(".btn-danger").dataset.id = item.Id;
    Fragment.appendChild(Clone);
  });
  Contenedor.appendChild(Fragment);
  MostrarFooter();
};

const MostrarFooter = () => {
  Footer.textContent = "";
  const Total = Carrito.reduce((acc, current) => {
    return acc + current.Cantidad * current.Precio;
  }, 0);
  const Clone = TemplateFooter.content.cloneNode(true);
  Clone.querySelector(".card-body .lead").textContent = Total;
  //Clone.querySelector(".card-body  .btn-outline-primary").dataset.id
  Footer.appendChild(Clone);
  BtnFinalizarCompra(e);
};

// Función para manejar el botón de agregar cantidad
const BtnAgregar = (e) => {
  const Id = e.target.dataset.id; // Obtener el ID del elemento en el que se hizo clic

  Carrito = Carrito.map((item) => {
    if (item.Id === Id) {
      // Comparar con el ID del producto en el carrito
      item.Cantidad++;
    }
    return item;
  });
  MostrarCarrito();
  BtnFinalizarCompra();
};

const BtnQuitar = (e) => {
  const Id = e.target.dataset.id;

  Carrito = Carrito.filter((item) => {
    if (item.Id === Id) {
      if (item.Cantidad > 1) {
        item.Cantidad--;
        return true;
      } else {
        return false;
      }
    }
    return true;
  });
  MostrarCarrito();
  BtnFinalizarCompra();
};

const BtnFinalizarCompra = () => {
  localStorage.setItem('Carrito', JSON.stringify(Carrito))
  document.querySelectorAll(".btn-primary, .btn-success, .btn-danger").forEach((btn) => {
    btn.disabled = true
  }) 
}
