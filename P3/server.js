const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const port = 9090;
const tiempo = Date.now();
const fecha = new Date(tiempo);

let users = 0;
let help_msg = ("Comandos: <br>" +
    "--> <b>'/help' </b>: Mostrar todos los comandos<br>" +
    "--> <b>'/list' </b>: Mostrar el numero de todos los usuarios conectados<br>" +
    "--> <b>'/hello' </b>: Saludar al cliente<br>" +
    "--> <b>'/date' </b>: Mostrar la fecha<br>");

let list_msg = ("Usuarios conectados: ");
let hello_msg = ("Saludos invocador");
let date_msg = (fecha.toUTCString());
let error_msg = ("Comando erroneo");

function commands(msg){
    let body;
    if(msg == '/help') {
        body = help_msg;
    }
    else if(msg == '/list') {
        body = list_msg + users;
    }
    else if(msg == '/help') {
        body = hello_msg;
    }
    else if(msg == '/help') {
        body = date_msg;
    }
    else{
        body = error_msg;
    }
}