const display = document.getElementById("display");
const entradamsg = document.getElementById("entradamsg");


const socket = io();

socket.on("message", (msg) =>{
    display.innerHTML += '<p style="color:black">' + msg + '</p>';
});

entradamsg.onchange = () => {
    if(entradamsg.value){
        socket.send(entradamsg.value);
    }
    entradamsg.value = "";
}