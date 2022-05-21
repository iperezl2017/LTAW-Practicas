const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const port = 9090;
const tiempo = Date.now();
const fecha = new Date(tiempo);

let help_msg = ("Comandos: <br>" +
    "--> <b>'/help' </b>: Mostrar todos los comandos<br>" +
    "--> <b>'/list' </b>: Mostrar el numero de todos los usuarios conectados<br>" +
    "--> <b>'/hello' </b>: Saludar al cliente<br>" +
    "--> <b>'/date' </b>: Mostrar la fecha<br>");

let list_msg = ("Usuarios conectados: ");
let hello_msg = ("Saludos invocador");
let date_msg = (fecha.toUTCString());