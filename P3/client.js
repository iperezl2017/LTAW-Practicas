const display = document.getElementById("display");
const entradamsg = document.getElementById("entradamsg");

const socket = io();

socket.on("message", (msg) =>{
    display.innerHTML += '<p style= "color:black">' + msg + '</p>';
});

entradamsg.onchange = () => {
    socket.send('>' + entradamsg.value);
}
