const fs = require('fs');
const FICHERO_JSON = "tienda.json"
const FICHERO_JSON_OUT = "tienda-2.json"
const tienda_json = fs.readFileSync(FICHERO_JSON);
const tienda = JSON.parse(tienda_json);
console.log("Escribe el nombre");
tienda[0]["nombre"] = "Ivan";
tienda[0]["contraseña"] = "ivan.1999";
tienda[0]["cesta"] = "Camiseta Xl";
tienda.forEach((element, index)=>{
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
  });
let myJSON = JSON.stringify(tienda);
fs.writeFileSync(FICHERO_JSON_OUT,myJSON);