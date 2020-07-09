Tienes que instalar todas las dependencias: jest, express, axios y nodemor para la recarga en caliente.

Para empezar, utiliza el ejemplo del servidor de inicio en expresss para un ['Hello World'](https://expressjs.com/es/starter/hello-world.html)

Ejecuta el servidor con nodemon. Acabo de editar el package.json con este script:

```js
    "scripts": {
    "serve": "nodemon ./server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

Vamos a utilizar esta URL de JSONplaceholder: `https: // jsonplaceholder.typicode.com /users` para hacer una llamada desde nuestra API y obtener los usuarios.

## UNIT TEST

Simplemente prueba una funcionalidad particular, una unidad de código. De esta manera, no es una prueba para llamadas API o conexiones o interacciones de bases de datos.

Con este tipo de prueba, podemos probar, por ejemplo, si una matriz (array) se realiza correctamente, o si realmente no está vacía, etc.

## INTEGRATION TEST

Aquí tenemos las llamadas a la API, prueba si tenemos una respuesta correcta, por ejemplo. Los test de integración prueban entonces los flujos por completo.

## E2E TEST

Este tipo de prueba inicia la aplicación e interactúa con ella. Se utilizan para probar las interfaces del usuario.

## CONCEPTOS DEL TESTING:

- **Spy, stub & mock**: estos conceptos aparecen con una biblioteca de prueba llamada [Sinon](). Spy es una función que podemos preguntar cuántas veces se llamó y con qué argumentos. Stub es similar a Spy, pero podemos decir qué comportamiento debe tener, como devolver y objetar con un usuario, en el momento en que se ha llamado. Mock es una parte del código que implementa lo mismo que otros, pero podemos decir qué usar.
- **Mock**: Todo es simulacro (_Mock_) en Jest, por lo que tenemos en esta entidad todos los conceptos anteriores.
- **Module pattern**: vamos a utilizar este tipo de patrón, [patrón módulo](https://medium.com/@gloriafercu/el-patr%C3%B3n-m%C3%B3dulo-en-javascript-1cd012a30ad). Todo estará en un módulo.
- **Dependency injection**: We can inject axios for example, by mocks (is just an argument)
- **Efects!**: no haga llamadas API, no pruebe la conexión de la base de datos. Solo funcionalidad

---

## REFACTORING THE CODE

El primer paso es dividir todas las funciones en diferentes archivos. De esta manera, podemos crear un directorio `src` donde poner el controlador de la ruta (los controladores) por ejemplo. Todo se importará y exportará en el archivo index.js con cada uno de los archivos con los controladores deferentes.

## TEST

### Instalar Jest

`npm install -D jest`

### Crear el primer test

Podemos crear un archivo que sea `index.spect.js` donde se contendrá un test.

**La función _describe()_** será la encargada de describir el test. Recibe dos parámetros, el primero es que es lo que se quiere testear y el segundo un callback. Esta función callback será la que contenga el cuerpo del test. En este cuerpo puede haber otros describes:
