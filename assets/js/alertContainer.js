//Función de mensaje de alerta
export function showAlert(message, alertType = 'success', alertContainerName) {    

    // Crear el HTML del mensaje de alerta
    const alertHTML = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Insertar el mensaje en el contenedor
    alertContainerName.innerHTML = alertHTML;
    alertContainerName.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        alertContainerName.style.display = 'none';
    }, 5000);
}