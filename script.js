// Obtenemos los elementos del HTML que vamos a controlar con JavaScript.
const botonDesplegable = document.getElementById("boton-desplegable");
const valorSeleccionado = document.getElementById("valor-seleccionado");
const listaOpciones = document.getElementById("lista-opciones");
const flecha = document.getElementById("flecha");
const mensaje = document.getElementById("mensaje");

// Guardamos todas las opciones de la lista en una colección.
const opciones = document.querySelectorAll("#lista-opciones li");

// Esta variable recuerda si el menú está abierto o cerrado.
let menuAbierto = false;

// Esta variable guarda la opción que el usuario ha seleccionado.
let opcionActual = null;

// Abre o cierra el menú cuando se presiona el botón principal.
botonDesplegable.addEventListener("click", () => {
    if (menuAbierto) {
        cerrarMenu(); // Si ya está abierto, lo cerramos.
    } else {
        abrirMenu(); // Si está cerrado, lo abrimos.
    }
});

// Muestra la lista de opciones y actualiza el estado del botón.
function abrirMenu() {
    listaOpciones.hidden = false; // Hace visible la lista.
    botonDesplegable.setAttribute("aria-expanded", "true"); // Informa que el menú está abierto.
    flecha.textContent = "⌃"; // Cambia la flecha hacia arriba.
    menuAbierto = true; // Guarda que el menú está abierto.

    // Si ya hay una opción seleccionada, el foco comienza allí.
    if (opcionActual) {
        opcionActual.focus();
    } else {
        opciones[0].focus(); // Si no hay selección, enfoca la primera opción.
    }
}

// Oculta la lista y devuelve el foco al botón principal.
function cerrarMenu() {
    listaOpciones.hidden = true; // Oculta las opciones.
    botonDesplegable.setAttribute("aria-expanded", "false"); // Informa que está cerrado.
    flecha.textContent = "⌄"; // Vuelve a mostrar la flecha hacia abajo.
    menuAbierto = false; // Guarda que el menú está cerrado.
}

// Selecciona una opción, actualiza el texto y cierra el menú.
function seleccionarOpcion(opcion) {
    valorSeleccionado.textContent = opcion.dataset.value; // Coloca el texto elegido en el botón.
    opcionActual = opcion; // Guarda la opción seleccionada.

    // Recorremos todas las opciones para actualizar su estado visual y accesible.
    opciones.forEach((elemento) => {
        const estaSeleccionada = elemento === opcion; // Comprueba si es la opción elegida.
        elemento.classList.toggle("seleccionada", estaSeleccionada); // Agrega o quita el estilo.
        elemento.setAttribute("aria-selected", estaSeleccionada); // Actualiza el estado accesible.
    });

    mensaje.textContent = "Seleccionaste: " + opcion.dataset.value; // Muestra la selección.
    cerrarMenu(); // Cierra la lista después de seleccionar.
    botonDesplegable.focus(); // Devuelve el foco al botón.
}

// Detecta cuando el usuario hace clic en cualquiera de las opciones.
opciones.forEach((opcion) => {
    opcion.addEventListener("click", () => {
        seleccionarOpcion(opcion); // Ejecuta la selección de la opción pulsada.
    });
});

// Cierra el menú si el usuario hace clic fuera del desplegable.
document.addEventListener("click", (evento) => {
    const clicDentro = evento.target.closest(".desplegable"); // Comprueba si el clic fue dentro.

    if (!clicDentro && menuAbierto) {
        cerrarMenu(); // Cierra el menú cuando el clic fue por fuera.
    }
});

// Permite manejar las opciones usando las teclas del teclado.
listaOpciones.addEventListener("keydown", (evento) => {
    const opcionEnfocada = document.activeElement; // Identifica la opción que tiene el foco.
    const indiceActual = Array.from(opciones).indexOf(opcionEnfocada); // Obtiene su posición.

    if (evento.key === "ArrowDown") {
        evento.preventDefault(); // Evita que la página se desplace.
        const siguiente = (indiceActual + 1) % opciones.length; // Calcula la siguiente posición.
        opciones[siguiente].focus(); // Mueve el foco hacia abajo.
    }

    if (evento.key === "ArrowUp") {
        evento.preventDefault(); // Evita el desplazamiento de la página.
        const anterior = (indiceActual - 1 + opciones.length) % opciones.length; // Calcula la posición anterior.
        opciones[anterior].focus(); // Mueve el foco hacia arriba.
    }

    if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault(); // Evita la acción predeterminada de la tecla.
        if (opcionEnfocada.matches('[role="option"]')) {
            seleccionarOpcion(opcionEnfocada); // Selecciona la opción enfocada.
        }
    }

    if (evento.key === "Escape") {
        cerrarMenu(); // Cierra el menú al presionar Escape.
        botonDesplegable.focus(); // Devuelve el foco al botón.
    }
});

// Permite abrir el menú con las teclas Enter o Espacio desde el botón.
botonDesplegable.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault(); // Evita que el navegador active otra acción.
        abrirMenu(); // Abre el menú.
    }

    if (evento.key === "ArrowDown") {
        evento.preventDefault(); // Evita el desplazamiento de la página.
        abrirMenu(); // Abre la lista para navegar por ella.
    }
});
