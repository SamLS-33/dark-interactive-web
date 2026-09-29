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