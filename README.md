# Exercise Tracker

<h3>Crea una aplicación full stack de JavaScript que sea funcionalmente similar a esta: https://exercise-tracker.freecodecamp.rocks/.<br><br>

Tus respuestas deben tener las siguientes estructuras.</h3>

<h3><i>Ejercicio:</i></h3>
<pre>
<code>
{
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}
</code>
</pre>

<h3><i>Usuario:</i></h3>
<pre>
<code>
{
  username: "fcc_test",
  _id: "5fb5853f734231456ccb3b05"
}
</code>
</pre>

<h3><i>Log:</i></h3>
<pre>
<code>
{
  username: "fcc_test",
  count: 1,
  _id: "5fb5853f734231456ccb3b05",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
}
</code>
</pre>

<h3>Pista: Para la propiedad date, el método toDateString de la API Date puede ser usado para conseguir el resultado esperado.</h3>

#

# Test

✅ Debes proporcionar tu propio proyecto, no la URL de ejemplo.<br><br>
✅ Puedes hacer una petición POST a /api/users con los datos de formulario que tenga la propiedad username para crear un nuevo usuario.<br><br>
✅ La respuesta devuelta de POST /api/users con datos de formulario username será un objeto con propiedades username y _id.<br><br>
✅ Puedes hacer una petición GET a /api/users para obtener una lista con todos los usuarios.<br><br>
✅ La petición GET a /api/users devuelve un arreglo.<br><br>
✅ Cada elemento en el arreglo devuelto desde GET /api/users es un literal de objeto que contiene el username y _id.<br><br>
✅ Puedes hacer una petición POST a /api/users/:_id/exercises con datos de formulario description, duration, y opcionalmente date. Si no se proporciona ninguna fecha, se utilizará la fecha actual.<br><br>
✅ La respuesta devuelta desde POST /api/users/:_id/exercises será el objeto de usuario con los campos de ejercicio añadidos.<br><br>
✅ Puedes hacer una petición GET a /api/users/:_id/logs para recuperar un log completo del ejercicio de cualquier usuario.<br><br>
✅ Una solicitud al log de un usuario GET /api/users/:_id/logs devuelve un objeto de usuario con una propiedad count representando el número de ejercicios que pertenecen a ese usuario.<br><br>
✅ Una solicitud GET a /api/users/:_id/logs devolverá el objeto de usuario con un arreglo log de todos los ejercicios añadidos.<br><br>
✅ Cada elemento en el arreglo log que es devuelto desde GET /api/users/:_id/logs es un objeto que debe tener las propiedades description, duration y date.<br><br>
✅ La propiedad description de cualquier objeto en el arreglo log que es devuelto desde GET /api/users/:_id/logs debe ser una cadena.<br><br>
✅ La propiedad duration de cualquier objeto en el arreglo log que es devuelto desde GET /api/users/:_id/logs debe ser un número.<br><br>
✅ La propiedad date de cualquier objeto en el arrelgo log que es devuelto desde GET /api/users/:_id/logs debe ser una cadena. Utiliza el formato dateString de la API Date.<br><br>
✅ Puedes añadir parámetros from, to y limit a una petición GET /api/users/:_id/logs para recuperar parte del log de cualquier usuario. from y to son fechas en formato yyyy-mm-dd. limit es un número entero de cuántos logs hay que devolver.<br><br>
