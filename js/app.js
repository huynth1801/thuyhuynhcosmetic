// Variables
const carrito = document.getElementById('carrito');
const items = document.getElementById('lista-items');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    items.addEventListener('click', comprarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);

}


// Funciones
// Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        strong: curso.querySelector('.strong span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);

}

// Muestra el curso seleccionado en el Carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>  
               <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.strong}</td>
          <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
     `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');

    }
    eliminarCursoLocalStorage(cursoId);
}

// Elimina los items del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // listaCursos.innerHTML = '';
    // forma rapida (recomendada)
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }


    // Vaciar Local Storage
    vaciarLocalStorage();

    return false;
}

// Almacena items en el carrito a Local Storage

function guardarCursoLocalStorage(curso) {
    let items;
    // Toma el valor de un arreglo con datos de LS o vacio
    items = obtenerCursosLocalStorage();

    // el curso seleccionado se agrega al arreglo
    items.push(curso);

    localStorage.setItem('items', JSON.stringify(items));
}


// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;

    // comprobamos si hay algo en localStorage
    if (localStorage.getItem('items') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('items'));
    }
    return cursosLS;

}

// Imprime los items de Local Storage en el carrito

function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (curso) {
        // constrir el template
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>  
                  <img src="${curso.imagen}" width=100>
             </td>
             <td>${curso.titulo}</td>
             <td>${curso.strong}</td>
             <td>
                  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
             </td>
        `;
        listaCursos.appendChild(row);

    });
}

// Elimina el curso por el ID en Local Storage

function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    // Obtenemos el arreglo de items
    cursosLS = obtenerCursosLocalStorage();
    // Iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function (cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    // Añadimos el arreglo actual a storage
    localStorage.setItem('items', JSON.stringify(cursosLS));
}

// Elimina todos los items de Local Storage

function vaciarLocalStorage() {
    localStorage.clear();
}