document.getElementById("validarButton").addEventListener("click", async () => {
    const input = document.getElementById("cadenaInput").value;
    const resultDiv = document.getElementById("result");

    // Limpiar el resultado previo
    resultDiv.textContent = "";

    if (!input) {
        resultDiv.textContent = "Por favor, ingresa una cadena.";
        resultDiv.className = "result error";
        return;
    }

    try {
        const response = await fetch(`https://backend-automata.onrender.com/api/verificar/${input}`);
        const data = await response.json();

        if (data.aceptada === "true") {
            resultDiv.innerHTML = `
          <p class="result success">La cadena "${data.cadena}" es aceptada.</p>
          <p><strong>Transiciones:</strong></p>
          <pre>${data.informacion}</pre>
        `;
        } else {
            resultDiv.innerHTML = `
          <p class="result error">La cadena "${data.cadena}" no es aceptada.</p>
          <p><strong>Transiciones:</strong></p>
          <pre>${data.informacion}</pre>
        `;
        }
    } catch (error) {
        resultDiv.textContent = "Hubo un error al comunicarse con el servidor.";
        resultDiv.className = "result error";
    }
});
