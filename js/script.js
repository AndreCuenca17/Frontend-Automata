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
          <p class="result success">El binario "${data.cadena}" cumple con la condición.</p>
          <p><strong>Transiciones:</strong></p>
          <pre class="informacion">${data.informacion}</pre>
        `;
        } else {

            if (data.cadena === undefined) {
                resultDiv.innerHTML = `
          <p class="result error">La cadena "${document.getElementById("cadenaInput").value}" no es un binario.</p>    
        `;
            } else {
                resultDiv.innerHTML = `
          <p class="result error">El binario "${data.cadena}" no cumple con la condición.</p>
        `;
            }


        }
    } catch (error) {
        resultDiv.textContent = "Hubo un error al comunicarse con el servidor.";
        resultDiv.className = "result error";
    }
});
