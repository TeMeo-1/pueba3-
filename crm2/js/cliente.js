var g_id_cliente ="";

//Función para agregar tipo de gestión
function agregarCliente(){
//Obtenemos el tipo de gestión que ingresa el usuario
var id_cliente = document.getElementById("txt_id_cliente").value;
var dv_cliente = document.getElementById("txt_dv_cliente").value;
var nombres_cliente = document.getElementById("txt_nombres_cliente").value;
var apellidos_cliente = document.getElementById("txt_apellidos_cliente").value;
var email_cliente = document.getElementById("txt_email_cliente").value;
var celular_cliente = parseInt(documen.getElementById("txt_celular_cliente").value);

if (id_cliente === null){
  mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
}

if (dv_cliente === null){
  mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
}
  if (nombres_cliente === null){
  mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
}
  if (apellidos_cliente === null){
  mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
}
  if (email_cliente === null){
  mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
}
  if (celular_cliente === null){
  mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
}

//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "id_cliente": id_cliente,
  "dv": dv_cliente,
  "nombres": nombres_cliente,
  "apellidos": apellidos_cliente,
  "email": email_cliente,
  "celular": celular_cliente

});

//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      location.href ="listar.html";
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
`<tr>
<td>${element.id_cliente}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);

}
function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var nombre_cliente = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el cliente? <b>" + nombre_cliente + "</b>";
}
function completarFormulario(element,index,arr){
  var nombres_cliente = element.nombres;
  document.getElementById('txt_nombres_cliente').value = nombres_cliente;
  var apellidos_cliente = element.apellidos;
  document.getElementById('txt_apellidos_cliente').value = apellidos_cliente;
  var email_cliente = element.email;
  document.getElementById('txt_email_cliente').value = email_cliente;
  var celular = element.celular;
  document.getElementById('txt_celular_cliente').value = celular_cliente;
}

function actualizarcliente(){
  var nombres_cliente = document.getElementById("txt_nombres_cliente").value;
  var apellidos_cliente = document.getElementById("txt_apellidos_cliente").value;
  var email_cliente = document.getElementById("txt_email_cliente").value;
  var celular_cliente = document.getElementById("txt_celular_cliente").value;
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "nombres": nombres_cliente,
    "apellidos": apellidos_cliente,
    "email": email_cliente,
    "celular": celular_cliente,
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
    .then((response) => {
      if(response.status == 200){
        location.href ="listar.html";
      }
    })

    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  function eliminarcliente(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
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
    
