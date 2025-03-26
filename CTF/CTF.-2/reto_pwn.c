#include <stdio.h>
#include <string.h>

void secret_function() {
    printf("¡Bien hecho! Aquí está tu flag: flag{buff3r_0v3rfl0w_3xp10it3d}\n");
}

void vulnerable_function() {
    char buffer[64];  // Buffer fijo de 64 bytes
    printf("Ingresa tu nombre: ");
    gets(buffer);  // Función peligrosa: NO verifica el tamaño de entrada
    printf("Hola, %s\n", buffer);
}

int main() {
    vulnerable_function();
    return 0;
}
