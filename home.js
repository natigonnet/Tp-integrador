// home.js
import { inicializarSalones, getSalones } from './salones.js';

const salonesGrid = document.getElementById('salones-grid'); // Para el catálogo público

/**
 * Renderiza los salones en el catálogo principal (grilla de tarjetas).
 */

function renderizarCatalogoSalones() {

  salonesGrid.innerHTML = ''; // Limpiar el contenido existente

  const salones = getSalones();


  if (salones.length === 0) {

    salonesGrid.innerHTML = '<p class="text-center col-12">No hay salones disponibles en este momento. Vuelve pronto!</p>';

    return;

  }


  salones.forEach(salon => {

    // mostramos salones disponibles en el catálogo público

    if (salon.disponible) {

      const colDiv = document.createElement('div');

      colDiv.className = 'col mb-4';

      colDiv.innerHTML = `

                <div class="card h-100 shadow-sm">

                    <img src="${salon.imagen}" class="card-img-top" alt="${salon.nombre}">

                    <div class="card-body text-center">

                        <h5 class="card-title">${salon.nombre}</h5>

                        <p class="card-text">Capacidad: ${salon.capacidadNinos} niños / ${salon.capacidadAdultos} adultos</p>

                        <p class="card-text">${salon.descripcion}</p>

                        <a href="#presupuesto" class="btn btn-primary btn-sm mt-2">Solicitar Presupuesto</a>

                    </div>

                </div>

            `;

      salonesGrid.appendChild(colDiv);

    }

  });

}


// --- Inicialización de la aplicación de la home ---

document.addEventListener('DOMContentLoaded', () => {

  inicializarSalones(); // Aseguramosque LocalStorage esté inicializado

  renderizarCatalogoSalones(); // Renderizar el catálogo en la página de inicio

});
