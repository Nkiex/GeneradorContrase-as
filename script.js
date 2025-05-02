let botonGenerar = document.getElementById("generar");
let botonCopiar = document.getElementById("copiar");
let campoVacio = document.getElementById("inputVacio");
let Largo = document.getElementById("rango");
let Seguridad = document.getElementById("seguridad");

function GenerarContrasena(cadena, longitud) {
    let aleatoriedad = "";
    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * cadena.length);
        aleatoriedad += cadena[randomIndex];
    }
    return aleatoriedad;
}

// Evento para generar la contraseña al hacer clic
botonGenerar.addEventListener("click", () => {
    const cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(),.?\":{}|<>"; 
    const longitud = parseInt(Largo.value);
    const nueva = GenerarContrasena(cadena, longitud);
    campoVacio.value = nueva;
    analizarSeguridad(nueva);  // Evaluar seguridad después de generar la contraseña
});


botonCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(campoVacio.value)
        .then(() => {
            botonCopiar.textContent = "¡COPIADO!";
            setTimeout(() => {
                botonCopiar.textContent = "COPIAR";
            }, 1500);
        })
        .catch(err => {
            console.error("Error al copiar:", err);
        });
});

// Actualización de seguridad en tiempo real cuando el usuario cambia el rango
Largo.addEventListener("input", () => {
    const longitud = parseInt(Largo.value);
    if (longitud > 0) {
        const cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(),.?\":{}|<>"; 
        const nueva = GenerarContrasena(cadena, longitud);
        analizarSeguridad(nueva);  // Evaluar seguridad cuando cambia la longitud
    }
});

// Función para evaluar la seguridad de la contraseña
function analizarSeguridad(contrasena) {
    // Longitud y nivel de seguridad basado solo en la longitud de la contraseña
    if (contrasena.length < 12) {
        Seguridad.textContent = "Seguridad: Baja 🔴";
    } else if (contrasena.length >= 12 && contrasena.length <= 14) {
        Seguridad.textContent = "Seguridad: Media 🟡";
    } else if (contrasena.length > 14) {
        Seguridad.textContent = "Seguridad: Alta 🟢";
    }
}
