const botones = document.querySelectorAll(".nav-button");
const secciones = document.querySelectorAll(".section");


botones.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const seccionSeleccionada = boton.dataset.section;


        secciones.forEach(function(seccion) {
            seccion.classList.remove("active");
        });


        const nuevaSeccion = document.getElementById(seccionSeleccionada);

        nuevaSeccion.classList.add("active");

    });

});
// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    if (username === "admin" && password === "1234") {

        loginMessage.textContent = "✓ Inicio de sesión correcto";

    } else {

        loginMessage.textContent = "✕ Usuario o contraseña incorrectos";

    }

});