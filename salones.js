// 1. Constante para la clave de LocalStorage
export const LOCAL_STORAGE_KEY = 'idw_salones';

// 2. Función para inicializar los salones en LocalStorage
// Esta función se ejecutará cuando la página se carga por primera vez
export function inicializarSalones() {
  const salonesEnLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!salonesEnLocalStorage) {
    // Si no hay salones en LocalStorage, inicializamos con algunos datos de ejemplo
    const salonesIniciales = [
      {
        id: Date.now() + 1, // Simula un ID único
        nombre: 'Salón Fiesta Mágica',
        capacidadNinos: 30,
        capacidadAdultos: 20,
        descripcion: 'Ideal para cumpleaños con temática de fantasía y juegos interactivos.',
        imagen: 'https://media.istockphoto.com/id/2158580612/photo/mature-woman-celebrating-birthday-with-family-at-home.jpg?s=2048x2048&w=is&k=20&c=WAUjdpYq9D9kg6mqHbu7ND8JAXHyDKCOxZG9WnHJrOU=',
        disponible: true
      },
      {
        id: Date.now() + 2,
        nombre: 'Salón Aventura Kids',
        capacidadNinos: 40,
        capacidadAdultos: 25,
        descripcion: 'Un espacio amplio con estructuras de juego y un ambiente vibrante para niños aventureros.',
        imagen: 'https://cdn.pixabay.com/photo/2015/06/23/08/55/child-818442_1280.jpg',
        disponible: true
      },
      {
        id: Date.now() + 3,
        nombre: 'Salón Mundo de Fantasía',
        capacidadNinos: 25,
        capacidadAdultos: 15,
        descripcion: 'Un salón íntimo y acogedor, perfecto para los más pequeños y sus familias.',
        imagen: 'https://cdn.pixabay.com/photo/2021/10/27/10/34/birthday-6746693_1280.jpg',
        disponible: false
      }
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(salonesIniciales));
    console.log('Salones inicializados en LocalStorage.');
  }
}

// 3. Funciones CRUD para la gestión de salones

/**
 * Obtiene todos los salones de LocalStorage.
 * @returns {Array} Un array de objetos salón.
 */
export function getSalones() {
  const salonesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  return salonesJSON ? JSON.parse(salonesJSON) : [];
}

/**
 * Guarda un array de salones en LocalStorage.
 * @param {Array} salones - El array de salones a guardar.
 */
function saveSalones(salones) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(salones));
}

/**
 * Agrega un nuevo salón a LocalStorage.
 * @param {Object} nuevoSalon - El objeto del nuevo salón.
 * @returns {Object} El salón creado con un ID único.
 */
export function addSalon(nuevoSalon) {
  const salones = getSalones();
  const salonConId = { ...nuevoSalon, id: Date.now() }; // Asigna un ID único basado en la marca de tiempo
  salones.push(salonConId);
  saveSalones(salones);
  console.log('Salón agregado:', salonConId);
  return salonConId;
}

/**
 * Actualiza un salón existente en LocalStorage.
 * @param {Object} salonActualizado - El objeto del salón con los datos actualizados. Debe contener el ID.
 * @returns {boolean} True si se actualizó, false si no se encontró el salón.
 */
export function updateSalon(salonActualizado) {
  let salones = getSalones();
  const index = salones.findIndex(salon => salon.id === salonActualizado.id);
  if (index !== -1) {
    salones[index] = { ...salones[index], ...salonActualizado }; // Fusiona los datos
    saveSalones(salones);
    console.log('Salón actualizado:', salones[index]);
    return true;
  }
  console.warn('Salón no encontrado para actualizar:', salonActualizado.id);
  return false;
}

/**
 * Elimina un salón de LocalStorage por su ID.
 * @param {number} idSalon - El ID del salón a eliminar.
 * @returns {boolean} True si se eliminó, false si no se encontró el salón.
 */
export function deleteSalon(idSalon) {
  let salones = getSalones();
  const initialLength = salones.length;
  salones = salones.filter(salon => salon.id !== idSalon);
  if (salones.length < initialLength) {
    saveSalones(salones);
    console.log('Salón eliminado:', idSalon);
    return true;
  }
  console.warn('Salón no encontrado para eliminar:', idSalon);
  return false;
}

/**
 * Obtiene un salón por su ID.
 * @param {number} idSalon - El ID del salón a buscar.
 * @returns {Object|undefined} El objeto salón si se encuentra, de lo contrario undefined.
 */
export function getSalonById(idSalon) {
  const salones = getSalones();
  return salones.find(salon => salon.id === idSalon);
}