//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});
function login(users,pass){
    users=document.getElementById("user").value; //User y pass son controles, aquí los llamabas como variables.
    pass=document.getElementById("pass").value;
    alert(users);
    if (users.trim() === "") {
        alert("Usuario vacio.");
        return;
    }
    if (pass.trim() === "") {
        alert("Contraseña vacio.");
        return;
    }
    localStorage.setItem("userName", users.trim());
        window.location = "index.html";
    }