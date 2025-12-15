// Define la estructura básica de un usuario para el registro y la autenticación
export interface User {
    nombre: string;
    apellido: string;
    email: string;
    password: string; // En un entorno real, esto sería un hash
    rol: 'ADMIN' | 'LAB' | 'PATIENT'; // Rol es crucial para la lógica de privilegios
    telefono: string; // Se usará en el formulario de Perfil
}