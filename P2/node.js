//-- Imprimir información sobre la solicitud recibida

const http = require('http');
const fs = require('fs');
const PUERTO = 9009;

//-- Npmbre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"
//-- Leer el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);
//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

const tienda2 = "tienda-2.json"

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('pag-principal.html','utf-8');

//-- HTML de la página de respuesta
const RESPUESTA = fs.readFileSync('tienda.html', 'utf-8');


//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {
  
  //-- Construir el objeto url con la url de la solicitud
  const myURL = new URL(req.url, 'http://' + req.headers['host']); 
  let nombre = myURL.searchParams.get('nombre'); 
  let contraseña = myURL.searchParams.get('contraseña')
  console.log("");
  console.log("Método: " + req.method);
  console.log("Recurso: " + req.url);
  console.log("  Ruta: " + myURL.pathname);
  console.log("  Parametros: " + myURL.searchParams);
  let content_type = "text/html";
  let content = FORMULARIO;

  let solicitud = "";
  if(myURL.pathname == '/') { 
    solicitud += "/web.html" 
  }else if(myURL.pathname == "/favicon.icon"){
    filename = 'imagenes/ico.ico'
  }else {
    solicitud = myURL.pathname;
  }
  file_extension = solicitud.split(".")[1];
  solicitud = "." + solicitud 
  console.log("fichero: " + solicitud);
  console.log("recurso: " + file_extension);
  const type_mime = {
    "html" : "text/html",
    "css" : "text/css",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpg",
    "png" : "image/png",
    "gif" : "image/gif",
    "ico" : "image/ico",
  }; 
  let mime = type_mime[file_extension];
  console.log("El tipo mime asociado: " + mime);

  


  console.log(tienda.clientes)
  for (let step = 0; step < (tienda.clientes.length); step++){
    if (nombre == tienda.clientes[step].usuario){
      if (contraseña == tienda.clientes[step].contraseña){
        if (myURL.pathname == '/procesar'){
          content_type = "text/html";
          content = RESPUESTA;
        }else{
          throw err
        }
      }else{
        console.log("contraseña incorrecta");
      }
    }else{
      console.log("Usuario no encontrado");
    }
  } 

  

  //-- Si hay datos en el cuerpo, se imprimen
  req.on('data', (cuerpo) => {

    //-- Los datos del cuerpo son caracteres
    req.setEncoding('utf8');
    console.log(`Cuerpo (${cuerpo.length} bytes)`)
    console.log(` ${cuerpo}`);
  });

  //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
  req.on('end', ()=> {
    //-- Generar respuesta
      res.setHeader('Content-Type', mime);
      res.write(content);
      res.end()   
  });

});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);