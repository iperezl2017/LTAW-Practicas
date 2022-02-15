//-- Importo los modulos http, fs y url
const http = require('http');
const fs = require('fs');

//-- URL no hace falta ponerla
//--const URL = require('url');

//-- Definir el puerto a utilizar
const PUERTO = 9004; 

//-- Crear el servidor
const server = http.createServer(function(req, res) {
    
  //-- Indicamos que se ha recibido una petición
  console.log("\nPetición recibida!");

  //-- Obtengo URL del mensaje de solicitud
  let myURL = new URL(req.url, 'http://' + req.headers['host']);
  console.log("La URL del recurso solicitado es: " + myURL.href)

    //-- Declaro variable para almacenar los recursos pedidos
  let solicitud = "";

  //-- Analizo la peticion
  if(myURL.pathname == '/') { //-- http://ip:port/
    solicitud += "/web.html" //-- Pagina principal
  } else { // Otra peticion
    solicitud = myURL.pathname;
  }
  
  //-- Extraigo el recurso pedido y su extension
  file_extension = solicitud.split(".")[1]; //-- Extension
  solicitud = "." + solicitud //-- El punto es necesario

  console.log("Nombre del fichero: " + solicitud);
  console.log("Extension del recurso: " + file_extension);


  //-- Declaracion de los tipo de mime
  const type_mime = {
    "html" : "text/html",
    "css" : "text/css",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpg",
    "png" : "image/png",
    "gif" : "image/gif",
    "ico" : "image/ico",
  }; 

  //-- Extraigo el tipo mime
  let mime = type_mime[file_extension];
  console.log("El tipo mime asociado: " + mime);

  //- Leer el fichero de manera sincrona
  fs.readFile(solicitud, function(err,data) {
    //-- En caso de error (pagina no encuentrada)
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      console.log("404 Not Found");
      solicitud = "html/error.html";
      data = fs.readFileSync(solicitud);
       
    }else { //-- En caso de NO dar error
      res.writeHead(200, {'Content-Type': mime});
      console.log("200 OK")
    }
    
    // Envio el tipo de fichero solicitado
    res.write(data);
    res.end();
  });
   
});
  
//-- Activo el servidor:
server.listen(PUERTO);

console.log("Server tienda activado!. Escuchando en puerto: " + PUERTO);