// Inicializar un objeto JSON para acumular el IVA
const ivaAcumulado = {
    '5%': 0,
    '10%': 0
};

// Variable para llevar un registro del total acumulado de impuestos
let totalImpuestos = 0;

function calcularIVA() {
    const precioInput = document.getElementById('precio');
    const precioTexto = precioInput.value.trim(); // Obtener el valor del campo de entrada

    // Validar que el precio sea un número válido
    if (precioTexto === '') {
        alert('Por favor, ingrese un precio.');
        return;
    }

    const precio = parseFloat(precioTexto);

    if (isNaN(precio)) {
        alert('Por favor, ingrese un precio válido.');
        return;
    }

    const impuesto = parseFloat(document.getElementById('impuesto').value);
    let iva = 0;

    // Calcular el IVA según la tasa seleccionada
    if (!isNaN(impuesto)) {
        if (impuesto === 5) {
            iva = precio / 21;
        } else if (impuesto === 10) {
            iva = precio / 11;
        }

        // Acumular el IVA en el objeto JSON
        ivaAcumulado[`${impuesto}%`] += iva;

        // Mostrar el IVA a pagar y el acumulado en la página
        document.getElementById('iva-pagar').textContent = iva.toFixed(2);
        document.getElementById('iva-5').textContent = ivaAcumulado['5%'].toFixed(2);
        document.getElementById('iva-10').textContent = ivaAcumulado['10%'].toFixed(2);

        // Actualizar el total de impuestos acumulados
        totalImpuestos += iva;

        // Limpiar el campo de entrada después de calcular el IVA
        precioInput.value = '';
    } else {
        alert('Por favor, seleccione un impuesto.');
    }
}

function finalizar() {
    console.log(totalImpuestos);
    registardato()
    // Mostrar el total acumulado de impuestos
    document.getElementById('total-impuestos').textContent = totalImpuestos.toFixed(2);
}


const ACCESS_TOKEN =
  "ya29.a0AfB_byAQXx0Dhhv-rNCXwF9EjrPyo4BgSDt_AU80Uctux0GvkexqtRs0aBjl5XqP0qGtYKVppZnQidw8mQuznJW3eSYxDJv7V5hnYOiH-4K51yk3TvPNv1V0DRhcZIEFDP3VDCfJ3m40dOZT-TAYpxlNl9Gfo9B--d3UaCgYKAcgSARESFQGOcNnCIZemnqnEbiBll1nvn6BnsQ0171";
 
const SHEET_ID = '1dMyiJ-wClG56ItD0AWkjnflQ_GRuQ5irD0CJG1z58JQ';

function registardato() {
const ivaapagar = document.getElementById('iva-pagar').textContent;
const ivacinco = document.getElementById('iva-5').textContent;
const ivadiez = document.getElementById('iva-10').textContent;
const totaliva = document.getElementById('total-impuestos').textContent;
console.log(ivaapagar, ivacinco, ivadiez, totaliva);

let data = {};
  
let values = [];

let fila = [ivaapagar, ivacinco, ivadiez, totaliva];

values.push(fila);

//Verificar que coincida con el nombre de la hoja de nuestro sheet
data.range = "hojaGastos";

data.majorDimension = "ROWS";
data.values = values;

//Invocamos al método POST de la API
fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/1dMyiJ-wClG56ItD0AWkjnflQ_GRuQ5irD0CJG1z58JQ/values/hojaGastos:append?valueInputOption=USER_ENTERED`,
  {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(data)
  }
).then(function (response) {
  response.json().then(function (data) {

  });
});

//Limpiamos los campos del formulario para permitir cargar un nuevo gasto
document.getElementById('iva-pagar').value = "";
document.getElementById('iva-5').valueAsDate = new Date();
document.getElementById('iva-10').value = "";
};