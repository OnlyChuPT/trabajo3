function mostrarAlerta(mensaje, tipo) {
    // Eliminar alertas previas
    const alertaExistente = document.querySelector('.custom-alert');
    if (alertaExistente) {
        alertaExistente.remove();
    }

    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.classList.add('alert', `alert-${tipo}`, 'custom-alert');
    alerta.textContent = mensaje;

    // Agregar alerta al cuerpo del documento
    document.body.appendChild(alerta);

    // Desaparecer la alerta después de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

let cantidadAficiones = 0;

document.getElementById('agregarAficionBtn').addEventListener('click', function() {
    const aficionInput = document.getElementById('aficionInput');
    const aficion = aficionInput.value.trim();
    if (aficion !== '') {
        const listaAficiones = document.getElementById('listaAficiones');
        const li = document.createElement('li');
        li.textContent = aficion;
        li.className = 'list-group-item';
        listaAficiones.appendChild(li);
        aficionInput.value = '';
        cantidadAficiones++; // Incrementar la cantidad de aficiones
    }
});


function validarFormulario() {
    console.log('Validando formulario...');
    let esValido = true;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const direccion = document.getElementById('direccion').value;
    const comuna = document.getElementById('comuna').value;
    const telefono = document.getElementById('telefono').value;
    const web = document.getElementById('web').value;
    const aficiones = document.getElementById('listaAficiones').getElementsByTagName('li').length;

    // Validación del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        mostrarAlerta('Formato de correo electrónico inválido', 'danger');
        esValido = false;
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,6}$/;
    if (!password.match(passwordRegex)) {
        mostrarAlerta('La contraseña debe tener entre 3 y 6 caracteres, y contener al menos una letra y un dígito.', 'danger');
        esValido = false;
    }

    if (password !== confirmPassword) {
        mostrarAlerta('Las contraseñas no coinciden.', 'danger');
        esValido = false;
    }

    // Validación de la dirección
    if (direccion === '') {
        mostrarAlerta('La dirección es obligatoria', 'danger');
        esValido = false;
    }

    // Validación de la comuna
    if (comuna === '') {
        mostrarAlerta('Debe seleccionar una comuna', 'danger');
        esValido = false;
    }

    // Validación del teléfono
    const telefonoRegex = /^\+\d{10,}$/;
    if (!telefono.match(telefonoRegex)) {
        mostrarAlerta('El teléfono debe tener al menos 10 dígitos y comenzar con un signo más (+)', 'danger');
        esValido = false;
    }

    // Validación de la URL
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (web !== '' && !web.match(urlRegex)) {
        mostrarAlerta('Formato de URL inválido', 'danger');
        esValido = false;
    }

    // Validación de las aficiones
    if (cantidadAficiones < 2) {
        mostrarAlerta('Debe ingresar al menos 2 aficiones', 'danger');
        esValido = false;
    }

    return esValido;
}
