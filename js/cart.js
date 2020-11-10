//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var carritoCarr=[];
document.addEventListener("DOMContentLoaded", function(e){
getJSONData(CART_INFO_URL).then(function(resultObj){
    if(resultObj.status==="ok"){
  carritoCarr = resultObj.data.articles;
  tavola();
    }
});
});
function tavola(){
  let htmlTextToAppend= ``;
  let total=0;
  let totalProductosCarr=0;
  for(let i=0;i<carritoCarr.length;i++){
         let subTotale = carritoCarr[i].unitCost * carritoCarr[i].count;
         total+=subTotale;
         totalProductosCarr+= carritoCarr[i].count;
         htmlTextToAppend += `<tr>
         <th><img src="`+ carritoCarr[i].src +`"></th>
         <th>`+ carritoCarr[i].name +`</th>
         <th><input type="number" min="1" id="numero_`+ i +`" value="`+ carritoCarr[i].count+ `" onChange="modificaCantidad(`+ i +`)"></th>
         <th>`+ carritoCarr[i].unitCost + `</th>
         <th>`+ subTotale +`</th>
         <td><button onclick="borrar();" class="btn btn-sm btn-danger">x </button></td>`;
        
  } 
  document.getElementById("listaCart").innerHTML=htmlTextToAppend;
  document.getElementById("numeritoCarr").innerHTML=totalProductosCarr;
  let radios= document.getElementsByName("publicationType");
  let porcentaje= 0;
  for(i=0;i<radios.length;i++){
    if(radios[i].checked){
    porcentaje= radios[i].value;
    break;
    }
  }
  let costoShipping= total*(porcentaje/100); 
  document.getElementById("costoEnvio").innerHTML= costoShipping.toFixed(2);
  let totalDeTotales= total+ costoShipping;
  document.getElementById("Total").innerHTML= totalDeTotales.toFixed(2);
}
function modificaCantidad(indexPos){
 carritoCarr[indexPos].count=document.getElementById("numero_"+indexPos).value;
 tavola();
}
function borrar(index){
  carritoCarr.splice(index, 1)
  tavola();
}

function revisarMetodoPago() {
  // Obtener el elemento html
  let nombreTarjeta = document.getElementById("nombreTarjeta");
  // Revisar segun la condicion dada si la cumple
  if (nombreTarjeta.value.trim().length > 3) {
      // Si tiene la class "is-invalid" : se lo quito
      if (nombreTarjeta.classList.contains("is-invalid")) {
          nombreTarjeta.classList.remove("is-invalid");
      }
  }
  else {
      // Si no tiene la class "is-invalid" : le añado la class
      if (nombreTarjeta.classList.contains("is-invalid") == false) {
          nombreTarjeta.classList.add("is-invalid");
      }
  }

  // Obtener el elemento html
  let numeroTarjeta = document.getElementById("numeroTarjeta");
  // Revisar segun la condicion dada si la cumple
  if (numeroTarjeta.value.trim().length == 16) {
      // Si tiene la class "is-invalid" : se lo quito
      if (numeroTarjeta.classList.contains("is-invalid")) {
          numeroTarjeta.classList.remove("is-invalid");
      }
  }
  else {
      // Si no tiene la class "is-invalid" : le añado la class
      if (numeroTarjeta.classList.contains("is-invalid") == false) {
          numeroTarjeta.classList.add("is-invalid");
      }
  }

  // Obtener el elemento html
  let cvcTarjeta = document.getElementById("cvcTarjeta");
  // Revisar segun la condicion dada si la cumple
  if (cvcTarjeta.value.trim().length == 3) {
      // Si tiene la class "is-invalid" : se lo quito
      if (cvcTarjeta.classList.contains("is-invalid")) {
          cvcTarjeta.classList.remove("is-invalid");
      }
  }
  else {
      // Si no tiene la class "is-invalid" : le añado la class
      if (cvcTarjeta.classList.contains("is-invalid") == false) {
          cvcTarjeta.classList.add("is-invalid");
      }
  }

  // Obtener el elemento html
  let vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
  // Revisar segun la condicion dada si la cumple
  if (vencimientoTarjeta.value != "") {
      // Si tiene la class "is-invalid" : se lo quito
      if (vencimientoTarjeta.classList.contains("is-invalid")) {
          vencimientoTarjeta.classList.remove("is-invalid");
      }
  }
  else {
      // Si no tiene la class "is-invalid" : le añado la class
      if (vencimientoTarjeta.classList.contains("is-invalid") == false) {
          vencimientoTarjeta.classList.add("is-invalid");
      }
  }
}
function revisarMetodoEnvio() {
  // Obtener el elemento html
  let direccionEnvio = document.getElementById("direccionEnvio2");
  // Revisar segun la condicion dada si la cumple
  if (direccionEnvio.value.trim().length > 3) {
      // Si tiene la class "is-invalid" : se lo quito
      if (direccionEnvio.classList.contains("is-invalid")) {
          direccionEnvio.classList.remove("is-invalid");
      }
  }
  else {
      // Si no tiene la class "is-invalid" : le añado la class
      if (direccionEnvio.classList.contains("is-invalid") == false) {
          direccionEnvio.classList.add("is-invalid");
      }
  }

  // Obtener el elemento html
  let telefonoEnvio = document.getElementById("telefonoEnvio");
  // Revisar segun la condicion dada si la cumple
  if (telefonoEnvio.value.trim().length > 4) {
      // Si tiene la class "is-invalid" : se lo quito
      if (telefonoEnvio.classList.contains("is-invalid")) {
          telefonoEnvio.classList.remove("is-invalid");
      }
  }
  else {
      // Si no tiene la class "is-invalid" : le añado la class
      if (telefonoEnvio.classList.contains("is-invalid") == false) {
          telefonoEnvio.classList.add("is-invalid");
      }
  }
}