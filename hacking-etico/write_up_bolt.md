# Guía de Explotación - TryHackMe Bolt

## Reconocimiento

Comenzamos con un escaneo de Nmap para detectar los puertos abiertos, los servicios en ejecución, sus versiones y otra información relevante:

```bash
nmap -T4 --min-rate=10000 -p- -A IP_MAQUINA_ATACADA
```

### Explicación de los parámetros:

- `-T4` -> Define la velocidad del escaneo.
- `--min-rate=10000` -> Asegura el envío de al menos 10,000 paquetes por segundo.
- `-p-` -> Escanea todos los puertos disponibles.
- `-A` -> Activa un escaneo agresivo para obtener más detalles.

## Explotación de la Web

El escaneo reveló que hay dos puertos abiertos con servicio HTTP: el 80 y el 8000. Procedemos a explorarlos.

Al ingresar en el puerto 80, observamos la página predeterminada de Apache.

No se halló contenido significativo en `robots.txt` ni en el código fuente de la página, por lo que pasamos al siguiente puerto.

En el puerto 8000 encontramos un sitio web de Bolt.

Explorando el sitio, identificamos credenciales de acceso:

- **Usuario**: `bolt`
- **Contraseña**: `boltadmin123`

También descubrimos que la URL de inicio de sesión es `/bolt`.

Ingresamos las credenciales `bolt:boltadmin123` y accedemos correctamente a la plataforma.

En la interfaz del sitio, encontramos que la versión instalada de Bolt es la **3.7.1**.

## Comprometiendo la Máquina

Con esta información, utilizamos `Searchsploit` para buscar exploits disponibles para la versión 3.7.1 de Bolt.

```bash
searchsploit bolt 3.7
```

Confirmamos que existe un exploit para esta versión, por lo que lo ejecutaremos mediante Metasploit.

Abrimos Metasploit con:

```bash
msfconsole
```

Seleccionamos el exploit adecuado:

```bash
use 0
```

Para visualizar los parámetros requeridos, usamos:

```bash
show options
```

Rellenamos los valores necesarios con:

```bash
set PARAMETRO VALOR
```

Finalmente, ejecutamos el exploit con:

```bash
run
```

Si la carga se ejecuta correctamente, tendremos acceso a la máquina víctima y podremos ejecutar comandos. Por ejemplo, para verificar el usuario actual:

```bash
whoami
```

En este caso, estamos operando como `root`, lo que indica que hemos tomado el control del sistema.

Para localizar la bandera (`flag`), navegamos hasta el directorio `/home` del usuario comprometido y utilizamos:

```bash
cat flag.txt
```

## Conclusión

Hemos logrado comprometer la máquina con éxito y obtener la bandera. ¡Misión cumplida! 🚀

