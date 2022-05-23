const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');
const process = require('process');
const port = 9090;
const time = Date.now();
const fecha = new Date(time);

let users = 0;
let win = null;

let help_msg = ("Comandos: <br>" +
    "--> <b>'/help' </b>: Mostrar todos los comandos<br>" +
    "--> <b>'/list' </b>: Mostrar el numero de todos los usuarios conectados<br>" +
    "--> <b>'/hello' </b>: Saludar al cliente<br>" +
    "--> <b>'/date' </b>: Mostrar la fecha<br>");

let list_msg = ("Usuarios conectados: ");
let hello_msg = ("Saludos invocador");
let date_msg = (fecha.toUTCString());
let error_msg = ("Comando erroneo");
let welcome_msg = ("Bienvenido");
let newuser_msg = ("Nuevo usuario conectado");
let userleft_msg = ("Un usuario se ha ido");

const app = express();
const server = http.Server(app);
const io = socket(server);

app.get('/', (req, res) => {
    path = __dirname + '/chat.html';
    res.sendFile(path);
    console.log("Solicitud de acceso");
});
app.use('/',express.static(__dirname + '/'));
app.use(express.static('P4'));

io.on('connect', (socket) => {
    users += 1;
    win.webContents.send('users', users);
    socket.send(welcome_msg);
    io.send(newuser_msg);
    win.webContents.send('msg_client', newuser_msg);

    socket.on('disconnect', function(){
        console.log("DISCONNECTED".red);
        users -= 1;
        win.webContents.send('users',users);
        io.send(userleft_msg);
        win.webContents.send('msg_client',userleft_msg);
    });
    socket.on("message",(msg)=> {
        console.log("Mensaje recibido: " + msg.yellow);
        win.webContents.send('msg_client', msg);
        msg_text = msg.split(' ')[1];
        if(msg_text.startsWith('/')){
            console.log("Recibido: " + msg_text.blue);
            if(msg_text == '/help') {
                body = help_msg;
                socket.send(body);
            }else if(msg_text == '/list') {
                body = list_msg + users;
                socket.send(body);
            }else if(msg_text == '/hello') {
                body = hello_msg;
                socket.send(body);
            }else if(msg_text == '/date') {
                body = date_msg;
                socket.send(body);
            }else{
                io.send(msg_text);
            }
        }
    });
});

server.listen(port);
console.log("Escuchando en puerto: " + port);
    electron.app.on('ready', () => {
        win = new electron.BrowserWindow({
            width : 900,
            height : 900,

            webPreferences:{
                nodeIntegration: true,
                contextIsolation: false
            }
        
    });

    let fichero = "index.html"
    win.loadFile(fichero);

    v_node = process.versions.node;
    v_chrome = process.versions.chrome;
    v_electron = process.versions.electron;
    arch = process.arch;
    platform = process.platform;
    direct = process.cwd();
    dir_ip = ip.address();

    let datos = [v_node, v_chrome, v_electron, arch, platform, direct, dir_ip, port, fichero];
    win.on('ready-to-show', () => {
        win.webContents.send('informacion', datos);
    });
});

electron.ipcMain.handle('test', (event,msg) => {
    console.log("-> Mensaje: " + msg);
    io.send(msg);
});