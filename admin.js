import { inicializarSalones, getSalones, addSalon, updateSalon, deleteSalon, getSalonById } from './salones.js';

// Elementos del DOM para la administración
const tablaSalonesBody = document.getElementById('tabla-salones-body');
const formSalon = document.getElementById('form-salon');
const formSalonTitle = document.getElementById('form-salon-title');
const btnSubmitSalon = document.getElementById('btn-submit-salon');
const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');

// Campos del formulario
const salonId = document.getElementById('salon-id');
const nombreSalon = document.getElementById('nombre-salon');
const capacidadNinos = document.getElementById('capacidad-ninos');
const capacidadAdultos = document.getElementById('capacidad-adultos');
const descripcionSalon = document.getElementById('descripcion-salon');
const imagenSalon = document.getElementById('imagen-salon');
const disponibleSalon = document.getElementById('disponible-salon');


// --- Funciones de Renderizado ---

/**
 * Muestra los salones en la tabla de administración.
 */
function renderizarTablaAdministracion() {
  tablaSalonesBody.innerHTML = '';
  const salones = getSalones();

  if (salones.length === 0) {
    tablaSalonesBody.innerHTML = '<tr><td colspan="8" class="text-center">No hay salones registrados.</td></tr>';
    return;
  }

  salones.forEach(salon => {
    const row = tablaSalonesBody.insertRow();
    row.dataset.salonId = salon.id;

    row.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.nombre}</td>
            <td>${salon.capacidadNinos}</td>
            <td>${salon.capacidadAdultos}</td>
            <td>${salon.descripcion.substring(0, 50)}...</td>
            <td><a href="${salon.imagen}" target="_blank">Ver Imagen</a></td>
            <td>${salon.disponible ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>'}</td>
            <td>
                <button class="btn btn-warning btn-sm btn-editar mr-2" data-id="${salon.id}">Editar</button>
                <button class="btn btn-danger btn-sm btn-eliminar" data-id="${salon.id}">Eliminar</button>
            </td>
        `;
  });

  // Añadir event listeners a los botones de la tabla
  document.querySelectorAll('.btn-editar').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = parseInt(event.target.dataset.id);
      cargarSalonParaEdicion(id);
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = parseInt(event.target.dataset.id);
      if (confirm('¿Estás seguro de que quieres eliminar este salón?')) {
        deleteSalon(id);
        renderizarTablaAdministracion();
        alert('Salón eliminado. El cambio se verá reflejado en la página de inicio al recargarla.');
      }
    });
  });
}

// --- Funciones de Formulario ---

/**
 * Carga los datos de un salón en el formulario para edición.
 */
function cargarSalonParaEdicion(id) {
  const salon = getSalonById(id);
  if (salon) {
    salonId.value = salon.id;
    nombreSalon.value = salon.nombre;
    capacidadNinos.value = salon.capacidadNinos;
    capacidadAdultos.value = salon.capacidadAdultos;
    descripcionSalon.value = salon.descripcion;
    imagenSalon.value = salon.imagen;
    disponibleSalon.checked = salon.disponible;

    formSalonTitle.textContent = 'Editar Salón';
    btnSubmitSalon.textContent = 'Guardar Cambios';
    btnSubmitSalon.classList.remove('btn-success');
    btnSubmitSalon.classList.add('btn-primary');
    btnCancelarEdicion.style.display = 'inline-block';
  }
}

/**
 * Limpia el formulario y lo restablece para crear un nuevo salón.
 */
function limpiarFormulario() {
  formSalon.reset();
  salonId.value = '';
  formSalonTitle.textContent = 'Crear Nuevo Salón';
  btnSubmitSalon.textContent = 'Crear Salón';
  btnSubmitSalon.classList.remove('btn-primary');
  btnSubmitSalon.classList.add('btn-success');
  btnCancelarEdicion.style.display = 'none';
}

// --- Event Listeners ---

// Manejar el envío del formulario de salón (Crear/Modificar)
formSalon.addEventListener('submit', (event) => {
  event.preventDefault();

  const salonData = {
    nombre: nombreSalon.value,
    capacidadNinos: parseInt(capacidadNinos.value),
    capacidadAdultos: parseInt(capacidadAdultos.value),
    descripcion: descripcionSalon.value,
    imagen: imagenSalon.value,
    disponible: disponibleSalon.checked
  };

  if (salonId.value) {
    salonData.id = parseInt(salonId.value);
    updateSalon(salonData);
    alert('Salón actualizado correctamente. Los cambios se verán reflejados en la página de inicio al recargarla.');
  } else {
    addSalon(salonData);
    alert('Salón agregado correctamente. Se verá reflejado en la página de inicio al recargarla.');
  }

  limpiarFormulario();
  renderizarTablaAdministracion();
});

// Manejar el botón de cancelar edición
btnCancelarEdicion.addEventListener('click', limpiarFormulario);


// --- Inicialización de la página de administración ---
document.addEventListener('DOMContentLoaded', () => {
  inicializarSalones();
  renderizarTablaAdministracion(); // Renderizar la tabla de administración al cargar la página
});

window.addEventListener('storage', (event) => {
  if (event.key === 'idw_salones') {
    console.log('Cambio en LocalStorage detectado, actualizando tabla de administración...');
    renderizarTablaAdministracion();
  }
});