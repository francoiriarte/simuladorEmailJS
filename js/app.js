//VARIABLES
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const emailInput = document.querySelector("#email");
const asuntoInput = document.querySelector("#asunto");
const mensajeInput = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");

//EVENT LISTENERS
cargarEventListeners();
function cargarEventListeners() {
  //cuando cargamos la app
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //formulario
  emailInput.addEventListener("blur", validarFormulario);
  asuntoInput.addEventListener("blur", validarFormulario);
  mensajeInput.addEventListener("blur", validarFormulario);

  //reinicio del formulario
  btnReset.addEventListener("click", resetearFormulario);

  //enviar mail
  formulario.addEventListener("submit", enviarEmail);
}

//FUNCIONES
function iniciarApp() {
  formulario.reset();
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  validacionCamposVacios(e);
  validacionEmail(e);

  //código para activar el botón de enviar
  const expresionRegular =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    expresionRegular.test(emailInput.value) &&
    asuntoInput.value !== "" &&
    mensajeInput.value !== ""
  ) {
    console.log("Pasaste la validación");
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

function validacionCamposVacios(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove(); //para eliminar el mensaje de error
    }

    e.target.classList.remove("border", "border-red-700");
    e.target.classList.add("border", "border-green-700");
  } else {
    e.target.classList.remove("border", "border-green-700");
    e.target.classList.add("border", "border-red-700");
    mostrarError("Todos los campos son obligatorios");
  }
}

function validacionEmail(e) {
  if (e.target.type === "email") {
    const expresionRegular =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (expresionRegular.test(e.target.value)) {
      e.target.classList.remove("border", "border-red-700");
      e.target.classList.add("border", "border-green-700");
    } else {
      e.target.classList.remove("border", "border-green-700");
      e.target.classList.add("border", "border-red-700");
      mostrarError("E-mail no válido");
    }
  }
}

function enviarEmail(e) {
  e.preventDefault();

  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //despues de cierto tiempo volvemos a ocultar el spinner
  setTimeout(() => {
    spinner.style.display = "none";

    //mensaje de envio correcto
    const parrafo = document.createElement("p");
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold"
    );
    parrafo.textContent = "El email se envió correctamente";
    formulario.insertBefore(parrafo, spinner);

    //eliminamos el mensaje de envio correcto
    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 3000);
  }, 3000); //tiempo en milisegundos
}

function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
