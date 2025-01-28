document.getElementById('consulta-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const cadena = document.getElementById('cadena').value.trim();

    if (!cadena) {
        alert('Por favor, ingresa la cadena a comprobar.');
        return;
    }

    try {
        const response = await fetch(`https://backend-verificacion.onrender.com/api/comprobar/${cadena}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.valido === "true") {
                alert('Cadena válida');
            } else {
                alert('Cadena no válida');
            }
        } else {
            alert('Error al consultar la cadena. Por favor, intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error inesperado. Revisa tu conexión a internet.');
    }
});
