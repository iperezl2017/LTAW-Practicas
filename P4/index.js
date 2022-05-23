const electron = require('electron');

const v_node = document.getElementById("node");
const v_chrome = document.getElementById("chrome");
const v_electron = document.getElementById("electron");
const arch = document.getElementById("arch");
const plat = document.getElementById("plat");
const dir = document.getElementById("dir");
const users = document.getElementById("users");
const dir_ip = document.getElementById("ip");
const button = document.getElementById("btn_test");
const display = document.getElementById("display");




electron.ipcRenderer.on('informacion', (event, message) => {  
   v_node.textContent = message[0];
   v_chrome.textContent = message[1];
   v_electron.textContent = message[2];
   arch.textContent = message[3];
   plat.textContent = message[4];
   dir.textContent = message[5];
   url = ("http://" + message[6] + ":" + message[7] + "/" + message[8]);
   dir_ip.textContent = url;
});

electron.ipcRenderer.on('users', (event, message) =>{
    users.textContent =  message;
});
electron.ipcRenderer.on('msg_client', (event,message) => {
    display.innerHTML +=  message + "<br>";
});
button.onclick = () => {
    electron.ipcRenderer.invoke('test', "Te veo");
}