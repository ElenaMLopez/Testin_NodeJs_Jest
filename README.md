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

Podemos crear un archivo que sea `index.spect.js` donde se contendrá un test:

- **La función _describe()_** será la encargada de describir el test. Recibe dos parámetros, el primero es que es lo que se quiere testear y el segundo un callback. Esta función callback será la que contenga el cuerpo del test. En este cuerpo puede haber otros describes:

```js
describe('Prueba', () => {
  // tests...
});
```

- La función iniciada en el primer `decribe` puede tener así mismo otros `describe` dentro. En este caso de test dummie vamos a meter un describe de una función que sume dos números:

```js
describe('Prueba', () => {
  describe('suma', () => {
    // Tests
  });
});
```

- Para definir lo que hace el test se utiliza la palabre reservada `it`. _it_ es una función que recibe dos parámetros también, siendo el primero la descripción de lo que hace el test, en nuestro duumie-test será sumar dos números. Se crea la función que suma dos números y devuelve esta suma.

```js
describe('Prueba', () => {
  describe('suma', () => {
    it('suma dos números', () => {
      const suma = (a, b) => {
        return a + b;
      };
      // comprobación del 'it'
    });
  });
});
```

- La palabra reservada para archivos spect, nos provee de una encadenación de metodos que nos ayuda a comprobar si lo que nos devuelve la funcionalidad es lo que esperamos o no. esta palabra es `spect` y en realidad es un método al que se pueden encadenar otros que van realizando las comprobaciones que le digamos, en este caso se usan valores ya:

```js
describe('Prueba', () => {
  describe('suma', () => {
    it('suma dos números', () => {
      const suma = (a, b) => {
        return a + b;
      };
      expect(suma(1, 2)).toEqual(3);
    });
  });
});
```

- **_toEqual_ es el método** que nos proporciona Jest para confirmar si lo que devuelve la función llamada con parámetros dentro del _spect_ es realmente lo que debería.

Hay dos formas de lanzar los test, o bien con el comando `npm run test` si se ha modificado el package.json o bien con la funcionalidad de watcher con el comando de Jest `npm run test --wacthAll` .

### Testeando los _handlers_ (test con mocks e inyección de dependencias)

Haciendo un console.log de axios podemos ver en la consola todos los métodos que nos proporciona un mock de Jest:

```bash
   { [Function: mockConstructor]
        _isMockFunction: true,
        getMockImplementation: [Function],
        mock: [Getter/Setter],
        mockClear: [Function],
        mockReset: [Function],
        mockRestore: [Function],
        mockReturnValueOnce: [Function],
        mockResolvedValueOnce: [Function],
        mockRejectedValueOnce: [Function],
        mockReturnValue: [Function],
        mockResolvedValue: [Function],
        mockRejectedValue: [Function],
        mockImplementationOnce: [Function],
        mockImplementation: [Function],
        mockReturnThis: [Function],
        mockName: [Function],
        getMockName: [Function] }
```

Vamos a testear los endpoints y sus handlers.

- Lo primero es definir un describe (que nos dice que es lo que se pretende testear). El primer parámetro nos indica que es lo que se testea y el segundo es una función en la que se irán realizando los diferentes test para estos endpoits y los métodos (CRUD) que los usan. En este caso es el endpoint de users, así que metemos otro describe dentro para 'users'. Y a continuación ya podemos empezar con el CRUD de users.
- El primer método va a ser el **get** del CRUD:

```js
describe('Endpoints', () => {
  describe('users', () => {
    describe('get', () => {
      it('return a user in a json', async () => {
        /* mock de axios: jest.fn() de esta forma inyectamos una dependencia y la mockeamos. 
        Si tuviesemos otra como jwt o lo que sea habría que mockearla también */
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }),
          /** Este mock, devuelve un valor que luego se pasa a send en nuestro
           * get. El valor de { data } no es relevante en realidad aquí y podemos usar 1.
           * Lo relevante es que reciba lo que reciba tiene que mandarlo.
           */
        };
        // Mock para los métodos de status y send
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
        await handlers({ axios }).get({}, res);
        // console.log(axios);
        // res.status.mock.calls retorna un array con los argumentos pasados en status, ok es [200]
        expect(axios.get.mock.calls).toEqual([
          ['https://jsonplaceholder.typicode.com/users'],
        ]);
        expect(res.send.mock.calls).toEqual([[1]]);
      });
    });
  });
});
```

NOTA: podemos ver que es lo que tiene una dependencia mockeada, como es axios en este caso. Haciendo un console.log de axios podemos ver en la consola todos los métodos que nos proporciona un mock de Jest:

```bash
   { [Function: mockConstructor]
        _isMockFunction: true,
        getMockImplementation: [Function],
        mock: [Getter/Setter],
        mockClear: [Function],
        mockReset: [Function],
        mockRestore: [Function],
        mockReturnValueOnce: [Function],
        mockResolvedValueOnce: [Function],
        mockRejectedValueOnce: [Function],
        mockReturnValue: [Function],
        mockResolvedValue: [Function],
        mockRejectedValue: [Function],
        mockImplementationOnce: [Function],
        mockImplementation: [Function],
        mockReturnThis: [Function],
        mockName: [Function],
        getMockName: [Function] }
```

- Después testearemos el **post**, para este caso necesitamos enviar un _body_ y por ello también ha de ser mockeado. Así, justo después del test del 'get' y sin salirnos de la función del testeo del CRUD de users, pondremos:

```js
describe('post', () => {
  describe('create a user', () => {
    it('post a user', async () => {
      const axios = {
        post: jest.fn().mockResolvedValue({ data: 1 }),
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const req = {
        // Mock del parámetro req, que es lo que se envía
        body: 'request body',
      };
      await handlers({ axios }).post(req, res);

      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([[1]]);
      /* En este caso se comprueba que la url es la correcta, 
          y que el body (sea el valor que sea), se envía. Y de hecho lo que se está testeando es axios, 
          es decir, que axios envía a una url determinada lo que tenga en su req.body */
      expect(axios.post.mock.calls).toEqual([
        ['https://jsonplaceholder.typicode.com/users', 'request body'],
      ]);
    });
  });
});
```

- Tras esto es el turno del **put** de usuarios. En este caso la particularidad es que se ha de enviar un req.body y un id de usuario, así que ha de ser mockeado tambien. Es importante tener en cuenta, que en este caso lo que queremos es confirmar que la url se compone con un id que se pasa, así que en vez de pasar este id con lo que supuestamente vale (req.id) vamos a darle un valor fijo. Se testea que la url está bien compuesta y envía lo que se solicita. De no hacerlo así, es decir, dejar que se evalúe el id llamando a req.id, podría haber algún error anterior que no tenemos controlado, y fallar el test sin que esté realmente fallando la funcionalidad concreta que se analiza.

```js
describe('put', () => {
  it('update resources', async () => {
    const axios = {
      put: jest.fn().mockResolvedValue({ data: 1 }),
    };
    const req = {
      body: 'request body',
      params: {
        id: 12,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
    };
    await handlers({ axios }).put(req, res);
    expect(res.sendStatus.mock.calls).toEqual([[204]]);
    expect(axios.put.mock.calls).toEqual([
      ['https://jsonplaceholder.typicode.com/users/12', 'request body'],
    ]);
  });
});
```

- Por último nos queda probar el **delete**, en este caso no hay body, pero si hay id, así que es más o menos igual que antes:

```js
describe('delete', () => {
      describe('delete a resource', () => {
        it('should delete a user', async () => {
          const axios = {
            delete: jest.fn().mockResolvedValue({ data: 1 }),
          };
          const req = {
            params: {
              id: 12,
            },
          };
          const res = {
            sendStatus: jest.fn(),
          };
          await handlers({ axios }).delete(req, res);
          expect(axios.delete.mock.calls).toEqual([
            ['https://jsonplaceholder.typicode.com/users/12'],
          ]);
          expect(res.sendStatus.mock.calls).toEqual([[204]]);
        });
      });
```

Hasta ahora se han definido los métodos de un CRUD básico, y luego se han realizado los test, pero en realidad lo ideal es hacer justo lo contrario. Ver que hay que hacer, realizar el test primero y luego contruir el código en base a esos test. El TDD es la forma más segura de desarrollo.

## TDD

### Hagamos un blog

Nuestro blog tiene los siguientes requisitos (negocio):

- El blog será sólo para administradores.
- se pueden crear entradas a nombre de otro usuario.
- si el usuario no exixte debe arrojar error!
- El usuario debe venir en el body.
