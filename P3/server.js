const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const port = 9090;
const tiempo = Date.now();
const fecha = new Date(tiempo);