"use strict";

//---------------Accedo al botón y contenedor creados---------------------:
var boton = document.getElementById('boton');
var contenedor = document.getElementById('contenedor');
var contBanderas = document.getElementById('banderas'); 

//-----------------------Evento click que obtiene la data------------------:
boton.addEventListener('click', function() {
    getPosts()
    .then(data => data.json())
    .then(posts => {
        mostrarDatos(posts);
        return getCountries();
    })
    .then(data => data.json())
    .then(countries => {
        mostrarBanderas(countries);
    });
});
//-----------------------Se separaron los eventos fetch para evitar posibles conflictos----:
function getPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts');
}

function getCountries() {
    return fetch('https://restcountries.eu/rest/v2/all');
}
//-----------------------Evento que crea y muestra el contenido--------------:

function mostrarDatos(posts) {
    posts.map((elem, i) => {
        let titulo = document.createElement('h2');
        let contenido = document.createElement('p');

        titulo.innerHTML = (i + 1) + " - " + elem.title;
        contenido.innerHTML = elem.body;

        contenedor.appendChild(titulo);
        contenedor.appendChild(contenido);
    }

    )
}

function mostrarBanderas(countries) {
    contBanderas.innerHTML = '';
    countries.map((country, i) => {
        let bandera = document.createElement('img');
        bandera.src = country.flag;
        bandera.width = '20';
        bandera.height = '20';
        contBanderas.appendChild(bandera);
    })
}