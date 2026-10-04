import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/FontLoader.js";

import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/geometries/TextGeometry.js";
const botones = document.querySelectorAll(".nav-button");
const secciones = document.querySelectorAll(".section");


botones.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const seccionSeleccionada = boton.dataset.section;


        secciones.forEach(function (seccion) {
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


loginForm.addEventListener("submit", function (event) {

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


dataForm.addEventListener("submit", function (event) {

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
// =========================
// CORAZÓN 3D
// =========================

const heartScene = document.getElementById("heartScene");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    900 / 500,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(900, 500);

heartScene.appendChild(renderer.domElement);

renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";


// =========================
// GRUPO DEL CORAZÓN
// =========================

const heartGroup = new THREE.Group();

scene.add(heartGroup);


// =========================
// GENERAR CORAZÓN 3D
// =========================

const lineVertices = [];

const rows = 32;
const columns = 48;


// =========================
// FUNCIÓN DE FORMA
// =========================

function heartShape(t) {

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x: x / 10,
        y: y / 10
    };
}


// =========================
// GENERAR SUPERFICIE
// =========================

const points = [];

for (let row = 0; row < rows; row++) {

    const vertical =
        row / (rows - 1);

    // De -1 a 1
    const z =
        (vertical - 0.5) * 2.2;

    const depth =
        Math.cos(
            (vertical - 0.5) * Math.PI
        );

    const rowPoints = [];

    for (let column = 0; column < columns; column++) {

        const t =
            (column / columns) * Math.PI * 2;

        const shape =
            heartShape(t);

        const point = {

            x: shape.x * depth,

            y: shape.y * depth,

            z: z
        };

        rowPoints.push(point);
    }

    points.push(rowPoints);
}


// =========================
// CONSTRUIR MALLA
// =========================

for (let row = 0; row < rows; row++) {

    for (let column = 0; column < columns; column++) {

        const current =
            points[row][column];

        const nextColumn =
            points[row][
            (column + 1) % columns
            ];


        // Línea horizontal

        lineVertices.push(
            current.x,
            current.y,
            current.z,

            nextColumn.x,
            nextColumn.y,
            nextColumn.z
        );


        // Línea vertical

        if (row < rows - 1) {

            const nextRow =
                points[row + 1][column];

            lineVertices.push(
                current.x,
                current.y,
                current.z,

                nextRow.x,
                nextRow.y,
                nextRow.z
            );
        }
    }
}


// =========================
// GEOMETRÍA
// =========================

const heartGeometry =
    new THREE.BufferGeometry();

heartGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        lineVertices,
        3
    )
);


// =========================
// MATERIAL
// =========================

const heartMaterial =
    new THREE.LineBasicMaterial({

        color: 0x2684ff,

        transparent: true,

        opacity: 0.85
    });


// =========================
// CORAZÓN
// =========================

const heart =
    new THREE.LineSegments(
        heartGeometry,
        heartMaterial
    );

heartGroup.add(heart);

// =========================
// CAMBIO DE COLOR
// =========================

const blueHeartButton =
    document.getElementById("blueHeartButton");

const purpleHeartButton =
    document.getElementById("purpleHeartButton");


blueHeartButton.addEventListener(
    "click",
    function () {

        heartMaterial.color.set(0x2684ff);

        blueHeartButton.classList.add("active");
        purpleHeartButton.classList.remove("active");
    }
);


purpleHeartButton.addEventListener(
    "click",
    function () {

        heartMaterial.color.set(0x7b3fe4);

        purpleHeartButton.classList.add("active");
        blueHeartButton.classList.remove("active");
    }
);
// =========================
// MENSAJE OCULTO: TE AMO
// =========================

// =========================
// OCULTAR EL MENSAJE
// =========================

// =========================
// POSICIÓN DE LA CÁMARA
// =========================

// =========================
// APARICIÓN PROGRESIVA
// =========================

const totalVertices =
    heartGeometry.attributes.position.count;

heartGeometry.setDrawRange(
    0,
    0
);

let visibleVertices = 0;

const appearanceSpeed = 4;

function revealHeart() {

    visibleVertices += appearanceSpeed;

    if (visibleVertices >= totalVertices) {

        visibleVertices = totalVertices;
    }

    heartGeometry.setDrawRange(
        0,
        visibleVertices
    );

    if (visibleVertices < totalVertices) {

        requestAnimationFrame(revealHeart);
    }
}

revealHeart();
camera.position.z = 8;


// =========================
// CONTROLES DEL MOUSE
// =========================

let isDragging = false;

let previousMouseX = 0;
let previousMouseY = 0;

const mouseRotationSpeed = 0.01;


// Cuando presionamos el mouse

renderer.domElement.addEventListener(
    "mousedown",
    function (event) {

        isDragging = true;

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
);


// Cuando movemos el mouse

renderer.domElement.addEventListener(
    "mousemove",
    function (event) {

        if (!isDragging) {
            return;
        }

        const movementX =
            event.clientX - previousMouseX;

        const movementY =
            event.clientY - previousMouseY;


        heartGroup.rotation.y +=
            movementX * mouseRotationSpeed;

        heartGroup.rotation.x +=
            movementY * mouseRotationSpeed;


        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
);


// Cuando soltamos el mouse

renderer.domElement.addEventListener(
    "mouseup",
    function () {

        isDragging = false;
    }
);


// Si el mouse sale del área

renderer.domElement.addEventListener(
    "mouseleave",
    function () {

        isDragging = false;
    }
);


// =========================
// ZOOM CON RUEDA
// =========================

renderer.domElement.addEventListener(
    "wheel",
    function (event) {

        event.preventDefault();

        camera.position.z +=
            event.deltaY * 0.01;


        // Límite de acercamiento

        if (camera.position.z < 2) {
            camera.position.z = 2;
        }

        if (camera.position.z > 12) {
            camera.position.z = 12;
        }
    }
);


// =========================
// EFECTO DE LATIDO
// =========================

let heartbeatTime = 0;

function animate() {

    requestAnimationFrame(animate);

    heartbeatTime += 0.025;


    // Primer latido

    const firstBeat =
        Math.exp(
            -Math.pow(
                (heartbeatTime % 2.5 - 0.35) * 8,
                2
            )
        );


    // Segundo latido

    const secondBeat =
        Math.exp(
            -Math.pow(
                (heartbeatTime % 2.5 - 0.65) * 8,
                2
            )
        );


    const heartbeat =
        firstBeat * 0.045 +
        secondBeat * 0.025;


    const scale =
        1 + heartbeat;


    heartGroup.scale.set(
        scale,
        scale,
        scale
    );


    renderer.render(scene, camera);
}

animate();
// =========================
// ESCENA DE PRUEBA - MENSAJE 3D
// =========================

const messageScene =
    document.getElementById("messageScene");

const messageWorld =
    new THREE.Scene();

const messageCamera =
    new THREE.PerspectiveCamera(
        75,
        900 / 500,
        0.1,
        1000
    );

messageCamera.position.set(
    0,
    2.5,
    6
);

messageCamera.lookAt(
    0,
    0,
    0
);

const messageRenderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

messageRenderer.setSize(
    900,
    500
);

messageScene.appendChild(
    messageRenderer.domElement
);

messageRenderer.domElement.style.width = "100%";
messageRenderer.domElement.style.height = "100%";

// =========================
// EJES X / Y / Z
// =========================

const axesHelper =
    new THREE.AxesHelper(3);

messageWorld.add(axesHelper);
// =========================
// ILUMINACIÓN
// =========================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );

messageWorld.add(ambientLight);

const pointLight =
    new THREE.PointLight(
        0x2684ff,
        30,
        10
    );

pointLight.position.set(
    2,
    3,
    4
);

messageWorld.add(pointLight);
// =========================
// TEXTO 3D
// =========================

const fontLoader =
    new FontLoader();

fontLoader.load(
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
        let isMessageDragging = false;

        let previousMessageMouseX = 0;
        let previousMessageMouseY = 0;

        const messageRotationSpeed = 0.01;
        const textGeometry =
            new TextGeometry(
                "TE AMO",
                {
                    font: font,
                    size: 0.75,
                    depth: 0.22,
                    curveSegments: 16,

                    bevelEnabled: true,
                    bevelThickness: 0.06,
                    bevelSize: 0.035,
                    bevelSegments: 5
                }
            );

        textGeometry.center();

        const textMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x2684ff,
                metalness: 0.75,
                roughness: 0.18
            });

        const textMesh =
            new THREE.Mesh(
                textGeometry,
                textMaterial
            );
        textMesh.rotation.x = -0.08;
        textMesh.rotation.y = 0.12;

        messageWorld.add(

            textMesh
        );
        // =========================
        // BRILLO DEL TEXTO
        // =========================

        const textGlowMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x2684ff,
                transparent: true,
                opacity: 100.12,
                side: THREE.BackSide
            });

        const textGlow =
            new THREE.Mesh(
                textGeometry,
                textGlowMaterial
            );

        textGlow.scale.set(
            1.04,
            1.04,
            1.04
        );

        textMesh.add(
            textGlow
        );
    }
);

// =========================
// CUADRÍCULA
// =========================

const gridHelper =
    new THREE.GridHelper(
        6,
        12
    );

messageWorld.add(gridHelper);

// =========================
// ANIMACIÓN
// =========================

function animateMessageScene() {

    requestAnimationFrame(
        animateMessageScene
    );

    messageRenderer.render(
        messageWorld,
        messageCamera
    );
}

animateMessageScene();