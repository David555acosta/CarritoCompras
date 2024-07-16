const Fragment = document.createDocumentFragment();
const Botones = document.querySelectorAll(".btn-primary");
const Carrito = document.getElementById("carrito");
const Template = document.getElementById("template");
//.target devolverá el elemento exacto en el que se hizo clic, permitiendo manipularlo o acceder a sus propiedades
const CarritoObjeto = {};

const MostrarCarrito = (Producto) => {
  Carrito.textContent = "";

  Object.values(CarritoObjeto).forEach((item) => {
    const Clone = Template.content.cloneNode(true);
    Clone.querySelector(".lead").textContent = item.titulo;
    Clone.querySelector(".bg-primary").textContent = item.cantidad;

    Fragment.appendChild(Clone);
  });

  Carrito.appendChild(Fragment);
};

const AgregarCarrito = (e) => {
  const Producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
  };

  if (CarritoObjeto.hasOwnProperty(Producto.titulo)) {
    Producto.cantidad = CarritoObjeto[Producto.titulo].cantidad + 1;
  }

  CarritoObjeto[Producto.titulo] = Producto;

  MostrarCarrito(Producto);
};

Botones.forEach((item) => {
  item.addEventListener("click", AgregarCarrito);
});
