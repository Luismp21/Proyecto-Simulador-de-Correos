//Variables
const enviarBtn = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
const expresionRegular =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Variables pra los inputs
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

eventos();
function eventos() {
  //Cuando la app arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //Enviar email
  formulario.addEventListener("submit", enviarEmail);

  //Reinicia el formulario
  resetBtn.addEventListener("click", resetearFormulario);
}
//Funciones
function iniciarApp() {
  enviarBtn.disabled = true;
  enviarBtn.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    //Elimina los errores...
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
    e.target.classList.remove("error");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }
  if (e.target.type === "email") {
    if (expresionRegular.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Ingrese un email valido");
    }
  }
  if (
    expresionRegular.test(email.value) !== "" &&
    asunto.value !== "" &&
    mensaje.value !== ""
  ) {
    enviarBtn.disabled = false;
    enviarBtn.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    enviarBtn.disabled = true;
    enviarBtn.classList.add("cursor-not-allowed", "opacity-50");
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

function enviarEmail(e) {
  e.preventDefault();
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";

    //Mensaje al enviar al correo
    const mensajeEnviado = document.createElement("p");
    mensajeEnviado.textContent = "Mensaje enviado correctamente";
    mensajeEnviado.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );
    //Inserta el parrafo antes del spinner
    formulario.insertBefore(mensajeEnviado, spinner);
    setTimeout(() => {
      mensajeEnviado.remove(); //Eliminar el mensaje de enviado correctamente
      resetearFormulario();
    }, 3000);
  }, 3000);
}

//Funcion que resetea el formulario
function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
