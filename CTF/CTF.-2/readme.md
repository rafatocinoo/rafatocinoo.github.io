Una vez que hayas creado el archivo `reto_pwn.c`, compílalo utilizando el siguiente comando:

```bash
┌──(venv)─(root㉿kali)-[/home/kali/CTF_4]
└─# gcc -fno-stack-protector -z execstack -no-pie -o reto_pwn reto_pwn.c -std=gnu99 -Wno-deprecated-declarations
```
