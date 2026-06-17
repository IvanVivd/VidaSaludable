// ===========================
// MENU DE NAVEGACION (MOVIL)
// ===========================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("nav--abierto");

    const abierto = navMenu.classList.contains("nav--abierto");
    menuToggle.setAttribute("aria-expanded", abierto);
  });

  // cerrar el menu al hacer click en un link (solo se nota en movil)
  const links = navMenu.querySelectorAll(".nav__link");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("nav--abierto");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===========================
// ANIO ACTUAL EN EL FOOTER
// ===========================
const anioActual = document.getElementById("anioActual");
if (anioActual) {
  anioActual.textContent = new Date().getFullYear();
}

// ===========================
// VALIDACION DEL FORMULARIO DE CONTACTO
// ===========================
const formContacto = document.getElementById("formContacto");

function mostrarError(input, spanError, mensaje) {
  spanError.textContent = mensaje;
  input.classList.add("campo--invalido");
}

function limpiarError(input, spanError) {
  spanError.textContent = "";
  input.classList.remove("campo--invalido");
}

function validarEmail(valor) {
  // formato basico: algo@algo.algo
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(valor);
}

if (formContacto) {
  formContacto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    const errorNombre = document.getElementById("errorNombre");
    const errorEmail = document.getElementById("errorEmail");
    const errorMensaje = document.getElementById("errorMensaje");

    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.textContent = "";

    let formularioValido = true;

    // validar nombre
    if (nombre.value.trim().length < 3) {
      mostrarError(nombre, errorNombre, "Escribe al menos 3 caracteres.");
      formularioValido = false;
    } else {
      limpiarError(nombre, errorNombre);
    }

    // validar correo
    if (!validarEmail(email.value.trim())) {
      mostrarError(email, errorEmail, "Ingresa un correo valido, ej: nombre@correo.com");
      formularioValido = false;
    } else {
      limpiarError(email, errorEmail);
    }

    // validar mensaje
    if (mensaje.value.trim().length < 10) {
      mostrarError(mensaje, errorMensaje, "El mensaje debe tener al menos 10 caracteres.");
      formularioValido = false;
    } else {
      limpiarError(mensaje, errorMensaje);
    }

    if (formularioValido) {
      mensajeExito.textContent = "Gracias, " + nombre.value.trim() + ". Tu mensaje fue enviado correctamente.";
      formContacto.reset();
    }
  });
}
