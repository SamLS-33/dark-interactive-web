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
const dataForm = document.getElementById("dataForm");

const dataResult = document.getElementById("dataResult");
const resultSymbol = document.getElementById("resultSymbol");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");


dataForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Obtener los datos del formulario

    const sex = document.getElementById("sex").value;
    const age = Number(document.getElementById("age").value);
    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);


    // Convertir centímetros a metros

    const heightInMeters = height / 100;


    // Calcular IMC

    const bmi = weight / (heightInMeters * heightInMeters);


    let category;
    let symbol;
    let description;


    // Clasificar el resultado

    if (bmi < 18.5) {

        category = "Peso bajo";
        symbol = "↓";
        description = "El resultado está por debajo del rango de referencia.";

    } else if (bmi < 25) {

        category = "Peso normal";
        symbol = "=";
        description = "El resultado se encuentra dentro del rango de referencia.";

    } else {

        category = "Peso alto";
        symbol = "↑";
        description = "El resultado está por encima del rango de referencia.";
    }


    // Mostrar el resultado

    resultSymbol.textContent = symbol;

    resultTitle.textContent = category;

    resultText.textContent =
        `IMC calculado: ${bmi.toFixed(1)} — Edad: ${age} años — Sexo: ${sex}. ${description}`;


    // Mostrar la tarjeta

    dataResult.classList.add("show");

});