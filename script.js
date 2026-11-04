// Buscamos el botón principal del desplegable en el HTML.
const botonDesplegable = document.getElementById("botonDesplegable");

// Buscamos la lista que contiene todas las opciones.
const listaOpciones = document.getElementById("listaOpciones");

// Buscamos el texto que aparece dentro del botón.
const textoBoton = document.getElementById("textoBoton");

// Buscamos el mensaje que informa la selección.
const mensaje = document.getElementById("mensaje");

// Guardamos todos los botones que funcionan como opciones.
const opciones = document.querySelectorAll(".opcion");

// Esta variable guarda la opción elegida por el usuario.
let opcionSeleccionada = "";

// Esta función abre o cierra la lista de opciones.
function cambiarDesplegable() {
  // Comprueba si la lista está oculta.
  const estaCerrado = listaOpciones.hidden;

  // Cambia el estado de visibilidad de la lista.
  listaOpciones.hidden = !estaCerrado;

  // Actualiza el atributo para indicar si el menú está abierto.
  botonDesplegable.setAttribute("aria-expanded", estaCerrado);

  // Agrega o quita una clase para cambiar el aspecto del botón.
  botonDesplegable.classList.toggle("abierto", estaCerrado);
}

// Escucha el clic del botón y ejecuta la función anterior.
botonDesplegable.addEventListener("click", cambiarDesplegable);

// Recorremos todas las opciones para escuchar cuando se elija una.
opciones.forEach((opcion) => {
  // Detecta el clic sobre una opción específica.
  opcion.addEventListener("click", () => {
    // Guarda el valor de la opción pulsada.
    opcionSeleccionada = opcion.dataset.valor;

    // Muestra el elemento elegido dentro del botón.
    textoBoton.textContent = opcionSeleccionada;

    // Actualiza el mensaje debajo del desplegable.
    mensaje.textContent = `Has seleccionado: ${opcionSeleccionada}`;

    // Recorre nuevamente las opciones para actualizar el resaltado.
    opciones.forEach((elemento) => {
      // Compara cada opción con la que acaba de elegir el usuario.
      const esLaElegida = elemento.dataset.valor === opcionSeleccionada;

      // Agrega la clase solo a la opción elegida y la quita de las demás.
      elemento.classList.toggle("seleccionada", esLaElegida);

      // Informa a las tecnologías de asistencia cuál está seleccionada.
      elemento.setAttribute("aria-selected", esLaElegida);
    });

    // Cierra la lista después de elegir una opción.
    listaOpciones.hidden = true;

    // Indica que el desplegable está cerrado.
    botonDesplegable.setAttribute("aria-expanded", "false");

    // Quita el estilo de botón abierto.
    botonDesplegable.classList.remove("abierto");
  });
});

// Detecta clics en cualquier parte del documento.
document.addEventListener("click", (evento) => {
  // Comprueba que el clic haya sido fuera del desplegable.
  if (!evento.target.closest(".desplegable")) {
    // Oculta la lista si estaba abierta.
    listaOpciones.hidden = true;

    // Actualiza el estado accesible del botón.
    botonDesplegable.setAttribute("aria-expanded", "false");

    // Quita la apariencia de menú abierto.
    botonDesplegable.classList.remove("abierto");
  }
});

// Permite cerrar la lista al pulsar la tecla Escape.
document.addEventListener("keydown", (evento) => {
  // Comprueba si la tecla presionada fue Escape.
  if (evento.key === "Escape") {
    // Oculta la lista de opciones.
    listaOpciones.hidden = true;

    // Actualiza el estado del botón.
    botonDesplegable.setAttribute("aria-expanded", "false");

    // Retira la clase que indica que está abierto.
    botonDesplegable.classList.remove("abierto");

    // Devuelve el foco al botón principal.
    botonDesplegable.focus();
  }
});