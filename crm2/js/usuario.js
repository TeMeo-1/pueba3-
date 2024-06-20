var g_id_usuario ="";

//Función para agregar usuario
function agregarUsuario(){
//Obtenemos el usuario que ingresa el usuario
var id_usuario = document.getElementById("txt_id_usuario").value;
var dv_usuario = document.getElementById("txt_dv_usuario").value;
var nombres_usuario = document.getElementById("txt_nombres_usuario").value;
var apellidos_usuario = document.getElementById("txt_apellidos_usuario").value;
var email_usuario = document.getElementById("txt_email_usuario").value;
var celular_usuario = document.getElementById("txt_celular_usuario").value;
var username_usuario = document.getElementById("txt_username_usuario").value;
var password_usuario = document.getElementById("txt_password_usuario").value;


//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "id_cliente": id_usuario,
  "dv": dv_usuario,
  "nombres": nombres_usuario,
  "apellidos": apellidos_usuario,
  "email": email_usuario,
  "celular": celular_usuario,
  "username": username_usuario,
  "password": password_usuario,
  "fecha_registro": fechaHoraActual

});

//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      location.href ="listar.html";
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
`<tr>
<td>${element.id_cliente}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.username}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);

}
function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var nombres_usuario = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el usuario? <b>" + nombres_usuario + "</b>";
}
function completarFormulario(element,index,arr){
  var nombres_usuario = element.nombres;
  document.getElementById('txt_nombres_usuario').value = nombres_usuario;
  
  var apellidos_usuario = element.apellidos;
  document.getElementById('txt_apellidos_usuario').value = apellidos_usuario;
  
  var email_usuario = element.email;
  document.getElementById('txt_email_usuario').value = email_usuario;
  
  var celular_usuario = element.celular;
  document.getElementById('txt_celular_usuario').value = celular_usuario;
  
  var username_usuario = element.username;
  document.getElementById('txt_username_usuario').value = username_usuario;
  
  var password_usuario = element.celular;
  document.getElementById('txt_password_usuario').value = password_usuario ;
}

function actualizarUsuario(){
    var nombres_usuario = document.getElementById("txt_nombres_usuario").value;
    var apellidos_usuario = document.getElementById("txt_apellidos_usuario").value;
    var email_usuario = document.getElementById("txt_email_usuario").value;
    var celular_usuario = document.getElementById("txt_celular_usuario").value;
    var username_usuario = document.getElementById("txt_username_usuario").value;
    var password_usuario = document.getElementById("txt_password_usuario").value;

    if (nombres_usuario === null){
      mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    }
    
    if (apellidos_usuario=== null){
      mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    }
      if (email_usuario === null){
      mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    }
      if (celular_usuario === null){
      mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    }
      if (password_usuario === null){
      mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    }


    
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "username": username_usuario,
        "password": "",
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        location.href ="listar.html";
      }
    })

    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  function eliminarUsuario(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
      .then((response) => {
        
        //Cambiar por elementos de bootstrap
        if(response.status == 200){
          location.href ="listar.html";
        }
        if(response.status == 400){
          alert("No es posible eliminar. Registro está siendo utilizado.");
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }

    function obtenerFechaHora(){
      var fechaHoraActual = new Date();
      var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
        hour12 :false,
        year :'numeric',
        month :'2-digit',
        day:'2-digit',
        hour : '2-digit',
        minute :'2-digit',
        second : '2-digit'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fechaHoraFormateada;
    }
    function formatearFechaHora(fecha_registro){
      var fechaHoraActual = new Date(fecha_registro);
      var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
        hour12 :false,
        year :'numeric',
        month :'2-digit',
        day:'2-digit',
        hour : '2-digit',
        minute :'2-digit',
        second : '2-digit',
        timeZone:'UTC'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fechaHoraFormateada;
    }
    
