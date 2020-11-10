//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var json_info;
var div_info;
document.addEventListener("DOMContentLoaded", function(e){
    var comentarios = []; 

    var comments = document.getElementById ("inpCOM"); 
    comments.addEventListener("click",function(e){
        e.preventDefault();
        subirComentarios();
    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if(resultObj.status==="ok"){
            json_info=resultObj.data; 
            showProductoInfo();
            getJSONData(PRODUCTS_URL).then(function(resultObject){
                 if(resultObject.status==="ok"){
                     var listaProd=resultObject.data;
                     let htmlContentToAppend = ``;
                     for (let a = 0; a < json_info.relatedProducts.length; a++){
                          let myProduct = listaProd[json_info.relatedProducts[a]];
                          htmlContentToAppend += `
                            <div class="col-md-3">
                                <a href="products.html" class="card mb-4 shadow-sm custom-card">
                                    <img class="bd-placeholder-img card-img-top" src="`+ myProduct.imgSrc + `">
                                    <h3 class="m-3" style="color:black;">` + myProduct.name + `</h3>
                                    <div class="card-body">
                                        <p class="card-text" style="color:black;">`+ myProduct.currency + ` ` + myProduct.cost + `</p>
                                    </div>
                                </a>
                            </div>
                            `;
                     }
                     document.getElementById("productosRelacionados").innerHTML=htmlContentToAppend; /*cada producto relacionado despliega la informacion contenida en htmlContentToAppend*/
                 }
             });
        }
    });
});

    function subirComentarios(){
        var div_comentarios = document.getElementById("comments");
        var htmlComentario = '';
        var puntaje = document.getElementById("puntaje");
        var usuario = document.getElementById("commId");
        var comentario = document.getElementById("comId");
        //variables 
        htmlComentario += "<div class='estilo_comentario  border rounded'>";
        htmlComentario += "<div class='com_user'>"+ usuario.value + " " + puntaje.value + "<i class='fas fa-star checked'></i></div>";
        htmlComentario += "<div class='com_desc'>"+ comentario.value +"</div>";   
        htmlComentario += "<div class='com_fecha'>"+ obtenerFecha() +"</div>";
        htmlComentario += "</div>";  

        var div_comentario = document.createElement("div");
        div_comentario.innerHTML = htmlComentario;
        div_comentarios.append(div_comentario);//comentario-append
        puntaje.value = '';
        usuario.value = '';
        comentario.value = ''; 
    }
    function obtenerFecha(){
        var d = new Date();
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
    
    function imagenesCarrusel(){

      var divCarrusel= document.getElementById("carrusel2");
        let htmlcarrusel = "";
        htmlcarrusel += "<div id='carrusel' class='carousel slide' data-ride='carousel'>";
        htmlcarrusel +="<ul class='carousel-indicators'>";
        for(var i=0; i<4; i++){
            if(i==0){
                htmlcarrusel+="<li data-target='#carrusel' data-slide-to='"+ i +"' class='active'></li>";
            }else{
                htmlcarrusel+="<li data-target='#carrusel' data-slide-to='"+ i +"'></li>";
            }
        }
        htmlcarrusel+="</ul>";
        htmlcarrusel+="<div class='carousel-inner'>";
        for(var j=0; j<4; j++){
            if(j==0){
            htmlcarrusel+="<div class='carousel-item active'>"; 
            htmlcarrusel+="<img class='d-block w-100' src='" +json_info.images[j]+"' alt='First slide'>";
            htmlcarrusel+=" </div>";
            }else{
                htmlcarrusel+="<div class='carousel-item'>";
                htmlcarrusel+="<img class='d-block w-100' src='"+json_info.images[j]+"' alt='Second slide'>";
                htmlcarrusel+="</div>";
            }
        }
        htmlcarrusel+="</div>";
        htmlcarrusel+="<a class='carousel-control-prev' href='#carrusel' role='button' data-slide='prev'>";
        htmlcarrusel+="<span class='carousel-control-prev-icon' aria-hidden='true'></span>";
        htmlcarrusel+="<span class='sr-only'>Previous</span>";
        htmlcarrusel+="</a>";
        htmlcarrusel+="<a class='carousel-control-next' href='#carrusel' role='button' data-slide='next'>";
        htmlcarrusel+="<span class='carousel-control-next-icon' aria-hidden='true'></span>";
        htmlcarrusel+="<span class='sr-only'>Next</span>";
        htmlcarrusel+="</a>";
        htmlcarrusel+="</div>";
        divCarrusel.innerHTML= htmlcarrusel;
    }
    
    function cargarComentarios(){
        var div_comentarios = document.getElementById("comments");
        var htmlComentarios = '';
        if(comentarios.length != 0){
            for(var k=0; k < comentarios.length; k++){
                htmlComentarios += "<div class='estilo_comentario border rounded'>";
                htmlComentarios += "<div class='com_user'>"+ comentarios[k].user + " " + comentarios[k].score + "<i class='fas fa-star checked'></i></div>";
                htmlComentarios += "<div class='com_desc'>"+ comentarios[k].description +"</div>";   
                htmlComentarios += "<div class='com_fecha'>"+ comentarios[k].dateTime +"</div>";
                htmlComentarios += "</div>";
            }
            div_comentarios.innerHTML = htmlComentarios;
        }
    }
    function showProductoInfo(){
        let htmlContentToAppend = "";
        var div_info = document.getElementById("infos").innerHTML = '';
        if(json_info){
            htmlContentToAppend +=
            "<div class='list-group-item list-group-item-action'>"+
                "<div class='row'>"+
                    "<div  id='divCarrusel' class='col-3'>";
                    htmlContentToAppend += "</div>"+
                    "<div class='col'>"+
                        "<div class='d-flex w-100 justify-content-between'>"+
                            "<h4 class='mb-1'>"+ "<font face='Helvetica, Arial, sans-serif' size=5>" + json_info.name + "</font>" +"</h4>"+ "<br>" +
                            "<h5>" + "<font face='Lucida Sans' size=4>" + "<strong>"  + json_info.cost + " " + json_info.currency + "</strong>" + "</font>" + "</h5>"+
                        "</div>"+
                      "<h6>"+ "<font size=4>" + json_info.description + "</font>" +"</h6>"+ "<br>" + "<br>" + "<br>" + "<br>" +
                      "<h7>" + "Cantidad de vendidos: " + "<font face='Franklin Gothic Medium' >" + json_info.soldCount + "</font>" + "</h7>"+
                    "</div>"+
                "</div>"+
            "</div>";
            document.getElementById("infos").innerHTML = htmlContentToAppend;
            imagenesCarrusel();
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    comentarios = resultObj.data;
                    cargarComentarios();
                }
                });
        }
    }




