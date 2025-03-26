from Crypto.PublicKey import RSA
from Crypto.Util.number import bytes_to_long, long_to_bytes
import hashlib
import gmpy2
import re

# Configuración del exploit
pub_key_pem = """-----BEGIN PUBLIC KEY-----
MIGdMA0GCSqGSIb3DQEBAQUAA4GLADCBhwKBgQClSgQj5K33DiF1g2eISs2xSQWI
uAnL11hhF7d+aSTHw9bPVXMLC9bhWbP1Jh3d3Q3mjZQeElUgFQXcMYIZqW3gfWGN
y94o1A/J6GAAx2CE4ZpsTDcpKMx7/X7GG1u7La4G/tEE9/0oUTigQOepzbSmmBCY
siHczsAZYrLPtybW3wIBAw==
-----END PUBLIC KEY-----"""

message = b"IT Department: Confirm your identity - https://cloudguard-fix.com"

# 1. Extraer parámetros RSA de la clave pública
key = RSA.import_key(pub_key_pem)
n = key.n
e = key.e  # Debe ser 3

# 2. Construir payload con estructura exacta requerida por el regex
def forge_signature():
    # Parámetros críticos para el CTF
    hash_sha1 = hashlib.sha1(message).digest()  # Hash real del mensaje
    asn1_sha1 = b'\x30\x21\x30\x09\x06\x05\x2b\x0e\x03\x02\x1a\x05\x00\x04\x14'  # ASN.1 para SHA-1
    
    # Construir bloque según regex: \x00\x01\xff+?\x00(.{15})(.{20})
    block = b'\x00\x01' + b'\xff' * 5  # Padding mínimo (5 bytes)
    block += b'\x00'                   # Separador
    block += asn1_sha1[:15]            # Primera parte del ASN.1 (15 bytes)
    block += hash_sha1                 # Hash completo (20 bytes)
    block = block.ljust(128, b'\x00')  # Rellenar hasta 128 bytes (1024 bits)
    
    # Calcular raíz cúbica exacta
    m = bytes_to_long(block)
    forged_sig, exact = gmpy2.iroot(m, e)
    
    if not exact:
        forged_sig += 1  # Ajuste para redondeo
    
    return long_to_bytes(forged_sig, 128)

# 3. Generar firma falsa
forged_sig = forge_signature()
print("Firma forjada (hex):", forged_sig.hex())

# 4. Verificación local (opcional)
def local_verify():
    decrypted = pow(bytes_to_long(forged_sig), e, n)
    decrypted_bytes = long_to_bytes(decrypted, 128)
    
    # Simular verificación del servidor
    match = re.match(b'\x00\x01\xff+?\x00(.{15})(.{20})', decrypted_bytes)
    return bool(match)

if local_verify():
    print("\n[+] ¡Firma válida! Introduce este valor en el servidor:")
    print(forged_sig.hex())
else:
    print("\n[!] Error en el exploit - Revisar la construcción del bloque")
