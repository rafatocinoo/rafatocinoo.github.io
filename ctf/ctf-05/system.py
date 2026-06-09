from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from Crypto.PublicKey import RSA
import re, os

# Generación de clave RSA débil (512 bits)
key = RSA.generate(1024, e=3)
pub_key = key.publickey().export_key()

# Mensaje a firmar
message = b"IT Department: Confirm your identity - https://cloudguard-fix.com"

def sign():
    # Firma usando PKCS#1 v1.5 (vulnerable a padding mal formado)
    hash = hashes.Hash(hashes.SHA1())
    hash.update(message)
    digest = hash.finalize()
    signature = pow(int.from_bytes(digest, 'big'), key.d, key.n)
    return signature.to_bytes((key.n.bit_length() + 7) // 8, 'big')

def verify(signature):
    # Verificación defectuosa con regex (CVE-2006-4339)
    decrypted = pow(int.from_bytes(signature, 'big'), key.e, key.n)
    decrypted_bytes = decrypted.to_bytes((key.n.bit_length() + 7) // 8, 'big')
    
    # Patrón que permite bytes residuales después del hash
    pattern = re.compile(b'\x00\x01\xff+?\x00(.{15})(.{20})', re.DOTALL)
    match = pattern.match(decrypted_bytes)
    
    if not match:
        return False
    return True

# --- Simulación del servidor ---
original_sig = sign()
print(f"[+] Public Key:\n{pub_key.decode()}")
print(f"[*] Challenge: Forge a signature for message: '{message.decode()}'")

user_sig = bytes.fromhex(input("Enter signature (hex): "))
if verify(user_sig) and user_sig != original_sig:
    print(f"FLAG: flag{{RSA_W3akn3ss_3xpl0t3d}}")
else:
    print("Invalid signature")
