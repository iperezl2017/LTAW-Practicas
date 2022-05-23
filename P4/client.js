const display = document.getElementById("display");
const entradamsg = document.getElementById("msg_entry");
const msg_nick = document.getElementById("nick");

let nickname = "Unkown";

const socket = io();

socket.on("message", (msg) =>{
    display.innerHTML += '<p style="color:black">' + msg + '</p>';
});

entradamsg.onchange = () => {
    if(entradamsg.value){
        socket.send(nickname + ': ' + entradamsg.value);
    }
    entradamsg.value = "";
}
msg_nick.onchange = () => {
    if(msg_nick.value){
        nickname = msg_nick.value;
    }
}