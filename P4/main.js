const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');
const process = require('process');
const port = 9090;
const time = Date.now();
const fecha = new Date(tiempo);

let users = 0;
let win = null;
