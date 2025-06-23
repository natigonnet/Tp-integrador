   document.addEventListener('DOMContentLoaded', () => {
       const url = 'https://dummyjson.com/users';
       const tablaUsuarios = document.getElementById('cuerpo-tabla');
       const formUsuario = document.getElementById('form-usuario');
       const usuarioId = document.getElementById('usuario-id');
       const nombreInput = document.getElementById('nombre');
       const apellidoInput = document.getElementById('apellido');
       const emailInput = document.getElementById('email');

       let usuarios = [];

       async function cargarUsuarios() {
           const respuesta = await fetch(url);
           const datos = await respuesta.json();
           usuarios = datos.users;
           mostrarUsuarios(usuarios);
       }

       function mostrarUsuarios(usuarios) {
           tablaUsuarios.innerHTML = '';
           usuarios.forEach(usuario => {
               const fila = document.createElement('tr');
               fila.innerHTML = `
                   <td>${usuario.id}</td>
                   <td>${usuario.firstName}</td>
                   <td>${usuario.lastName}</td>
                   <td>${usuario.email}</td>
                   <td>
                       <button class="btn btn-warning btn-sm btn-editar mr-2" onclick="editarUsuario(${usuario.id})">Editar</button>
                       <button class="btn btn-danger btn-sm btn-eliminar" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                   </td>
               `;
               tablaUsuarios.appendChild(fila);
           });
       }

       formUsuario.addEventListener('submit', (e) => {
           e.preventDefault();
           const id = usuarioId.value;
           const nombre = nombreInput.value;
           const apellido = apellidoInput.value;
           const email = emailInput.value;

           if (id) {
               // Editar usuario
               const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
               usuarios[usuarioIndex] = { id, firstName: nombre, lastName: apellido, email };
           } else {
               // Agregar usuario
               const nuevoUsuario = {
                   id: usuarios.length + 1,
                   firstName: nombre,
                   lastName: apellido,
                   email
               };
               usuarios.push(nuevoUsuario);
           }

           mostrarUsuarios(usuarios);
           formUsuario.reset();
           usuarioId.value = '';
       });

       window.editarUsuario = function(id) {
           const usuario = usuarios.find(usuario => usuario.id === id);
           usuarioId.value = usuario.id;
           nombreInput.value = usuario.firstName;
           apellidoInput.value = usuario.lastName;
           emailInput.value = usuario.email;
       }

       window.eliminarUsuario = function(id) {
           usuarios = usuarios.filter(usuario => usuario.id !== id);
           mostrarUsuarios(usuarios);
       }

       cargarUsuarios();
   });
   