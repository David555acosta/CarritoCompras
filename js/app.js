const Fragment = document.createDocumentFragment();
const Botones = document.querySelectorAll(".btn-primary");
const Carrito = document.getElementById("carrito");
const Template = document.getElementById("template");
//.target devolverá el elemento exacto en el que se hizo clic, permitiendo manipularlo o acceder a sus propiedades
const CarritoObjeto = [];

const MostrarCarrito = () => {
  Carrito.textContent = "";

  CarritoObjeto.forEach((item) => {
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

  const Posicion = CarritoObjeto.findIndex((item) => {
    return item.titulo === Producto.titulo;
  });

  if (Posicion === -1) {
    CarritoObjeto.push(Producto);
  } else {
    CarritoObjeto[Posicion].cantidad++;
  }

  MostrarCarrito();
};

Botones.forEach((item) => {
  item.addEventListener("click", AgregarCarrito);
});
