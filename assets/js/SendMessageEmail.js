import { sendContactEmail } from './sendGridEmailService.js';

document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.querySelector("textarea[name='message']").value;

    const body = `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`;
    console.log("Cuerpo del mensaje:", body);

    try {
        const result = await sendContactEmail({ name, email, message });
        alert("Mensaje enviado correctamente.");
    } catch(error) {
        console.error("Error al enviar el mensaje:", error);
        alert(`Error al enviar el mensaje. ${error.message}`);
    }
});