//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var registro=[];
                
function guardar(){ 
    var data={}; //defino el objeto
    var names=document.getElementById('name&lastname').value;// Nombre y appellido de usuario
    //var profileImg=document.getElementById('file-upload').value;
    var age=document.getElementById('age').value;// edad de usuario
    var mail=document.getElementById('e-mail').value;// e-mail de usuario
    var phone=document.getElementById('phonenumb').value;// contacto telefonico de usuario
    
    // se guarda cada value de usuario asignada
    data.names= names; 
    data.age=age;
    data.mail=mail;
    data.phone=phone; 
    localStorage.setItem("form-data",JSON.stringify(data)); //se guardan los datos en localStorage
    show(data);//llamo la var registro
}
function show(data){
    var dataform = " <ul><li> Nombre </li><li> Edad </li><li> E-mail </li><li> Telefono </li>"; //muestra el encabezado
    dataform+="<ul align='left'><li>" + data.names + "</li><li>" + data.age +"</li><li>" + data.mail + "</li><li>" + data.phone +"</li></ul>";
    document.getElementById('form-data').innerHTML=dataform;
}

document.addEventListener("DOMContentLoaded", function (e){
});